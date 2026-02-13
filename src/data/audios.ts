export interface AudioItem {
  id: string;
  title: string;
  poem?: string;
  voice: string;
  duration: string;
  note: string;
  src: string;
}

export const audios: AudioItem[] = [
  {
    id: "wa0052",
    title: "Degustação Sonora 1",
    poem: "Água-Viva",
    voice: "Voz principal",
    duration: "01:07",
    note: "Trecho recitado em estilo intimista, capturando a essência poética.",
    src: "/api/audio/audio-01.mpeg"
  },
  {
    id: "wa0053",
    title: "Degustação Sonora 2",
    poem: "Água-Viva",
    voice: "Voz principal",
    duration: "02:13",
    note: "Exploração rítmica da palavra, com pausas que ecoam o silêncio.",
    src: "/api/audio/audio-02.mpeg"
  },
  {
    id: "wa0054",
    title: "Degustação Sonora 3",
    poem: "Água-Viva",
    voice: "Voz principal",
    duration: "02:10",
    note: "Interpretação que destaca a transparência e brilho da poesia.",
    src: "/api/audio/audio-03.mpeg"
  },
  {
    id: "wa0055",
    title: "Degustação Sonora 4",
    poem: "Água-Viva",
    voice: "Voz principal",
    duration: "01:35",
    note: "Recitação suave, como luz filtrada pela água.",
    src: "/api/audio/audio-04.mpeg"
  },
  {
    id: "wa0056",
    title: "Degustação Sonora 5",
    poem: "Água-Viva",
    voice: "Voz principal",
    duration: "01:10",
    note: "Momento de reflexão sonora, onde a palavra se dissolve em emoção.",
    src: "/api/audio/audio-05.mpeg"
  },
  {
    id: "mariana",
    title: "Declamação Mariana",
    poem: "Água-Viva",
    voice: "Mariana",
    duration: "01:07",
    note: "Interpretação especial de Mariana, trazendo uma voz feminina à poesia.",
    src: "/api/audio/audio-06.mpeg"
  }
];
