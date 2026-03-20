import * as bibtexParse from 'bibtex-parse';
import { loadBibFile } from './data';

export interface BibEntry {
  key: string;
  type: string;
  title: string;
  author: string;
  authors: string[];
  year: string;
  journal?: string;
  booktitle?: string;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
  url?: string;
  abstract?: string;
  publisher?: string;
  address?: string;
  month?: string;
}

// Normalize known name variants to a canonical form
const NAME_ALIASES: Record<string, string> = {
  'Aaron S. White': 'Aaron Steven White',
  'Aaron White': 'Aaron Steven White',
  'A.S. White': 'Aaron Steven White',
  'A. S. White': 'Aaron Steven White',
  'B. Van Durme': 'Benjamin Van Durme',
  'Will Gantt': 'William Gantt',
  'Will Walden': 'William Walden',
  'Venkata Subrahmanyan Govindarajan': 'Venkata Govindarajan',
  'V.S. Govindarajan': 'Venkata Govindarajan',
  'Daniel Gordon Altshuler': 'Daniel Altshuler',
  'Drew Reisinger': 'Dee Ann Reisinger',
  'Alice Smith': 'Alice Smith',
  'John Chen': 'Yunmo Chen',
};

function parseAuthorName(raw: string): string {
  const trimmed = raw.replace(/\s+/g, ' ').trim();
  if (!trimmed) return '';

  let name: string;
  if (trimmed.includes(',')) {
    const commaIdx = trimmed.indexOf(',');
    const last = trimmed.slice(0, commaIdx).trim();
    const first = trimmed.slice(commaIdx + 1).trim();
    name = first ? `${first} ${last}` : last;
  } else {
    name = trimmed;
  }

  return NAME_ALIASES[name] || name;
}

function parseAuthors(authorField: string): string[] {
  // Normalize whitespace (handles multi-line BibTeX entries)
  const normalized = authorField.replace(/\s+/g, ' ').trim();
  return normalized
    .split(/\s+and\s+/i)
    .map(parseAuthorName)
    .filter(a => a.length > 0);
}

function formatPages(pages: string | undefined): string {
  if (!pages) return '';
  // Convert LaTeX -- to en-dash
  return pages.replace(/--/g, '–');
}

function formatCitation(entry: BibEntry): string {
  const authors = entry.authors;
  let authorStr: string;
  if (authors.length <= 3) {
    authorStr = authors.length === 1
      ? authors[0]
      : authors.slice(0, -1).join(', ') + ' & ' + authors[authors.length - 1];
  } else {
    // Show first author + et al for 4+
    authorStr = `${authors[0]} et al.`;
  }

  let venue = '';
  if (entry.journal) venue = `<em>${entry.journal}</em>`;
  else if (entry.booktitle) venue = `<em>${entry.booktitle}</em>`;

  const vol = entry.volume ? ` ${entry.volume}` : '';
  const num = entry.number ? `(${entry.number})` : '';
  const pages = formatPages(entry.pages);
  const pagesStr = pages ? `, ${pages}` : '';

  return `${authorStr}. ${entry.year}. ${entry.title}. ${venue}${vol}${num}${pagesStr}.`.replace(/\.\.$/, '.');
}

let _cache: Map<string, BibEntry> | null = null;

export function loadBibliography(): Map<string, BibEntry> {
  if (_cache) return _cache;

  const raw = loadBibFile();
  const entries = bibtexParse.entries(raw);

  const map = new Map<string, BibEntry>();

  for (const e of entries) {
    const entry: BibEntry = {
      key: e.key,
      type: e.type,
      title: (e.TITLE || '').replace(/[{}]/g, ''),
      author: e.AUTHOR || '',
      authors: parseAuthors(e.AUTHOR || ''),
      year: e.YEAR || '',
      journal: e.JOURNAL?.replace(/[{}]/g, ''),
      booktitle: e.BOOKTITLE?.replace(/[{}]/g, ''),
      volume: e.VOLUME,
      number: e.NUMBER,
      pages: e.PAGES,
      doi: e.DOI,
      url: e.URL,
      abstract: e.ABSTRACT,
      publisher: e.PUBLISHER,
      address: e.ADDRESS,
      month: e.MONTH,
    };
    map.set(entry.key, entry);
  }

  _cache = map;
  return map;
}

export function getCitation(key: string): string {
  const bib = loadBibliography();
  const entry = bib.get(key);
  if (!entry) return key;
  return formatCitation(entry);
}

export function getAbstract(key: string): string | undefined {
  const bib = loadBibliography();
  return bib.get(key)?.abstract;
}

export function getAuthors(key: string): string[] {
  const bib = loadBibliography();
  return bib.get(key)?.authors || [];
}

export function getRawBibtex(key: string): string {
  const raw = loadBibFile();
  const regex = new RegExp(`@\\w+\\{${key},[\\s\\S]*?\\n\\}`, 'm');
  const match = raw.match(regex);
  return match ? match[0] : '';
}

export function formatAPA(entry: BibEntry): string {
  const authors = entry.authors.map(a => {
    const parts = a.split(' ');
    const last = parts[parts.length - 1];
    const initials = parts.slice(0, -1).map(p => p[0] ? p[0] + '.' : '').join(' ');
    return `${last}, ${initials}`;
  });

  let authorStr: string;
  if (authors.length === 1) authorStr = authors[0];
  else if (authors.length === 2) authorStr = `${authors[0]}, & ${authors[1]}`;
  else authorStr = `${authors.slice(0, -1).join(', ')}, & ${authors[authors.length - 1]}`;

  const venue = entry.journal || entry.booktitle || '';
  const pages = formatPages(entry.pages);

  return `${authorStr} (${entry.year}). ${entry.title}. *${venue}*${entry.volume ? `, ${entry.volume}` : ''}${entry.number ? `(${entry.number})` : ''}${pages ? `, ${pages}` : ''}.`;
}
