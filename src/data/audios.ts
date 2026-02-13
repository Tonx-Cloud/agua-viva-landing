export interface AudioItem {
  id: string;
  title: string;
  poem: string;
  author: string;
  voice: string;
  duration: string;
  note: string;
  transcriptPreview: string;
  src: string;
  filename: string;
}

export const audios: AudioItem[] = [
  {
    id: "audio01",
    title: "Degustação — Forma de Amar",
    poem: "Forma de Amar",
    author: "Antônio Carlos Tótoro",
    voice: "Voz do projeto",
    duration: "01:35",
    note: "Declamação envolvente sobre uma figura feminina que encanta a praia como uma borboleta num bosque — \"serei a mulher aquarela, vai banhando-se ao sol, causando inveja ao mar.\"",
    transcriptPreview: "De guarda-sol em guarda-sol, de quiosque em quiosque, qual borboleta em um bosque, uma figura sem par. Não é A Florista de Chaplin, nem é La Violeteira, mas enfeitiça como tais. No ritual de mil véus, envolta em lenços macios, serei a mulher aquarela, vai banhando-se ao sol, causando inveja ao mar.",
    src: "/api/audio/audio-01.mpeg",
    filename: "audio-01.mpeg",
  },
  {
    id: "audio02",
    title: "Degustação — Bala Perdida",
    poem: "Bala Perdida",
    author: "Antônio Carlos Tótoro",
    voice: "Voz do projeto",
    duration: "01:17",
    note: "Poema contundente sobre solidão e invisibilidade — alguém \"sempre só, cego, extraviado\", que na vida foi encontrado por uma bala perdida.",
    transcriptPreview: "Sempre só, cego, extraviado em velas iluminadas pela escuridão da noite. Signo do nada, pó, agava na garganta um nó. A uma negra entre belas, dispersa na imensidão, de alguém sumido que, sempre só na vida, foi encontrado e atingido por uma bala perdida.",
    src: "/api/audio/audio-02.mpeg",
    filename: "audio-02.mpeg",
  },
  {
    id: "audio03",
    title: "Degustação — Louvado Seja o Senhor",
    poem: "Louvado Seja o Senhor",
    author: "Antônio Carlos Tótoro",
    voice: "Voz do projeto",
    duration: "02:09",
    note: "Oração em forma de poesia — louvor que atravessa tristeza, alegria, labuta e deserto, numa cadência de fé e entrega.",
    transcriptPreview: "Louvado seja o Senhor se estou só, acompanhado, na tristeza, na alegria, na labuta, na tormenta. Louvado seja o Senhor se estou alegre ou magoado, seja de noite ou seja de dia, se estou em paz, no deserto. Louvado seja o Senhor.",
    src: "/api/audio/audio-03.mpeg",
    filename: "audio-03.mpeg",
  },
  {
    id: "audio04",
    title: "Degustação — Cócoras",
    poem: "Cócoras",
    author: "Antônio Carlos Tótoro",
    voice: "Voz do projeto",
    duration: "02:13",
    note: "Reclame visceral contra nuvens negras, angústias e incertezas — um grito poético de resistência sob a tormenta da vida.",
    transcriptPreview: "Reclamo de nuvens negras que pairam sobre minha vida, cúmulos de angústia, tempestade de tensões. Reclamo do véu nublado que ronda o meu destino, manto de incertezas, tormenta e desilusões.",
    src: "/api/audio/audio-04.mpeg",
    filename: "audio-04.mpeg",
  },
  {
    id: "audio05",
    title: "Degustação — Natal",
    poem: "Natal",
    author: "Antônio Carlos Tótoro",
    voice: "Voz do projeto",
    duration: "01:37",
    note: "Retrato melancólico do Natal — restos de festa, meias vazias, migalhas de alegria e a espera que persiste.",
    transcriptPreview: "Passou o Natal. Na boca o gosto de saco vazio do Papai Noel. Um misto de nada e fel. Na mesa, o resto da festa. Leitão é sorriso cruel. O olhar busca em vão as renas do Noel. Fantasias de um povo. Vazias meias dependuradas. Restos de rabanadas. Migalhas de alegrias. Espera.",
    src: "/api/audio/audio-05.mpeg",
    filename: "audio-05.mpeg",
  },
  {
    id: "mariana",
    title: "Declamação Mariana — Mariana",
    poem: "Mariana",
    author: "Antônio Carlos Tótoro",
    voice: "Mariana",
    duration: "01:07",
    note: "Poema sobre o nome Mariana entrelaçado com o mar — Ana, mar, amar, Iemanjá — numa dança de sons e significados.",
    transcriptPreview: "Mar de Ana, Ana do Mar e de Amar. Pra interior Ana, cabelos ondas a reventar. Mariana, Ana mãe de Maria e Iemanjá mãe do mar. Mar e céu, no céu do mar do seu olhar, calmaria. Um mar de estrelas, de estrelas do mar. Mariana.",
    src: "/api/audio/audio-06.mpeg",
    filename: "audio-06.mpeg",
  },
];
