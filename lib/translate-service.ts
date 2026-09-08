import lexiconData from "@/data/lexicon.json";
import { SIGNS, type Sign } from "@/data/signs";

export type Direction = "es-qu" | "qu-es";
export type InputMode = "texto" | "voz" | "sena";

const PAIRS = lexiconData as [string, string][];

export const LEXICON_SIZE = PAIRS.length;
export const SIGN_COUNT = SIGNS.length;
export const REFERENCE_ACCURACY = 86.03;

const esToQu = new Map<string, string>();
const quToEs = new Map<string, string>();

for (const [es, qu] of PAIRS) {
  if (!esToQu.has(es)) esToQu.set(es, qu);
  if (!quToEs.has(qu)) quToEs.set(qu, es);
}

export interface Token {
  source: string;
  output: string;
  matched: boolean;
}

export interface TranslationResult {
  kind: "traduccion";
  mode: InputMode;
  direction: Direction;
  source: string;
  output: string;
  tokens: Token[];
  coverage: number;
  elapsedMs: number;
  unmatched: string[];
}

export interface SignResult {
  kind: "sena";
  sign: Sign;
  confidence: number;
  elapsedMs: number;
  landmarks: number;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[¿?¡!.,;:()"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function lookup(phrase: string, direction: Direction): string | undefined {
  return direction === "es-qu" ? esToQu.get(phrase) : quToEs.get(phrase);
}

function tokenize(text: string, direction: Direction): Token[] {
  const words = normalize(text).split(" ").filter(Boolean);
  const tokens: Token[] = [];
  let i = 0;

  while (i < words.length) {
    let consumed = 0;
    let hit: string | undefined;

    for (let window = Math.min(3, words.length - i); window >= 1; window--) {
      const phrase = words.slice(i, i + window).join(" ");
      const found = lookup(phrase, direction);
      if (found) {
        hit = found;
        consumed = window;
        break;
      }
    }

    if (hit && consumed > 0) {
      tokens.push({
        source: words.slice(i, i + consumed).join(" "),
        output: hit,
        matched: true,
      });
      i += consumed;
    } else {
      tokens.push({ source: words[i], output: words[i], matched: false });
      i += 1;
    }
  }

  return tokens;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function translateText(
  text: string,
  direction: Direction,
  mode: InputMode = "texto",
): Promise<TranslationResult> {
  const started = performance.now();
  await delay(450 + Math.random() * 350);

  const tokens = tokenize(text, direction);
  const matched = tokens.filter((t) => t.matched).length;

  return {
    kind: "traduccion",
    mode,
    direction,
    source: text.trim(),
    output: tokens.map((t) => t.output).join(" "),
    tokens,
    coverage: tokens.length ? Math.round((matched / tokens.length) * 1000) / 10 : 0,
    elapsedMs: Math.round(performance.now() - started),
    unmatched: tokens.filter((t) => !t.matched).map((t) => t.source),
  };
}

export async function recognizeSign(hint?: string): Promise<SignResult> {
  const started = performance.now();
  await delay(700 + Math.random() * 500);

  const sign = hint
    ? (SIGNS.find((s) => s.es === hint) ?? SIGNS[0])
    : SIGNS[Math.floor(Math.random() * SIGNS.length)];

  return {
    kind: "sena",
    sign,
    confidence: Math.round((REFERENCE_ACCURACY + (Math.random() * 8 - 4)) * 100) / 100,
    elapsedMs: Math.round(performance.now() - started),
    landmarks: 543,
  };
}

export { SIGNS };
export type { Sign };
