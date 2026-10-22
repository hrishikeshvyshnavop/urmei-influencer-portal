// Usage: node comment.mjs <frame_node_id> <x> <y> <message-file | "text">
// Posts a new top-level comment pinned at (x, y) inside the frame, with the alien prefix.
import fs from 'node:fs';
import { FILE_KEY, token, markSeen, ALIEN } from './lib.mjs';

const [nodeId, x, y, arg] = process.argv.slice(2);
if (!nodeId || !arg) throw new Error('Usage: node comment.mjs <frame_node_id> <x> <y> <message-file | "text">');
const text = fs.existsSync(arg) ? fs.readFileSync(arg, 'utf8').trim() : arg;
const message = text.startsWith(ALIEN) ? text : `${ALIEN} ${text}`;
const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/comments`, {
  method: 'POST',
  headers: { 'X-Figma-Token': token(), 'Content-Type': 'application/json' },
  body: JSON.stringify({ message, client_meta: { node_id: nodeId, node_offset: { x: Number(x), y: Number(y) } } }),
});
const body = await res.json();
if (!res.ok) throw new Error(`POST comment: HTTP ${res.status} ${JSON.stringify(body)}`);
markSeen([body.id]);
console.log(body.id);
