/** Start `astro preview` on dist/ for the export scripts, and stop it again. */
import { execSync, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

export async function startPreview(port = 4455): Promise<{ url: string; stop: () => void }> {
  if (!existsSync(resolve(root, 'dist/index.html'))) throw new Error('dist/ not found — run `npm run build` first.');
  // --force: Astro allows one preview server per project; replace a leftover one instead of failing
  const child = spawn(`npx astro preview --port ${port} --force`, { cwd: root, shell: true, stdio: 'ignore' });
  const url = `http://localhost:${port}`;
  for (let i = 0; ; i++) {
    try {
      if ((await fetch(url)).ok) break;
    } catch {
      /* not up yet */
    }
    if (i === 60) throw new Error('preview server did not start');
    await new Promise((r) => setTimeout(r, 500));
  }
  const stop = () => {
    try {
      execSync('npx astro preview stop', { cwd: root, stdio: 'ignore' });
    } catch {
      /* already stopped */
    }
    // shell: true → also end the wrapper process tree on Windows
    if (process.platform === 'win32' && child.pid) spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    else child.kill();
  };
  return { url, stop };
}
