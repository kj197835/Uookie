/**
 * Publish the built site (dist/) to the `gh-pages` branch over SSH — deploy on request only.
 * Usage: npm run deploy   (builds first, then runs this)
 * GitHub Pages must be set to: Settings → Pages → Source "Deploy from a branch" → gh-pages / (root).
 * The branch holds build output only (force-pushed each time); source stays on `master`.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const REMOTE = 'git@github.com:kj197835/Uookie.git';
const BRANCH = 'gh-pages';
const dist = join(process.cwd(), 'dist');

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}
if (!existsSync(join(dist, 'CNAME'))) {
  console.error('dist/CNAME missing — the custom domain would be dropped. Check public/CNAME.');
  process.exit(1);
}

const work = mkdtempSync(join(tmpdir(), 'uookie-pages-'));
const git = (...args) => execFileSync('git', args, { cwd: work, stdio: 'inherit' });
const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();

try {
  cpSync(dist, work, { recursive: true });
  // Serve files as-is: without this, GitHub's Jekyll step drops Astro's `_astro/` folder.
  writeFileSync(join(work, '.nojekyll'), '');
  git('init', '-q', '-b', BRANCH);
  git('add', '-A');
  git('-c', 'user.name=kj197835', '-c', 'user.email=kj197835@gmail.com', 'commit', '-q', '-m', `Deploy site from ${sha}`);
  git('push', '--force', REMOTE, `${BRANCH}:${BRANCH}`);
  console.log(`Deployed ${sha} to ${BRANCH}.`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
