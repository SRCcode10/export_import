import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  user: router({
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => {
        return {
          id: input.id,
          name: 'John Doe',
          email: 'john@example.com',
        };
      }),
    create: publicProcedure
      .input(z.object({ name: z.string(), email: z.string().email() }))
      .mutation(({ input }) => {
        return {
          id: '123',
          ...input,
        };
      }),
  }),
  health: router({
    check: publicProcedure.query(() => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    }),
  }),
});

export type AppRouter = typeof appRouter;

export type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
