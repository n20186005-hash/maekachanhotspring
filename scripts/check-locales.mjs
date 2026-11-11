import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const langs = ['th', 'zh', 'en'];
const root = path.resolve('dist');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const absolute = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(absolute) : [absolute];
});
const listRoutes = (lang) => walk(path.join(root, lang))
  .filter((file) => file.endsWith('index.html'))
  .map((file) => path.relative(path.join(root, lang), file))
  .sort();

function shape(node) {
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return shape(node.expression);
  if (ts.isObjectLiteralExpression(node)) {
    const obj = {};
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) obj[prop.name.getText().replace(/^['"]|['"]$/g, '')] = shape(prop.initializer);
    }
    return obj;
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(shape);
  return true;
}
function tsDeclarationShape(filename, name) {
  const text = fs.readFileSync(filename, 'utf8');
  const source = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true);
  let result;
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText() === name) result = shape(node.initializer);
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (!result) throw new Error(`Missing ${name} in ${filename}`);
  return result;
}
function assertSameShape(a, b, label) {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) throw new Error(`${label}: list lengths differ`);
    a.forEach((value, index) => assertSameShape(value, b[index], `${label}[${index}]`));
  } else if (a && b && typeof a === 'object' && typeof b === 'object') {
    const ka = Object.keys(a).sort().join('|');
    const kb = Object.keys(b).sort().join('|');
    if (ka !== kb) throw new Error(`${label}: keys differ`);
    Object.keys(a).forEach((key) => assertSameShape(a[key], b[key], `${label}.${key}`));
  }
}

const translations = Object.fromEntries(langs.map((lang) => [lang, JSON.parse(fs.readFileSync(`src/i18n/${lang}.json`, 'utf8'))]));
const guide = Object.fromEntries(langs.map((lang) => [lang, tsDeclarationShape(`src/data/guide/${lang}.ts`, lang)]));
const transport = tsDeclarationShape('src/data/transport.ts', 'transportData');
const legal = tsDeclarationShape('src/data/legal.ts', 'legalData');
const topics = tsDeclarationShape('src/data/topics.ts', 'topics');
const topicDetails = tsDeclarationShape('src/data/topicDetails.ts', 'topicDetails');
const routes = Object.fromEntries(langs.map((lang) => [lang, listRoutes(lang)]));

if (topics.length !== 30 || Object.keys(topicDetails).length !== 30) throw new Error('Expected 30 distinct topic entries and detail entries');
for (const [slug, localized] of Object.entries(topicDetails)) {
  if (Object.keys(localized).sort().join('|') !== 'en|th|zh') throw new Error(`Topic ${slug}: missing language`);
  for (const lang of langs) {
    if (!Array.isArray(localized[lang]) || localized[lang].length !== 2) throw new Error(`Topic ${slug}/${lang}: incomplete details`);
  }
}

for (const lang of langs.slice(1)) {
  assertSameShape(translations.th, translations[lang], `UI th/${lang}`);
  assertSameShape(guide.th, guide[lang], `Guide th/${lang}`);
  assertSameShape(transport.th, transport[lang], `Transport th/${lang}`);
  assertSameShape(legal.th, legal[lang], `Legal th/${lang}`);
  if (JSON.stringify(routes.th) !== JSON.stringify(routes[lang])) throw new Error(`Routes th/${lang} differ`);
}
for (const lang of langs) {
  for (const route of routes[lang]) {
    const html = fs.readFileSync(path.join(root, lang, route), 'utf8');
    if (!html.includes(`<html lang="${lang === 'zh' ? 'zh-CN' : lang}"`)) throw new Error(`${lang}/${route}: html lang mismatch`);
    if (!html.includes(`hreflang="${lang}"`)) throw new Error(`${lang}/${route}: hreflang missing`);
    if (!html.includes(`/${lang}/sources/`)) throw new Error(`${lang}/${route}: sources navigation missing`);
  }
}

console.log(`PASS: ${routes.th.length} matching routes per locale (${langs.length * routes.th.length} pages), matching UI/guide/transport/legal shapes and language links.`);
