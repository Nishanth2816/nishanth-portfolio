import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const app = read('src/App.tsx');
const content = read('src/config/portfolio.ts');
const styles = read('src/styles.css');
const scene = read('src/features/NeuralScene.tsx');
const nav = read('src/components/Navigation.tsx');
const projectCard = read('src/components/ProjectCard.tsx');

test('critical identity and verified contact links exist', () => {
  for (const name of ['Lingampalli Nishanth', 'nishanthsunny07@gmail.com', 'Nishanth2816', 'lingampallinishanth']) assert.ok(content.includes(name), name);
});
test('all requested sections are represented', () => {
  for (const id of ['home', 'about', 'projects', 'experience', 'skills', 'contact']) assert.match(app, new RegExp(`id="${id}"`));
  for (const id of ['about', 'projects', 'experience', 'skills', 'contact']) assert.ok(content.includes(`id: '${id}'`));
});
test('all verified projects, experience, and academic institutions are present', () => {
  for (const text of ['NeuralRetail', 'RAG-based AI Chatbot', 'Hostel Operations Analytics', 'Cinema Booking System', 'AMDOX Technologies', 'Handshake', 'Indian Institute of Technology Indore', '5,878', '40.8%']) assert.ok(content.includes(text), text);
});
test('unverified project-specific source/demo links are not fabricated', () => {
  assert.equal((content.match(/sourceUrl: null/g) ?? []).length, 4);
  assert.equal((content.match(/demoUrl: null/g) ?? []).length, 4);
  assert.match(projectCard, /GITHUB PROFILE/);
  assert.match(projectCard, /REQUEST A DEMO/);
});
test('both original PDF resumes are embedded', () => {
  for (const file of ['Lingampalli_Nishanth_Resume.pdf', 'Lingampalli_Nishanth_Alternate_Resume.pdf']) {
    const path = resolve(root, 'public', file);
    assert.ok(existsSync(path), file);
    assert.equal(readFileSync(path).subarray(0, 4).toString('ascii'), '%PDF');
  }
});
test('animation dependencies have real integration points', () => {
  for (const text of ['ScrollTrigger', 'gsap.timeline', 'new Lenis', 'lenis.raf', 'cameraProxy', 'progress.current']) assert.ok(app.includes(text), text);
  for (const text of ['Canvas', 'useFrame', 'icosahedronGeometry', 'torusGeometry', 'ParticleCloud', 'onPointerOver', 'frameloop']) assert.ok(scene.includes(text), text);
});
test('responsive, accessibility and low-motion controls exist', () => {
  assert.match(styles, /prefers-reduced-motion:reduce/);
  assert.match(styles, /@media\(max-width:560px\)/);
  assert.match(nav, /Skip to content/);
  assert.match(nav, /aria-expanded/);
  assert.match(app, /toggleMotion/);
  assert.match(read('src/components/SkillConstellation.tsx'), /role="tablist"/);
});
test('imported local project source paths exist', () => {
  const dir = resolve(root, 'src');
  function walk(path) {
    for (const name of readdirSync(path, { withFileTypes: true })) {
      const file = resolve(path, name.name);
      if (name.isDirectory()) walk(file);
      else if (/\.(ts|tsx)$/.test(name.name)) {
        const source = readFileSync(file, 'utf8');
        for (const match of source.matchAll(/from ['"](\.[^'"]+)['"]/g)) {
          const target = resolve(path, match[1]);
          assert.ok(['.ts', '.tsx', '.js', '.jsx', ''].some(ext => existsSync(target + ext)), `Missing ${match[1]} from ${file}`);
        }
      }
    }
  }
  walk(dir);
});
