// Usage: node reply.mjs <comment_id> <message-file | "text">
// Replies in the thread with the alien prefix. Pass "-" as the id to post a new top-level comment (no pin).
import fs from 'node:fs';
import { postReply } from './lib.mjs';

const [id, arg] = process.argv.slice(2);
if (!id || !arg) throw new Error('Usage: node reply.mjs <comment_id|-> <message-file | "text">');
const text = fs.existsSync(arg) ? fs.readFileSync(arg, 'utf8').trim() : arg;
const body = await postReply(id === '-' ? null : id, text);
console.log(body.id);
