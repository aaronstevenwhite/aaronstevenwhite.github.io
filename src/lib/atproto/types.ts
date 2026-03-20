export interface ChiveEprint {
  uri: string;
  title: string;
  abstract?: string;
  authors: { name: string; did?: string }[];
  createdAt: string;
  publicationStatus: string;
}

export interface LayersCorpus {
  uri: string;
  name: string;
  documentCount?: number;
  annotationCount?: number;
}
