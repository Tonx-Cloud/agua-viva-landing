#!/usr/bin/env python3
"""
Transcreve os áudios de degustação do projeto Água Viva e gera metadados.

Uso:
  python scripts/transcribe_audios.py --input_dir data/audio_inputs --model small
"""

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path


def get_duration_ffprobe(filepath: str) -> str:
    """Retorna a duração do áudio em formato mm:ss usando ffprobe."""
    try:
        result = subprocess.run(
            [
                "ffprobe",
                "-v", "quiet",
                "-show_entries", "format=duration",
                "-of", "csv=p=0",
                filepath,
            ],
            capture_output=True,
            text=True,
            timeout=30,
        )
        # ffprobe pode retornar múltiplas linhas; pegar a que tem número
        for line in result.stdout.strip().splitlines():
            line = line.strip().rstrip(",")
            try:
                seconds = float(line)
                mins = int(seconds // 60)
                secs = int(seconds % 60)
                return f"{mins:02d}:{secs:02d}"
            except ValueError:
                continue
        return "00:00"
    except Exception as e:
        print(f"  [WARN] Não foi possível obter duração de {filepath}: {e}")
        return "00:00"


def clean_text(text: str) -> str:
    """Remove ruído comum de transcrições (hesitações, marcadores)."""
    # Remover hesitações
    text = re.sub(r'\b(é|hum|hmm|ahn|eh|ah|uh|uhm)\b\.{0,3}', '', text, flags=re.IGNORECASE)
    # Remover espaços múltiplos
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def normalize_author(name: str) -> str:
    """Padroniza variações do nome do autor."""
    variations = [
        r'ant[oô]nio\s+carlos\s+t[oó]r?t?[ao]ro',
        r'ant[oô]nio\s+carlos\s+tortoro',
        r'antonio\s+carlos\s+tórtoro',
    ]
    for pattern in variations:
        if re.search(pattern, name, re.IGNORECASE):
            return "Antonio Carlos Tórtoro"
    return name


def extract_poem_and_author(transcript_text: str) -> tuple[str, str]:
    """
    Extrai o nome do poema e o autor das primeiras linhas do transcript.
    Retorna (poem_name, author).
    """
    # Pegar primeiros ~500 chars (abertura)
    opening = transcript_text[:500]
    opening_clean = clean_text(opening)

    author = "(não identificado)"
    poem = "(não identificado)"

    # Procurar pelo autor
    author_patterns = [
        r'(?:de|por|autor[a]?)\s+(Ant[oô]nio\s+Carlos\s+T[oó]r?t?[ao]ro)',
        r'(Ant[oô]nio\s+Carlos\s+T[oó]r?t?[ao]ro)',
        r'(Ant[oô]nio\s+Carlos\s+Tortoro)',
        r'(Antonio\s+Carlos\s+Tórtoro)',
    ]
    for pat in author_patterns:
        m = re.search(pat, opening_clean, re.IGNORECASE)
        if m:
            author = normalize_author(m.group(1))
            break

    # Procurar por título do poema
    # Padrões comuns: "Poema X", "Título X", ou texto antes de "de Antônio..."
    poem_patterns = [
        r'(?:poema|título|poesia)[:\s]+["\']?(.{2,60}?)["\']?\s*(?:,\s*de|por)',
        r'(?:poema|título|poesia)[:\s]+["\']?(.{2,60}?)["\']?(?:\.|,)',
        r'["\'](.{2,50}?)["\']\s*(?:,?\s*(?:de|por)\s+Ant[oô]nio)',
        r'^(.{2,50}?)\s*(?:,?\s*(?:de|por)\s+Ant[oô]nio)',
    ]
    for pat in poem_patterns:
        m = re.search(pat, opening_clean, re.IGNORECASE)
        if m:
            candidate = m.group(1).strip().strip('.,;:!?"\'')
            if 2 <= len(candidate.split()) <= 10:
                poem = candidate
                break

    # Se ainda não encontrou, tentar a primeira frase curta (2-8 palavras)
    if poem == "(não identificado)":
        sentences = re.split(r'[.!?\n]', opening_clean)
        for s in sentences[:3]:
            s = s.strip().strip('.,;:!?"\'')
            words = s.split()
            if 2 <= len(words) <= 8 and not re.search(r'ant[oô]nio|carlos|t[oó]t?oro', s, re.IGNORECASE):
                poem = s
                break

    return poem, author


def generate_note(transcript_text: str) -> str:
    """
    Gera uma descrição específica (1-2 frases) baseada no conteúdo do transcript.
    Foca no tema/emoção do trecho.
    """
    text_clean = clean_text(transcript_text)
    sentences = re.split(r'[.!?\n]+', text_clean)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 20]

    if not sentences:
        return "Declamação poética intimista."

    # Pegar uma frase do meio do transcript (não só do começo)
    mid_idx = max(1, len(sentences) // 3)
    end_idx = min(len(sentences), mid_idx + 3)
    mid_sentences = sentences[mid_idx:end_idx]

    if not mid_sentences:
        mid_sentences = sentences[:2]

    # Construir nota a partir do conteúdo
    best = max(mid_sentences, key=len) if mid_sentences else sentences[0]

    # Truncar para 12-22 palavras
    words = best.split()
    if len(words) > 22:
        words = words[:20]
        note_text = " ".join(words) + "…"
    else:
        note_text = " ".join(words)

    # Capitalizar primeira letra
    if note_text:
        note_text = note_text[0].upper() + note_text[1:]

    # Adicionar contexto literário
    return f"Declamação poética: \"{note_text}\""


def generate_preview(transcript_text: str) -> str:
    """
    Gera um preview de 160-240 caracteres do trecho mais marcante.
    """
    text_clean = clean_text(transcript_text)
    sentences = re.split(r'[.!?\n]+', text_clean)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 15]

    if not sentences:
        return text_clean[:200]

    # Tentar encontrar trecho marcante (do meio para frente)
    start = max(0, len(sentences) // 4)
    preview_parts = []
    char_count = 0

    for s in sentences[start:]:
        if char_count + len(s) > 240:
            break
        preview_parts.append(s)
        char_count += len(s) + 2  # +2 para ". "

    if not preview_parts:
        # Fallback: pegar a primeira frase que cabe
        preview_parts = [sentences[0][:240]]

    preview = ". ".join(preview_parts)
    if len(preview) < 160 and len(sentences) > start + len(preview_parts):
        # Adicionar mais uma frase se muito curto
        extra = sentences[start + len(preview_parts)]
        if len(preview) + len(extra) + 2 <= 280:
            preview += ". " + extra

    # Garantir o tamanho
    if len(preview) > 240:
        preview = preview[:237] + "…"

    return preview


def determine_voice(filename: str) -> str:
    """Determina a voz com base no nome do arquivo."""
    lower = filename.lower()
    if "mariana" in lower:
        return "Mariana"
    return "Voz do projeto"


def determine_id(filename: str, index: int) -> str:
    """Gera um ID baseado no nome do arquivo."""
    lower = filename.lower()
    if "mariana" in lower:
        return "mariana"
    # Extrair WA number se existir
    m = re.search(r'wa(\d+)', lower)
    if m:
        return f"wa{m.group(1)}"
    return f"audio{index + 1:02d}"


def main():
    parser = argparse.ArgumentParser(description="Transcreve áudios de degustação do projeto Água Viva")
    parser.add_argument("--input_dir", required=True, help="Diretório com os arquivos de áudio")
    parser.add_argument("--model", default="small", help="Modelo Whisper (tiny/base/small/medium/large)")
    parser.add_argument("--output_dir", default="data", help="Diretório base de saída")
    args = parser.parse_args()

    input_dir = Path(args.input_dir)
    transcripts_dir = Path(args.output_dir) / "transcripts"
    metadata_dir = Path(args.output_dir) / "metadata"

    transcripts_dir.mkdir(parents=True, exist_ok=True)
    metadata_dir.mkdir(parents=True, exist_ok=True)

    # Encontrar arquivos de áudio
    audio_extensions = (".mp3", ".mpeg", ".m4a", ".wav", ".ogg", ".opus")
    audio_files = sorted([
        f for f in input_dir.iterdir()
        if f.suffix.lower() in audio_extensions
    ])

    if not audio_files:
        print(f"Nenhum arquivo de áudio encontrado em {input_dir}")
        sys.exit(1)

    print(f"Encontrados {len(audio_files)} arquivos de áudio")
    print(f"Modelo Whisper: {args.model}")
    print()

    # Carregar modelo
    print("Carregando modelo Whisper...")
    from faster_whisper import WhisperModel
    model = WhisperModel(args.model, device="cpu", compute_type="int8")
    print("Modelo carregado!\n")

    results = []

    for idx, audio_file in enumerate(audio_files):
        print(f"{'='*60}")
        print(f"[{idx + 1}/{len(audio_files)}] Processando: {audio_file.name}")
        print(f"{'='*60}")

        # 1) Duração
        duration = get_duration_ffprobe(str(audio_file))
        print(f"  Duração: {duration}")

        # 2) Transcrever
        print("  Transcrevendo...")
        segments, info = model.transcribe(
            str(audio_file),
            language="pt",
            beam_size=5,
            best_of=5,
            vad_filter=True,
        )

        transcript_lines = []
        for segment in segments:
            line = segment.text.strip()
            if line:
                transcript_lines.append(line)

        full_transcript = " ".join(transcript_lines)
        print(f"  Transcrição: {len(full_transcript)} caracteres")

        # 3) Salvar transcript
        transcript_path = transcripts_dir / f"{audio_file.stem}.txt"
        with open(transcript_path, "w", encoding="utf-8") as f:
            f.write(full_transcript)
        print(f"  Salvo em: {transcript_path}")

        # 4) Extrair metadados
        poem, author = extract_poem_and_author(full_transcript)
        print(f"  Poema: {poem}")
        print(f"  Autor: {author}")

        # 5) Gerar nota e preview
        note = generate_note(full_transcript)
        preview = generate_preview(full_transcript)
        voice = determine_voice(audio_file.name)
        audio_id = determine_id(audio_file.name, idx)

        print(f"  Voz: {voice}")
        print(f"  Nota: {note}")
        print(f"  Preview: {preview[:80]}...")
        print()

        results.append({
            "file": audio_file.name,
            "id": audio_id,
            "title": f"Degustação Sonora {idx + 1}" if voice != "Mariana" else "Declamação Mariana",
            "poem": poem,
            "author": author,
            "voice": voice,
            "duration": duration,
            "note": note,
            "transcriptPreview": preview,
            "transcriptPath": str(transcript_path),
        })

    # Salvar JSON consolidado
    json_path = metadata_dir / "audios.transcribed.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*60}")
    print(f"Concluído! {len(results)} áudios transcritos.")
    print(f"JSON salvo em: {json_path}")
    print(f"Transcripts em: {transcripts_dir}")
    print(f"{'='*60}")

    # Resumo
    print("\nRESUMO:")
    for r in results:
        status = "✓" if r["poem"] != "(não identificado)" else "⚠"
        print(f"  {status} {r['file']} → Poema: {r['poem']} | Autor: {r['author']}")


if __name__ == "__main__":
    main()
