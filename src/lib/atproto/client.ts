import { AtpAgent } from '@atproto/api';

// Shared ATProto agent for read-only XRPC calls
// No authentication needed for public read endpoints

const agents = new Map<string, AtpAgent>();

export function getAgent(service: string): AtpAgent {
  if (!agents.has(service)) {
    agents.set(service, new AtpAgent({ service }));
  }
  return agents.get(service)!;
}

export const blueskyAgent = () => getAgent('https://public.api.bsky.app');
export const chiveAgent = () => getAgent('https://api.chive.pub');
