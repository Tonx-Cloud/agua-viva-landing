# Água Viva — Landing Page

> Landing page premium para o livro "Água Viva" de Antônio Carlos Tótoro.
>
> Stack: Next.js (App Router) + TypeScript + Tailwind CSS

---

## Estrutura do Projeto

- `src/app/` — páginas e layouts
- `src/components/` — componentes React (incluindo `AudioGallery.tsx`)
- `src/data/audios.ts` — lista de áudios com metadados (gerado automaticamente)
- `src/app/api/audio/[filename]/` — proxy HTTPS→HTTP para a VM de áudios
- `scripts/` — scripts Python para transcrição e geração de metadados
- `data/transcripts/` — transcrições completas dos áudios (.txt)
- `data/metadata/` — metadados extraídos em JSON
- `data/audio_inputs/` — arquivos de áudio (ignorados pelo Git)

---

## Como rodar local

```bash
npm install
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000)

---

## Transcrição de Áudios

Os áudios de degustação são transcritos automaticamente com [faster-whisper](https://github.com/SYSTRAN/faster-whisper) para extrair metadados reais de cada poema.

### Setup (uma vez)

```bash
python -m venv .venv
# Windows:
.\.venv\Scripts\Activate.ps1
# Linux/Mac:
source .venv/bin/activate

pip install faster-whisper
```

**Requisito**: [ffmpeg](https://ffmpeg.org/) instalado e no PATH.

### Rodar transcrição

1. Coloque os arquivos de áudio em `data/audio_inputs/`
2. Execute:

```bash
python scripts/transcribe_audios.py --input_dir data/audio_inputs --model small
```

**Modelos disponíveis**: `tiny` (mais rápido), `base`, `small` (recomendado), `medium`, `large` (mais preciso, mais lento)

**Saídas**:
- `data/transcripts/*.txt` — transcrição completa de cada áudio
- `data/metadata/audios.transcribed.json` — metadados estruturados (poema, autor, nota, preview)

### Gerar `audios.ts` para o site

```bash
python scripts/generate_audios_ts.py --base_url "/api/audio/"
```

Gera `src/data/audios.ts` com todos os metadados prontos para o componente `AudioGallery`.

### Observações sobre transcrição

- A transcrição é automática e pode conter erros de reconhecimento
- Nomes de poemas e trechos devem ser revisados manualmente após a geração
- O arquivo `data/metadata/audios.transcribed.json` pode ser editado manualmente antes de regerar o `.ts`
- Os áudios locais em `data/audio_inputs/` são ignorados pelo Git (são grandes)

---

## Hospedagem dos Áudios

Os áudios estão hospedados na VM Google Cloud (`34.9.51.163`) com Nginx.
O site usa um **proxy API** (`/api/audio/[filename]`) para evitar problemas de mixed content (HTTPS→HTTP).

### Arquitetura

```
Browser (HTTPS) → Vercel /api/audio/audio-01.mpeg → VM HTTP 34.9.51.163/audios/audio-01.mpeg
```

- Suporte a Range requests (HTTP 206) para streaming
- Cache de 24h (`Cache-Control: public, max-age=86400, immutable`)
- Whitelist de nomes de arquivo (apenas `audio-01.mpeg` a `audio-06.mpeg`)

### Poemas identificados

| # | Arquivo | Poema | Autor | Duração |
|---|---------|-------|-------|---------|
| 1 | audio-01.mpeg | Forma de Amar | Antônio Carlos Tótoro | 01:35 |
| 2 | audio-02.mpeg | Bala Perdida | Antônio Carlos Tótoro | 01:17 |
| 3 | audio-03.mpeg | Louvado Seja o Senhor | Antônio Carlos Tótoro | 02:09 |
| 4 | audio-04.mpeg | Cócoras | Antônio Carlos Tótoro | 02:13 |
| 5 | audio-05.mpeg | Natal | Antônio Carlos Tótoro | 01:37 |
| 6 | audio-06.mpeg | Mariana | Antônio Carlos Tótoro | 01:07 |

---

## Deploy

```bash
npm run build
git add .
git commit -m "mensagem"
git push origin master
npx vercel --prod --yes
```

URL de produção: https://agua-viva-landing.vercel.app

---

## Troubleshooting

### Erro 416 Range Not Satisfiable
- **Causa**: Arquivos de áudio vazios ou corrompidos.
- **Solução**: Verifique que os arquivos na VM são válidos com `ffprobe`.
- **Teste**: `curl -I -H "Range: bytes=0-1023" http://34.9.51.163/audios/audio-01.mpeg` → deve retornar 206.

### Áudios não carregam no site
- Verifique se a VM está online e o Nginx rodando.
- O proxy em `/api/audio/` depende da VM responder em HTTP.
- Fallback visual: "Áudio temporariamente indisponível."

### Erros do YouTube no console
- `ERR_BLOCKED_BY_CLIENT` nos embeds do YouTube são causados por extensões de bloqueio de anúncios (uBlock, AdBlock).
- **Não é um bug do site.** São requisições de telemetria (`log_event`) do YouTube bloqueadas pela extensão.
- Os vídeos embarcados continuam funcionando normalmente.

### Transcrição com erros
- Troque para modelo `medium` ou `large` para maior precisão.
- Edite `data/metadata/audios.transcribed.json` manualmente e regere o `.ts`.

---

## Links

- [Site em produção](https://agua-viva-landing.vercel.app)
- [Blog do autor](https://tortoro.com.br/)

---

## Contato

Para dúvidas ou sugestões, abra uma issue ou entre em contato pelo site.
