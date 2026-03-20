import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

export function loadYaml<T>(filename: string): T {
  const filepath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filepath, 'utf-8');
  return yaml.load(raw) as T;
}

export function loadYamlSafe<T>(filename: string, fallback: T): T {
  try {
    return loadYaml<T>(filename);
  } catch {
    return fallback;
  }
}

export function loadBibFile(): string {
  const filepath = path.join(DATA_DIR, 'bibliography', 'aaronstevenwhite.bib');
  return fs.readFileSync(filepath, 'utf-8');
}
