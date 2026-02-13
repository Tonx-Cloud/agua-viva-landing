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

### Método 1: Via Vercel Blob (Recomendado)

1. Faça upload dos MP3s para Vercel Blob:
   - Use o Dashboard Vercel: Project > Storage > Blob > Upload files
   - Ou via CLI: `vercel blob put arquivo.mp3`
   - Obtenha as URLs públicas dos arquivos.

2. Atualize `src/data/audios.ts`:
   - Substitua os `src` placeholders pelas URLs reais do Blob.
   - Ajuste títulos, vozes, durações e notas se necessário.

3. Commit e deploy:
   ```bash
   git add .
   git commit -m "feat: adicionar áudios via Blob"
   vercel --prod
   ```

### Método 2: Via API de Upload (Desenvolvimento)

Para desenvolvimento, use a rota `/api/blob-upload`:

```bash
curl -X POST http://localhost:3000/api/blob-upload \
  -F "file=@seu-arquivo.mp3"
```

Isso retorna a URL do Blob. Atualize `audios.ts` com essa URL.

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
- **Causa**: Arquivos MP3 locais vazios, ponteiros Git LFS ou servidor não suporta range requests.
- **Solução**: Migre para Vercel Blob (URLs externas). Não use arquivos em `/public/` para áudios grandes.
- **Verificação**: Se em produção der 416, confirme que `src` em `audios.ts` são URLs válidas do Blob.

### Áudios não carregam
- Verifique se as URLs do Blob são públicas e acessíveis.
- Use `preload="none"` nos `<audio>` para evitar downloads desnecessários.
- Fallback: Se erro, mostra "Áudio temporariamente indisponível."

### Git LFS
- Se arquivos eram rastreados por LFS, remova com `git lfs untrack "*.mp3"` e `git rm --cached`.
- Evite LFS para áudios; use Blob.

---

## Links importantes

- [Site em produção](https://agua-viva-landing.vercel.app)
- [Blog do autor](https://tortoro.com.br/)
- [Shorts do YouTube](https://www.youtube.com/@tortoro)

---

## Contato

Para dúvidas ou sugestões, abra uma issue ou entre em contato pelo site.
