// Polls the Work File comments and prints one line per new human comment (run it under Monitor).
// The first run only records what exists, so old comments don't flood the stream.
import { getComments, readSeen, markSeen, oneLine, ALIEN } from './lib.mjs';

const INTERVAL = Number(process.env.POLL_SECONDS || 60) * 1000;

if (!readSeen()) markSeen((await getComments()).map((c) => c.id));

let failures = 0;
for (;;) {
  try {
    const seen = readSeen();
    const fresh = (await getComments())
      .filter((c) => !seen.has(c.id))
      .sort((a, b) => a.created_at.localeCompare(b.created_at));
    for (const c of fresh) if (!c.message.startsWith(ALIEN.slice(0, 2))) console.log(`NEW ${oneLine(c)}`);
    if (fresh.length) markSeen(fresh.map((c) => c.id));
    failures = 0;
  } catch (e) {
    if (++failures === 3) console.log(`WATCHER ERROR (3 in a row): ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, INTERVAL));
}
