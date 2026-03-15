import { describe, it, expect } from "vitest";
import { audios } from "../audios";

describe("audios data", () => {
  it("contém 6 itens de áudio", () => {
    expect(audios.length).toBe(6);
  });

  it("todos têm campos obrigatórios preenchidos", () => {
    for (const a of audios) {
      expect(a.id).toBeTruthy();
      expect(a.title).toBeTruthy();
      expect(a.poem).toBeTruthy();
      expect(a.author).toBeTruthy();
      expect(a.duration).toMatch(/^\d{2}:\d{2}$/);
      expect(a.src).toMatch(/^\/api\/audio\//);
      expect(a.filename).toMatch(/\.(mpeg|mp3)$/);
    }
  });

  it("IDs são únicos", () => {
    const ids = audios.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
