# Import Export Management System

A full-stack monorepo application with NestJS backend, React Native mobile app, and shared packages using tRPC for type-safe API communication.

## Tech Stack

- **Backend**: NestJS + tRPC
- **Mobile**: React Native + Expo
- **Monorepo**: pnpm workspaces + Turborepo
- **API**: tRPC (type-safe RPC)
- **Shared Packages**: Types and API definitions

## Project Structure

```
├── apps/
│   ├── backend/          # NestJS API server
│   │   └── src/
│   │       └── trpc/     # tRPC integration
│   └── mobile/           # React Native Expo app
│       └── utils/
│           └── trpc.tsx  # tRPC client setup
├── packages/
│   ├── api/              # Shared tRPC router & types
│   └── types/            # Shared TypeScript types
├── package.json          # Root workspace configuration
├── pnpm-workspace.yaml   # pnpm workspace definition
└── turbo.json            # Turborepo build pipeline
```

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Expo CLI (for mobile development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd import_export
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build shared packages**
   ```bash
   pnpm build
   ```

## Development

### Start the Backend

```bash
pnpm --filter ie_backend start:dev
```

The backend will start on `http://localhost:3000` with tRPC endpoint at `/trpc`.

### Start the Mobile App

```bash
pnpm --filter mobile start
```

For mobile development, update the API URL in `apps/mobile/utils/trpc.tsx`:
```typescript
url: 'http://YOUR_MACHINE_IP:3000/trpc',  // Use your actual IP, not localhost
```

## Available Scripts

### Root Level (runs across all packages)

```bash
pnpm install          # Install all dependencies
pnpm build            # Build all packages
pnpm dev              # Start all apps in dev mode
pnpm lint             # Lint all packages
pnpm type-check       # Type check all packages
```

### Backend Specific

```bash
pnpm --filter ie_backend start:dev    # Start with hot reload
pnpm --filter ie_backend build        # Build for production
pnpm --filter ie_backend test         # Run tests
```

### Mobile Specific

```bash
pnpm --filter mobile start      # Start Expo development server
pnpm --filter mobile android    # Start Android emulator
pnpm --filter mobile ios        # Start iOS simulator (Mac only)
```

## tRPC Usage

### Backend (Define procedures)

Edit `packages/api/src/router.ts` to add new API endpoints:

```typescript
export const appRouter = router({
  user: router({
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => {
        return { id: input.id, name: 'John' };
      }),
  }),
});
```

### Mobile (Use hooks)

```typescript
import { trpc } from '../utils/trpc';

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading } = trpc.user.getById.useQuery({ id: userId });
  
  if (isLoading) return <Text>Loading...</Text>;
  return <Text>{data?.name}</Text>;
}
```

## Testing tRPC Endpoint

With the backend running, test the health endpoint:

```bash
curl http://localhost:3000/trpc/health.check
```

Expected response:
```json
{"result":{"data":{"status":"ok","timestamp":"2024-..."}}}
```

## Adding a New Package

1. Create package in `packages/` directory
2. Add `package.json` with name `@importexport/your-package`
3. Add to `pnpm-workspace.yaml` (if not using `packages/*` pattern)
4. Export from `packages/your-package/src/index.ts`
5. Run `pnpm install` to link it

## Important Notes

### Workspace Dependencies
- Always use `workspace:*` protocol for internal packages
- Example: `"@importexport/api": "workspace:*"`

### Version Alignment
All tRPC packages must use the same version:
- `@trpc/server`: `11.0.0-rc.824`
- `@trpc/client`: `11.0.0-rc.824`
- `@trpc/react-query`: `11.0.0-rc.824`

### Mobile IP Address
When testing on a physical device or emulator, use your machine's IP address instead of `localhost`:
```typescript
url: 'http://192.168.1.100:3000/trpc'
```

### Build Order
Turborepo handles the build order automatically. Shared packages (`api`, `types`) are built before apps (`backend`, `mobile`).

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm build` to ensure everything compiles
4. Test both backend and mobile
5. Submit a PR

## License

UNLICENSED
