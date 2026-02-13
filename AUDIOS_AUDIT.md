# Auditoria de Áudios — Reconciliação PDF × Transcrição

> Data: 2026-02-13
> Fonte primária: `LIVRO-DE-POEMAS-ÁGUA-VIVA-COMPLETO-2.pdf` (39 poemas, págs. 5–43)
> Transcrições: `data/transcripts/audio-01..06.txt` (geradas por faster-whisper)

---

## Tabela de Reconciliação

| Faixa | Título antes | Título correto (PDF) | Evidência (transcrição) | Evidência (PDF, trecho) | Ação |
|-------|-------------|---------------------|------------------------|------------------------|------|
| audio-01.mpeg | Forma de Amar | **Forma de Amar** | "forma de amar água viva de Antonio Carlos Tórtoro de guarda sol em guarda sol..." | "De guarda-sol em guarda-sol, de quiosque em quiosque, qual borboleta em um bosque..." (pág. 21) | ✅ Mantido |
| audio-02.mpeg | Bala Perdida | **Encontrado** | "Sempre só, cego extraviado em velas, iluminadas pela escuridão da noite... foi encontrado e atingido por uma bala perdida." | "Perambulava sempre só cego extraviado em vielas... foi encontrado e atingido por uma bala perdida." (pág. 16) | ❌→✅ Corrigido |
| audio-03.mpeg | Louvado Seja o Senhor | **Louvor** | "lovado seja o senhor se estou sol acompanhado na tristeza, na alegria..." | "Louvado seja o Senhor se estou só ou acompanhado, na tristeza, alegria..." (pág. 24) | ❌→✅ Corrigido |
| audio-04.mpeg | Cócoras | **Kokura** | "Poema-côcura... Reclamo de nuvens negras que pairam sobre minha vida..." | "Reclamo de nuvens negras que pairam sobre minha vida... Mau tempo salvou Kokura." (pág. 23) | ❌→✅ Corrigido |
| audio-05.mpeg | Natal | **Mais Um** | "Mais um, do Água Viva... passou o Natal na boca o gosto de saco vazio do Papai Noel..." | "Passou o Natal. Na boca o gosto de saco vazio do Papai Noel... Espera de um Ano Novo !!!" (pág. 25) | ❌→✅ Corrigido |
| audio-06.mpeg | Mariana | **Mariana** | "Poema, Mariana... Mar de Ana, Ana do Mar e de Amar..." | "Mar e Ana. Mais Ana que mar, pouco mar para Ana. Mar de Ana, Ana do mar e de amar." (pág. 26) | ✅ Mantido |

---

## Erros de Título — Análise

| Título errado | Por que estava errado | Título real |
|---------------|----------------------|-------------|
| **Bala Perdida** | Whisper usou o último verso ("bala perdida") como título; o poema se chama "Encontrado" no PDF | Encontrado |
| **Louvado Seja o Senhor** | Whisper usou o primeiro verso como título; o poema se chama "Louvor" no PDF | Louvor |
| **Cócoras** | Erro fonético do Whisper: "Kokura" (cidade japonesa) → "Côcura" → "Cócoras" | Kokura |
| **Natal** | Whisper inferiu o tema; o poema "Mais Um" é sobre o Natal, mas o título real é outro | Mais Um |

---

## Outras Correções Aplicadas

| Item | Antes | Depois |
|------|-------|--------|
| Título da seção audiobook | "Água Viva — Edição Lua" | "Livro Água Viva — Edição Audiobook" |
| Subtítulo da degustação | "🎧 Degustação da Edição Lua" | "🎧 Degustação do Audiobook" |
| CTA do audiobook | "acesso à Edição Lua" | "acesso ao audiobook" |
| Linha "Voz: Voz do projeto" | Exibida no card de cada faixa | Removida (voz gerada por IA) |
| Campo `voice` nos dados | "Voz do projeto" / "Mariana" | `""` (string vazia, campo mantido na interface) |

---

## Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `src/components/AudiobookSection.tsx` | "Edição Lua" → "Edição Audiobook" (3 ocorrências) |
| `src/components/AudioGallery.tsx` | "Edição Lua" → "Edição Audiobook" (2 ocorrências); removida linha `Voz: {audio.voice}` |
| `src/data/audios.ts` | Títulos corrigidos (4 poemas), `voice` limpo (6 faixas), `note` atualizada (3 faixas) |
| `data/metadata/audios.transcribed.json` | Títulos e `voice` corrigidos (6 entradas) |
| `README.md` | Tabela de poemas atualizada com títulos corretos |

---

## Validação

- ✅ Zero poemas inventados — todos verificados contra o PDF original
- ✅ Títulos exatamente como aparecem no índice do livro
- ✅ "Bala Perdida", "Louvado Seja o Senhor", "Cócoras" e "Natal" NÃO existem como títulos no PDF
- ✅ Build Next.js passa sem erros
- ✅ Nenhuma rota, slug, path ou import alterado
