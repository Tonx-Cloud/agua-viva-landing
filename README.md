# Água Viva — Landing Page

> Landing page premium para o livro "Água Viva" de Antonio Carlos Tórtoro.
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
| 1 | audio-01.mpeg | Forma de Amar | Antonio Carlos Tórtoro | 01:35 |
| 2 | audio-02.mpeg | Bala Perdida | Antonio Carlos Tórtoro | 01:17 |
| 3 | audio-03.mpeg | Louvado Seja o Senhor | Antonio Carlos Tórtoro | 02:09 |
| 4 | audio-04.mpeg | Cócoras | Antonio Carlos Tórtoro | 02:13 |
| 5 | audio-05.mpeg | Natal | Antonio Carlos Tórtoro | 01:37 |
| 6 | audio-06.mpeg | Mariana | Antonio Carlos Tórtoro | 01:07 |

---

## Formulário de Contato / Compra

O modal de compra (`BuyModal.tsx`) envia os dados via [FormSubmit.co](https://formsubmit.co/) — sem backend próprio.

### Como funciona

1. O visitante preenche **nome, e-mail, telefone/WhatsApp, cidade (opcional) e mensagem**.
2. O formulário faz `POST` para `https://formsubmit.co/ancartor@yahoo.com`.
3. O FormSubmit entrega o e-mail ao autor com todos os campos em formato de tabela.
4. Após o envio, o visitante é redirecionado para `/obrigado`.

### Campos ocultos configurados

| Campo | Valor | Descrição |
|-------|-------|-----------|
| `_subject` | `Pedido — Livro Água Viva` | Assunto do e-mail |
| `_template` | `table` | Layout do e-mail em tabela |
| `_captcha` | `true` | CAPTCHA anti-spam do FormSubmit |
| `_next` | URL de `/obrigado` | Redirecionamento pós-envio |
| `_honey` | (vazio, oculto) | Honeypot anti-bot |

### Primeiro uso

Na **primeira submissão**, o FormSubmit envia um e-mail de confirmação para `ancartor@yahoo.com`. O autor precisa clicar no link de ativação. Depois disso, todos os formulários são entregues normalmente.

### Alterar e-mail de destino

Edite a constante `EMAIL` em `src/components/BuyModal.tsx`:

```typescript
const EMAIL = "novo-email@exemplo.com";
```

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

## Segurança

O projeto inclui hardening baseado em OWASP Top 10:

### Security Headers (`next.config.ts`)

| Header | Valor |
|--------|-------|
| `Content-Security-Policy` | Restringe origens de scripts, estilos, frames, etc. |
| `Strict-Transport-Security` | HSTS 1 ano + preload (apenas em produção) |
| `X-Frame-Options` | `DENY` — impede clickjacking |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Bloqueia camera, microfone, geolocalização |
| `X-Powered-By` | Removido (`poweredByHeader: false`) |

### Rate Limiting (`middleware.ts`)

- Token bucket: 30 requests/minuto por IP nas rotas `/api/*`
- Proteção contra burst e abuso de endpoints
- In-memory (reseta em cold start na Vercel)

### Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `AUDIO_VM_URL` | URL base da VM de áudios (ex: `http://IP/audios`) | **Sim** |
| `AUDIO_BACKEND_TOKEN` | Token secreto para autenticação Vercel → VM | **Sim** |

Configurar na Vercel:

```bash
npx vercel env add AUDIO_VM_URL production
npx vercel env add AUDIO_BACKEND_TOKEN production
```

---

## 🔒 Comunicação Segura Vercel → VM

A rota `/api/audio/[filename]` faz proxy HTTPS→HTTP entre a Vercel e a VM de áudios.
O canal é protegido por múltiplas camadas:

### Arquitetura de Segurança

```
Browser (HTTPS)
  │
  ▼
Vercel Edge (middleware rate-limit)
  │
  ▼
/api/audio/[filename]  ←── whitelist, SSRF block, timeout, size limit
  │
  │  x-origin-token: AUDIO_BACKEND_TOKEN
  ▼
VM Google Cloud (Express)  ←── valida token, rate-limit, whitelist
  │
  ▼
Arquivo .mpeg no disco
```

### Token de Autenticação (`AUDIO_BACKEND_TOKEN`)

Toda requisição da Vercel para a VM inclui o header `x-origin-token`.
A VM **rejeita com 401** qualquer request sem token ou com token inválido.

**Como configurar:**

1. Gere um token seguro:
   ```bash
   openssl rand -hex 32
   ```

2. Configure na Vercel:
   ```bash
   npx vercel env add AUDIO_BACKEND_TOKEN production
   ```

3. Configure na VM:
   ```bash
   export AUDIO_BACKEND_TOKEN="mesmo-token-da-vercel"
   ```

**Por que IP allowlist não é suficiente:**
- A Vercel usa IPs dinâmicos no edge — não há range fixo confiável
- Atacantes podem spoofar headers `X-Forwarded-For`
- Um token compartilhado garante autenticidade independente de IP

### Proteção SSRF

| Proteção | Como funciona |
|----------|---------------|
| URL fixa via env var | `AUDIO_VM_URL` é a única origem — não aceita URL do cliente |
| `new URL()` segura | Filename é montado via `new URL(filename, base)` com validação de origin |
| Path-traversal block | Rejeita `..`, `/`, `\` no filename |
| Redirect bloqueado | `fetch(..., { redirect: "manual" })` impede SSRF via redirect |
| Whitelist rígida | Apenas 6 filenames específicos são aceitos |

### Timeout e Limite de Tamanho

| Proteção | Valor |
|----------|-------|
| Timeout | 15 segundos (AbortController) → retorna 504 |
| Tamanho máximo | 15 MB — rejeita com 413 se `Content-Length` exceder |
| Stream limitado | Se `Content-Length` ausente, corta stream em 15 MB |

### HTTPS Recomendado

Se `AUDIO_VM_URL` usa `http://`, um warning é emitido no console do servidor.
Para migrar para HTTPS na VM:

```bash
# Instale o Certbot na VM
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

### Servidor da VM (`infra/vm-audio-server.js`)

O arquivo `infra/vm-audio-server.js` é um servidor Express pronto para deploy na VM:

```bash
# Na VM
cd /opt/audio-server
npm init -y
npm install express express-rate-limit

export AUDIO_BACKEND_TOKEN="seu-token"
export AUDIO_DIR="/var/www/audios"

# Com PM2
pm2 start vm-audio-server.js --name audio-server

# Ou diretamente
node vm-audio-server.js
```

Funcionalidades:
- Autenticação via `x-origin-token` (401 sem token)
- Rate limiting: 60 req/min por IP
- Whitelist de arquivos (não expõe diretório)
- Suporte a Range requests (HTTP 206)
- Health check em `/health`
- Catch-all 404 para rotas não registradas

---

## Links

- [Site em produção](https://agua-viva-landing.vercel.app)
- [Blog do autor](https://tortoro.com.br/)

---

## Contato

Para dúvidas ou sugestões, abra uma issue ou entre em contato pelo site.
