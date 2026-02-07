import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@importexport/api';

// Create vanilla tRPC client (no React Query)
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // For React Native, use your machine's IP instead of localhost
      // url: 'http://192.168.1.100:3000/trpc',
    }),
  ],
});

// Helper to make type-safe API calls
export async function fetchUser(id: string) {
  return trpcClient.user.getById.query({ id });
}

export async function createUser(name: string, email: string) {
  return trpcClient.user.create.mutate({ name, email });
}

export async function healthCheck() {
  return trpcClient.health.check.query();
}
