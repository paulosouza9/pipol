import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CACHE_FILE = path.join(process.cwd(), '.translations-cache.json');

function loadCache(): Record<string, string> {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    }
  } catch {
    // ignore read errors
  }
  return {};
}

function saveCache(cache: Record<string, string>): void {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  } catch {
    // ignore write errors (e.g. read-only filesystem in production)
  }
}

function cacheKey(text: string, from: string, to: string): string {
  return crypto.createHash('md5').update(`${from}|${to}|${text}`).digest('hex');
}

// Split long text at sentence boundaries to stay within the 500-char API limit.
function splitIntoChunks(text: string, maxLength = 480): string[] {
  if (text.length <= maxLength) return [text];

  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + ' ' + sentence).length > maxLength) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current = current ? current + ' ' + sentence : sentence;
    }
  }
  if (current) chunks.push(current.trim());

  // If a single sentence is still too long, hard-split it.
  return chunks.flatMap((chunk) =>
    chunk.length > maxLength
      ? [chunk.slice(0, maxLength), chunk.slice(maxLength)]
      : [chunk]
  );
}

async function callTranslateAPI(text: string, from: string, to: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`Translation API responded with ${res.status}`);
  const data = await res.json();
  const translated: string = data?.responseData?.translatedText;
  if (!translated) throw new Error('Empty translation response');
  return translated;
}

/**
 * Translates a text string from `from` locale to `to` locale.
 * Uses a persistent JSON cache keyed by an MD5 of the source text.
 * Falls back to the original text if the API is unavailable.
 */
export async function translateText(
  text: string,
  from = 'es',
  to = 'en'
): Promise<string> {
  if (!text?.trim() || from === to) return text;

  const cache = loadCache();
  const key = cacheKey(text, from, to);

  if (cache[key]) return cache[key];

  try {
    const chunks = splitIntoChunks(text.trim());
    const translatedChunks: string[] = [];

    for (const chunk of chunks) {
      const result = await callTranslateAPI(chunk, from, to);
      translatedChunks.push(result);
      // Small delay to be polite to the free API.
      if (chunks.length > 1) await new Promise((r) => setTimeout(r, 150));
    }

    const translated = translatedChunks.join(' ');
    cache[key] = translated;
    saveCache(cache);
    return translated;
  } catch {
    // Fall back to original text so the site never breaks.
    return text;
  }
}
