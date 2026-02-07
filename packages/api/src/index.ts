// Export tRPC router for shared types between backend and frontends
export { appRouter, router, publicProcedure } from './router';
export type { AppRouter, inferRouterInputs, inferRouterOutputs } from './router';
