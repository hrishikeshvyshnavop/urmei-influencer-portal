// Shared helpers for the comment scripts: token, file key, state dir, API calls.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, '../../../..');
export const FILE_KEY = process.env.FIGMA_FILE_KEY || 'FdmVPJo1j4t8s9gej1H7Yb'; // Work File
export const stateDir = path.join(repoRoot, '.figma-comments');
export const ALIEN = '👽︎'; // alien + text variation selector; a bare emoji is stored as shortcode text

export function token() {
  if (process.env.FIGMA_TOKEN) return process.env.FIGMA_TOKEN.trim();
  const file = path.join(repoRoot, '.figma-token');
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8').trim();
  throw new Error('No Figma token: set FIGMA_TOKEN or put it in .figma-token (git-ignored)');
}

export async function getComments() {
  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/comments`, { headers: { 'X-Figma-Token': token() } });
  if (!res.ok) throw new Error(`GET comments: HTTP ${res.status}`);
  return (await res.json()).comments ?? [];
}

export async function postReply(commentId, text) {
  const message = text.startsWith(ALIEN) ? text : `${ALIEN} ${text}`;
  // Figma rejects a reply to a reply, so always answer on the thread's root comment
  if (commentId) {
    const target = (await getComments()).find((c) => c.id === commentId);
    if (target?.parent_id) commentId = target.parent_id;
  }
  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/comments`, {
    method: 'POST',
    headers: { 'X-Figma-Token': token(), 'Content-Type': 'application/json' },
    body: JSON.stringify(commentId ? { message, comment_id: commentId } : { message }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`POST reply: HTTP ${res.status} ${JSON.stringify(body)}`);
  markSeen([body.id]);
  return body;
}

const seenFile = () => path.join(stateDir, 'seen.json');

export function readSeen() {
  return fs.existsSync(seenFile()) ? new Set(JSON.parse(fs.readFileSync(seenFile(), 'utf8'))) : null;
}

export function markSeen(ids) {
  fs.mkdirSync(stateDir, { recursive: true });
  const seen = readSeen() ?? new Set();
  for (const id of ids) seen.add(id);
  fs.writeFileSync(seenFile(), JSON.stringify([...seen]));
}

export const oneLine = (c) =>
  `id=${c.id} parent=${c.parent_id || '-'} node=${c.client_meta?.node_id ?? ''} by=${c.user.handle}: ${c.message.replace(/\s+/g, ' ').slice(0, 400)}`;
