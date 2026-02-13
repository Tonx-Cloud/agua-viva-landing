# Água Viva — Landing Page

> Landing page premium para o livro "Água Viva" de Antônio Carlos Tótoro.
>
> Stack: Next.js (App Router) + TypeScript + Tailwind CSS

---

## Estrutura do Projeto

- `src/app/` — páginas e layouts
- `src/components/` — componentes React
- `public/audio/` — arquivos MP3 para degustação sonora

---

## Como rodar local

```bash
npm install
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000)

---

## Como adicionar/atualizar áudios

- Coloque os arquivos MP3 reais em `public/audio/` (não use Git LFS)
- Evite nomes com espaços, acentos ou parênteses. Exemplo: `mariana-declamacao-1.mp3`
- Atualize os paths no componente `AudiobookSection.tsx` se necessário

---

## Deploy na Vercel

```bash
vercel --prod
```
O deploy será publicado em: https://agua-viva-landing.vercel.app

---

## Troubleshooting

### Erro 416 Range Not Satisfiable
- Causa: arquivos MP3 rastreados por Git LFS ou arquivos 0 bytes
- Solução: remova do LFS, coloque arquivos reais em `public/audio/`, padronize nomes
- Não use LFS para áudios, pois Vercel não suporta streaming de ponteiros

---

## Links importantes

- [Site em produção](https://agua-viva-landing.vercel.app)
- [Blog do autor](https://tortoro.com.br/)
- [Shorts do YouTube](https://www.youtube.com/@tortoro)

---

## Contato

Para dúvidas ou sugestões, abra uma issue ou entre em contato pelo site.
