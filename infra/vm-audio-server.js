/**
 * Servidor de áudios para a VM (Google Cloud)
 *
 * Protege os arquivos de áudio com token de autenticação.
 * Apenas requisições com header `x-origin-token` válido são aceitas.
 *
 * INSTALAÇÃO NA VM:
 *
 *   cd /opt/audio-server
 *   npm init -y
 *   npm install express express-rate-limit
 *
 *   # Definir variável de ambiente
 *   export AUDIO_BACKEND_TOKEN="seu-token-secreto-aqui"
 *
 *   # Rodar com PM2 (recomendado)
 *   pm2 start vm-audio-server.js --name audio-server
 *
 *   # Ou rodar diretamente
 *   node vm-audio-server.js
 *
 * NGINX (proxy reverso para este servidor):
 *
 *   server {
 *       listen 80;
 *       location /audios/ {
 *           proxy_pass http://127.0.0.1:3001/audios/;
 *           proxy_set_header X-Real-IP $remote_addr;
 *           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 *           proxy_set_header x-origin-token $http_x_origin_token;
 *       }
 *   }
 *
 *   OU servir diretamente na porta 3001 sem Nginx.
 */

const express = require("express");
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;
const TOKEN = process.env.AUDIO_BACKEND_TOKEN;

if (!TOKEN) {
  console.error("❌ AUDIO_BACKEND_TOKEN não definida. Encerrando.");
  process.exit(1);
}

/* ─── Diretório dos áudios ────────────────────────────────── */
const AUDIO_DIR = process.env.AUDIO_DIR || "/var/www/audios";

/* ─── Whitelist de arquivos permitidos ────────────────────── */
const ALLOWED_FILES = new Set([
  "audio-01.mpeg",
  "audio-02.mpeg",
  "audio-03.mpeg",
  "audio-04.mpeg",
  "audio-05.mpeg",
  "audio-06.mpeg",
]);

/* ─── Rate limiting por IP ────────────────────────────────── */
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 60,             // 60 requests por minuto por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too Many Requests" },
});

app.use(limiter);

/* ─── Middleware de autenticação por token ─────────────────── */
app.use("/audios", (req, res, next) => {
  const token = req.headers["x-origin-token"];

  if (!token || token !== TOKEN) {
    console.warn(
      `[${new Date().toISOString()}] 401 Unauthorized — IP: ${req.ip} — Token: ${token ? "inválido" : "ausente"}`
    );
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
});

/* ─── Rota de áudio ───────────────────────────────────────── */
app.get("/audios/:filename", (req, res) => {
  const { filename } = req.params;

  // Whitelist — não expõe diretório completo
  if (!ALLOWED_FILES.has(filename)) {
    return res.status(404).json({ error: "Not found" });
  }

  // Previne path traversal
  const safeName = path.basename(filename);
  const filePath = path.join(AUDIO_DIR, safeName);

  // Verifica existência
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  // Suporte a Range requests (streaming)
  const rangeHeader = req.headers.range;

  if (rangeHeader) {
    const parts = rangeHeader.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize || start > end) {
      res.status(416).set("Content-Range", `bytes */${fileSize}`);
      return res.end();
    }

    res.status(206).set({
      "Content-Type": "audio/mpeg",
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Content-Length": end - start + 1,
      "Accept-Ranges": "bytes",
      "X-Content-Type-Options": "nosniff",
    });

    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.status(200).set({
      "Content-Type": "audio/mpeg",
      "Content-Length": fileSize,
      "Accept-Ranges": "bytes",
      "X-Content-Type-Options": "nosniff",
    });

    fs.createReadStream(filePath).pipe(res);
  }
});

/* ─── Health check ────────────────────────────────────────── */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ─── Catch-all (não expõe nada além das rotas acima) ─────── */
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

/* ─── Start ───────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`🎵 Audio server rodando na porta ${PORT}`);
  console.log(`📂 Diretório de áudios: ${AUDIO_DIR}`);
  console.log(`🔐 Token de autenticação: configurado`);
});
