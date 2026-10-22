// Lists unresolved threads whose last message is human (nobody has answered with the alien yet).
// Usage: node open.mjs [--since 2026-10-20]
import { getComments, oneLine, ALIEN } from './lib.mjs';

const sinceIdx = process.argv.indexOf('--since');
const since = sinceIdx > -1 ? process.argv[sinceIdx + 1] : '';
const all = await getComments();
const roots = all.filter((c) => !c.parent_id && !c.resolved_at && c.created_at >= since);
for (const root of roots.sort((a, b) => a.created_at.localeCompare(b.created_at))) {
  const thread = [root, ...all.filter((c) => c.parent_id === root.id)].sort((a, b) => a.created_at.localeCompare(b.created_at));
  const last = thread.at(-1);
  if (last.message.startsWith(ALIEN.slice(0, 2))) continue;
  console.log(`OPEN ${oneLine(root)}${last !== root ? `\n  latest: ${oneLine(last)}` : ''}`);
}
