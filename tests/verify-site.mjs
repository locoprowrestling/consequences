import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const cname = (await readFile(path.join(root, 'CNAME'), 'utf8')).trim();

assert.equal(cname, 'consequences.locopro.pw');
assert.match(html, /Consequences on Coffman Street/);
assert.match(html, /Date and bell time[\s\S]*To be announced/);
assert.match(html, /Venue and tickets[\s\S]*To be announced/);
assert.doesNotMatch(html, /Last Stand|August 30, 2026|tickets\.locopro\.pw/i);

const localRefs = [...html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)]
  .map((match) => match[1])
  .filter((ref) => !/^(?:https?:|data:|mailto:|tel:)/.test(ref));

for (const ref of localRefs) {
  const clean = ref.split('?')[0];
  const target = clean === './' ? 'index.html' : clean;
  await access(path.join(root, target), constants.R_OK);
}

console.log(`Verified title, unknown-field boundaries, CNAME, and ${localRefs.length} local asset references.`);
