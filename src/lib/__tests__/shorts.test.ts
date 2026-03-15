import { describe, it, expect } from "vitest";
import { extractShortIds, extractIdsFromUrls } from "../shorts";

describe("extractShortIds", () => {
  it("extrai IDs de HTML com links /shorts/", () => {
    const html = `
      <a href="/shorts/abc12345678">Short 1</a>
      <a href="/shorts/def90123456">Short 2</a>
    `;
    expect(extractShortIds(html)).toEqual(["abc12345678", "def90123456"]);
  });

  it("retorna array vazio quando não há IDs", () => {
    expect(extractShortIds("sem shorts aqui")).toEqual([]);
  });

  it("deduplica IDs repetidos", () => {
    const html = `/shorts/abc12345678 /shorts/abc12345678`;
    expect(extractShortIds(html)).toEqual(["abc12345678"]);
  });

  it("ignora IDs com tamanho incorreto", () => {
    const html = `/shorts/abc123`; // apenas 6 chars
    expect(extractShortIds(html)).toEqual([]);
  });
});

describe("extractIdsFromUrls", () => {
  it("extrai de youtube.com/shorts/", () => {
    expect(extractIdsFromUrls("https://youtube.com/shorts/abc12345678"))
      .toEqual(["abc12345678"]);
  });

  it("extrai de youtu.be/", () => {
    expect(extractIdsFromUrls("https://youtu.be/abc12345678"))
      .toEqual(["abc12345678"]);
  });

  it("extrai de youtube.com/watch?v=", () => {
    expect(extractIdsFromUrls("https://youtube.com/watch?v=abc12345678"))
      .toEqual(["abc12345678"]);
  });

  it("extrai múltiplos formatos misturados", () => {
    const text = `
      https://youtube.com/shorts/aaa11111111
      https://youtu.be/bbb22222222
      https://youtube.com/watch?v=ccc33333333
    `;
    expect(extractIdsFromUrls(text)).toEqual([
      "aaa11111111",
      "bbb22222222",
      "ccc33333333",
    ]);
  });

  it("deduplica IDs iguais de formatos diferentes", () => {
    const text = `
      https://youtube.com/shorts/abc12345678
      https://youtu.be/abc12345678
    `;
    expect(extractIdsFromUrls(text)).toEqual(["abc12345678"]);
  });
});
