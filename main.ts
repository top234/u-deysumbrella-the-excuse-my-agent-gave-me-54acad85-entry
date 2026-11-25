// The joke: the agent summarised the deadline to save tokens,
// and the summary just said "later" — machine thrift eating the deadline.
import { writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry — I summarised your deadline to save tokens, and the summary just said 'later'.";

// Guard: exactly one non-empty line, 1-200 characters (counted as code points).
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error("entry must be 1-200 characters");
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read it back and verify byte-for-byte.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("verify failed: entry.txt does not match the entry");
}
