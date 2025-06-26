import { fetchSystemByHost } from "@/lib/api/exoplanets";

const memoryCache = new Map<string, any>();

export async function getCachedSystem(hostname: string) {
  if (memoryCache.has(hostname)) {
    return memoryCache.get(hostname);
  }
  const data = await fetchSystemByHost(hostname);
  memoryCache.set(hostname, data);
  return data;
}
