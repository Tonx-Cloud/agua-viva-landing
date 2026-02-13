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
    src: "https://placeholder-url-for-AUD-20260212-WA0052.mp3" // Substitua pela URL real do Vercel Blob
  },
  {
    id: "wa0053",
    title: "Degustação Sonora 2",
    poem: "Água-Viva",
    voice: "Voz principal",
    duration: "02:13",
    note: "Exploração rítmica da palavra, com pausas que ecoam o silêncio.",
    src: "https://placeholder-url-for-AUD-20260212-WA0053.mp3" // Substitua pela URL real do Vercel Blob
  },
  {
    id: "wa0054",
    title: "Degustação Sonora 3",
    poem: "Água-Viva",
    voice: "Voz principal",
    duration: "02:10",
    note: "Interpretação que destaca a transparência e brilho da poesia.",
    src: "https://placeholder-url-for-AUD-20260212-WA0054.mp3" // Substitua pela URL real do Vercel Blob
  },
  {
    id: "wa0055",
    title: "Degustação Sonora 4",
    poem: "Água-Viva",
    voice: "Voz principal",
    duration: "01:35",
    note: "Recitação suave, como luz filtrada pela água.",
    src: "https://placeholder-url-for-AUD-20260212-WA0055.mp3" // Substitua pela URL real do Vercel Blob
  },
  {
    id: "wa0056",
    title: "Degustação Sonora 5",
    poem: "Água-Viva",
    voice: "Voz principal",
    duration: "01:10",
    note: "Momento de reflexão sonora, onde a palavra se dissolve em emoção.",
    src: "https://placeholder-url-for-AUD-20260212-WA0056.mp3" // Substitua pela URL real do Vercel Blob
  },
  {
    id: "mariana",
    title: "Declamação Mariana",
    poem: "Água-Viva",
    voice: "Mariana",
    duration: "01:07",
    note: "Interpretação especial de Mariana, trazendo uma voz feminina à poesia.",
    src: "https://placeholder-url-for-mariana-declamacao-1.mp3" // Substitua pela URL real do Vercel Blob
  }
];
