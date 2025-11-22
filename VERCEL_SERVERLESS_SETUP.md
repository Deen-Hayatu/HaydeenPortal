# Vercel Serverless Functions Setup

## Architecture

This project is configured for **Vercel's serverless architecture**:

### Frontend (Static)
- **Build**: Vite builds React app to `dist/public/`
- **Served as**: Static files by Vercel
- **Routes**: Handled via rewrites in `vercel.json`

### Backend (Serverless Functions)
- **API Routes**: Located in `api/index.ts`
- **Type**: Vercel serverless function (exports default handler)
- **Wraps**: Express app from `server/routes.ts`
- **Auto-detected**: Vercel automatically detects `api/*.ts` files as serverless functions

## Build Process

### For Vercel Deployment
```bash
npm run build  # Only builds client (Vite)
```

This:
1. Builds React app with Vite → `dist/public/`
2. Vercel automatically handles `api/index.ts` as serverless function
3. No server bundle needed (serverless functions are invoked per-request)

### For Local Development
```bash
npm run build:all  # Builds both client and server
npm start  # Runs Express server locally
```

## How It Works

1. **Static Files**: Vercel serves files from `dist/public/` automatically
2. **API Routes**: Requests to `/api/*` are routed to `api/index.ts` serverless function
3. **SPA Routing**: Page routes (like `/about`, `/solutions/*`) are rewritten to `/index.html`

## Key Configuration

### `vercel.json`
- `outputDirectory`: `dist/public` (static files)
- `buildCommand`: `npm run build` (only builds client)
- `rewrites`: Routes `/api/*` to serverless function, page routes to `/index.html`
- `functions`: Configures serverless function timeout (30s)

### `api/index.ts`
- Exports default async handler for Vercel
- Wraps Express app to work in serverless environment
- Handles all API routes from `server/routes.ts`

## Benefits

✅ **Cost-effective**: Only pay for API requests (serverless)
✅ **Scalable**: Auto-scales with traffic
✅ **Fast**: Static files served from CDN
✅ **Simple**: No server management needed

## Troubleshooting

### Static files not loading
- Check `outputDirectory` in `vercel.json` matches build output
- Verify build creates `dist/public/assets/` folder
- Check browser Network tab for 404s

### API routes not working
- Verify `api/index.ts` exports default handler
- Check Vercel function logs in dashboard
- Ensure environment variables are set in Vercel

### Build fails
- Run `npm run build` locally to test
- Check Vercel build logs for errors
- Verify all dependencies are in `package.json`

