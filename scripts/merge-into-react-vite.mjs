#!/usr/bin/env node
/**
 * Safe migration helper — NO changes without --apply.
 * Preserves overwritten file versions under .nishanth-pre-merge/ and a URL inventory.
 * Only supports existing React + Vite projects. Never touches .git or deploys.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, relative, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2] && resolve(process.argv[2]);
const apply = process.argv.includes('--apply');
const ignored = new Set(['.git', 'node_modules', 'dist', '.next', '.nishanth-pre-merge']);

if (!target || !existsSync(join(target, 'package.json'))) {
  console.error('Usage: node scripts/merge-into-react-vite.mjs /absolute/path/to/existing-repo [--apply]');
  process.exit(2);
}
if (target === source) { console.error('The target must be a DIFFERENT existing project.'); process.exit(2); }
const orig = JSON.parse(readFileSync(join(target, 'package.json'), 'utf8'));
const ours = JSON.parse(readFileSync(join(source, 'package.json'), 'utf8'));
if (!orig.dependencies?.react && !orig.devDependencies?.react) {
  console.error('This appears not to be a React project. Aborted.'); process.exit(2);
}
if (!orig.dependencies?.vite && !orig.devDependencies?.vite) {
  console.error('This is not recognized as a Vite project. Review and port manually.'); process.exit(2);
}

const sourceFiles = ['index.html', 'tsconfig.json', 'vite.config.ts'];
function traverse(folder) {
  if (!existsSync(join(source, folder))) return;
  for (const entry of readdirSync(join(source, folder), { withFileTypes: true })) {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) traverse(path);
    else sourceFiles.push(path);
  }
}
traverse('src');
traverse('public');

const report = {
  destination: target,
  detectedFramework: 'React + Vite',
  apply,
  wouldOverwrite: sourceFiles.filter(file => existsSync(join(target, file))),
  createOrReplace: sourceFiles,
  originalPublicUrls: [],
};
function inventory(dir, depth = 0) {
  if (depth > 8 || !existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) inventory(path, depth + 1);
    else if (['.jsx', '.tsx', '.js', '.ts', '.html', '.json', '.md'].includes(extname(path)) && statSync(path).size < 2e6) {
      const text = readFileSync(path, 'utf8');
      const urls = [...new Set(text.match(/https?:\/\/[^\s'"`<>)}\]]+/g) || [])];
      for (const url of urls) if (/github\.com|linkedin\.com|vercel\.app|drive\.google\.com|\.pdf/.test(url)) report.originalPublicUrls.push({ file: relative(target, path), url });
    }
  }
}
inventory(target);
report.originalPublicUrls = report.originalPublicUrls.filter((obj, index, arr) => arr.findIndex(x => x.file === obj.file && x.url === obj.url) === index);
console.log(JSON.stringify(report, null, 2));
if (!apply) {
  console.log('\nDRY RUN ONLY. Re-run with --apply to back up and merge into this Vite repository.');
  process.exit(0);
}
const backup = join(target, '.nishanth-pre-merge');
mkdirSync(backup, { recursive: true });
for (const file of sourceFiles) {
  const destination = join(target, file);
  if (existsSync(destination)) {
    mkdirSync(dirname(join(backup, file)), { recursive: true });
    cpSync(destination, join(backup, file));
  }
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(join(source, file), destination);
}
cpSync(join(target, 'package.json'), join(backup, 'package.json'));
writeFileSync(join(backup, 'migration-report.json'), JSON.stringify(report, null, 2));
const scripts = { ...orig.scripts, dev: 'vite --host 0.0.0.0', build: 'tsc --noEmit && vite build', preview: 'vite preview --host 0.0.0.0', typecheck: 'tsc --noEmit', 'test:source': 'node --test tests/*.test.mjs' };
const merged = { ...orig, type: 'module', dependencies: { ...orig.dependencies, ...ours.dependencies }, devDependencies: { ...orig.devDependencies, ...ours.devDependencies }, scripts };
writeFileSync(join(target, 'package.json'), JSON.stringify(merged, null, 2) + '\n');
// Add a copy of source-only tests without interfering with existing test runners.
mkdirSync(join(target, 'tests'), { recursive: true });
const testTarget = join(target, 'tests', 'source.test.mjs');
if (existsSync(testTarget)) cpSync(testTarget, join(backup, 'source.test.mjs'));
cpSync(join(source, 'tests', 'source.test.mjs'), testTarget);
console.log('\nMerged into the existing Vite project. Backups and previous link inventory:', backup);
console.log('Next: inspect migration-report.json, restore original URLs into src/config/portfolio.ts, npm install, npm run build.');
console.log('Nothing was deployed or pushed to Git.');
