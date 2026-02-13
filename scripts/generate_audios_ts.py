#!/usr/bin/env python3
"""
Gera src/data/audios.ts a partir de data/metadata/audios.transcribed.json.

Uso:
  python scripts/generate_audios_ts.py --base_url "/api/audio/"
"""

import argparse
import json
import re
import sys
from pathlib import Path
from urllib.parse import quote


def sanitize_ts_string(s: str) -> str:
    """Escapa aspas e caracteres especiais para uso em strings TypeScript."""
    s = s.replace("\\", "\\\\")
    s = s.replace('"', '\\"')
    s = s.replace("\n", " ")
    return s.strip()


def filename_to_src(filename: str, base_url: str) -> str:
    """
    Mapeia nomes de arquivo para as URLs do proxy /api/audio/.
    Os arquivos na VM são audio-01.mpeg a audio-06.mpeg.
    """
    # Mapeamento direto baseado na ordem de áudio
    mapping = {
        "audio-01.mpeg": "audio-01.mpeg",
        "audio-02.mpeg": "audio-02.mpeg",
        "audio-03.mpeg": "audio-03.mpeg",
        "audio-04.mpeg": "audio-04.mpeg",
        "audio-05.mpeg": "audio-05.mpeg",
        "audio-06.mpeg": "audio-06.mpeg",
    }

    mapped = mapping.get(filename, filename)
    if base_url.endswith("/"):
        return f"{base_url}{quote(mapped, safe='/-.')}"
    return f"{base_url}/{quote(mapped, safe='/-.')}"


def main():
    parser = argparse.ArgumentParser(description="Gera audios.ts a partir do JSON de metadados")
    parser.add_argument("--base_url", default="/api/audio/", help="URL base para os arquivos de áudio")
    parser.add_argument("--input", default="data/metadata/audios.transcribed.json", help="JSON de metadados")
    parser.add_argument("--output", default="src/data/audios.ts", help="Arquivo TS de saída")
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        print(f"Erro: arquivo de metadados não encontrado: {input_path}")
        sys.exit(1)

    with open(input_path, "r", encoding="utf-8") as f:
        audios = json.load(f)

    print(f"Lidos {len(audios)} itens de {input_path}")

    # Gerar o TypeScript
    lines = [
        'export interface AudioItem {',
        '  id: string;',
        '  title: string;',
        '  poem: string;',
        '  author: string;',
        '  voice: string;',
        '  duration: string;',
        '  note: string;',
        '  transcriptPreview: string;',
        '  src: string;',
        '  filename: string;',
        '}',
        '',
        'export const audios: AudioItem[] = [',
    ]

    for i, audio in enumerate(audios):
        src = filename_to_src(audio["file"], args.base_url)
        title = audio.get("title", f"Degustação Sonora {i + 1}")

        # Melhorar título se tiver nome do poema
        poem = audio.get("poem", "(não identificado)")
        if poem != "(não identificado)":
            if "Mariana" in audio.get("voice", ""):
                title = f"Declamação Mariana — {poem}"
            else:
                title = f"Degustação — {poem}"

        entry_lines = [
            '  {',
            f'    id: "{sanitize_ts_string(audio["id"])}",',
            f'    title: "{sanitize_ts_string(title)}",',
            f'    poem: "{sanitize_ts_string(poem)}",',
            f'    author: "{sanitize_ts_string(audio.get("author", "Antonio Carlos Tórtoro"))}",',
            f'    voice: "{sanitize_ts_string(audio.get("voice", "Voz do projeto"))}",',
            f'    duration: "{sanitize_ts_string(audio.get("duration", "00:00"))}",',
            f'    note: "{sanitize_ts_string(audio.get("note", ""))}",',
            f'    transcriptPreview: "{sanitize_ts_string(audio.get("transcriptPreview", ""))}",',
            f'    src: "{sanitize_ts_string(src)}",',
            f'    filename: "{sanitize_ts_string(audio["file"])}",',
            '  },',
        ]
        lines.extend(entry_lines)

    lines.append('];')
    lines.append('')

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"Gerado: {output_path}")
    print(f"  {len(audios)} itens de áudio")

    for audio in audios:
        poem = audio.get("poem", "(não identificado)")
        status = "✓" if poem != "(não identificado)" else "⚠"
        print(f"  {status} {audio['file']} → {poem}")


if __name__ == "__main__":
    main()
