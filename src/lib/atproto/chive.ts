import { getAgent } from './client';

export async function getEprintByUri(uri: string) {
  try {
    const agent = getAgent('https://api.chive.pub');
    const response = await agent.api.com.atproto.repo.getRecord({
      repo: uri.split('/')[2],
      collection: 'pub.chive.eprint.submission',
      rkey: uri.split('/').pop()!,
    });
    return response.data;
  } catch {
    return null;
  }
}
