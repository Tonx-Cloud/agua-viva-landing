# Água Viva — Landing Page

> Landing page premium para o livro "Água Viva" de Antônio Carlos Tótoro.
>
> Stack: Next.js (App Router) + TypeScript + Tailwind CSS + Vercel Blob

---

## Estrutura do Projeto

- `src/app/` — páginas e layouts
- `src/components/` — componentes React
- `src/data/audios.ts` — lista de áudios com metadados
- `public/` — arquivos estáticos (sem áudios locais)

---

## Como rodar local

```bash
npm install
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000)

---

## Como adicionar/atualizar áudios

### Método Recomendado: Hospedar na sua VM (mais controlável)

1. **Configure sua VM com Nginx/Apache** para servir os MP3s via HTTPS:
   - Coloque os arquivos em `/var/www/audios/` (exemplo).
   - Configure o servidor para aceitar Range requests e CORS.

   Exemplo Nginx:
   ```nginx
   location /audios/ {
     alias /var/www/audios/;
     types { audio/mpeg mp3; }
     add_header Access-Control-Allow-Origin "https://agua-viva-landing.vercel.app" always;
     add_header Accept-Ranges bytes always;
   }
   ```

2. **URLs das faixas**:
   - AUD-20260212-WA0052.mp3 => https://seu-dominio.com/audios/AUD-20260212-WA0052.mp3
   - AUD-20260212-WA0053.mp3 => https://seu-dominio.com/audios/AUD-20260212-WA0053.mp3
   - etc.

3. **Atualize `src/data/audios.ts`**:
   - Substitua os `src` placeholders pelas URLs reais da sua VM.
   - Exemplo:
     ```ts
     src: "https://seu-dominio.com/audios/AUD-20260212-WA0052.mp3"
     ```

4. **Commit e deploy**:
   ```bash
   git add .
   git commit -m "feat: adicionar URLs reais dos áudios"
   vercel --prod
   ```

### Método Alternativo: Vercel Blob

- Use o Dashboard Vercel > Storage > Blob para upload.
- Obtenha URLs públicas e substitua em `audios.ts`.

### Método Desenvolvimento: Via API

- Use `/api/blob-upload` para upload via POST (form-data).
- Retorna URL do Blob.

**Nota**: Configure `BLOB_READ_WRITE_TOKEN` no `.env.local` para uploads.

---

## Como atualizar a lista de áudios

Edite `src/data/audios.ts`:

```typescript
export const audios: AudioItem[] = [
  {
    id: "novo-id",
    title: "Novo Título",
    poem: "Nome do Poema",
    voice: "Nome da Voz",
    duration: "MM:SS",
    note: "Descrição curta",
    src: "https://url-do-blob.mp3"
  },
  // ...
];
```

---

## Deploy na Vercel

```bash
vercel --prod
```
O deploy será publicado em: https://agua-viva-landing.vercel.app

---

## Troubleshooting

### Erro 416 Range Not Satisfiable
- **Causa**: URLs placeholder não substituídas, arquivos locais vazios ou ponteiros LFS.
- **Solução**: Hospede os MP3s na VM ou Vercel Blob e atualize `audios.ts` com URLs reais.
- **Verificação**: Teste com `curl -I -H "Range: bytes=0-1023" <URL_DO_AUDIO>`. Deve retornar 206, não 416.

### Áudios não carregam
- Verifique se as URLs são HTTPS e acessíveis.
- Use `preload="none"` nos `<audio>` para evitar downloads desnecessários.
- Fallback: Se erro, mostra "Áudio temporariamente indisponível."

### Git LFS
- Se arquivos eram rastreados por LFS, remova com `git lfs untrack "*.mp3"` e `git rm --cached`.
- Evite LFS para áudios; use hospedagem externa.

---

## Links importantes

- [Site em produção](https://agua-viva-landing.vercel.app)
- [Blog do autor](https://tortoro.com.br/)
- [Shorts do YouTube](https://www.youtube.com/@tortoro)

---

## Contato

Para dúvidas ou sugestões, abra uma issue ou entre em contato pelo site.
