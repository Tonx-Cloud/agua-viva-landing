/**
 * Extrai IDs de vídeos do YouTube Shorts a partir de texto HTML/Markdown.
 */
export function extractShortIds(text: string): string[] {
  const regex = /\/shorts\/([a-zA-Z0-9_-]{11})/g;
  const ids = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    ids.add(match[1]);
  }
  return Array.from(ids);
}

/**
 * Extrai IDs de URLs coladas pelo usuário (fallback manual).
 */
export function extractIdsFromUrls(text: string): string[] {
  const patterns = [
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/g,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/g,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/g,
  ];
  const ids = new Set<string>();
  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      ids.add(match[1]);
    }
  }
  return Array.from(ids);
}
