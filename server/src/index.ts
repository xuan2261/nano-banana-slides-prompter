import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { promptRouter } from './routes/prompt';
import { extractRouter } from './routes/extract';
import { sessionsRouter } from './routes/sessions';
import { settingsRouter } from './routes/settings';

const app = new Hono();

app.use('*', logger());
app.use('/api/*', cors({
  origin: (origin) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return origin as string;
    // Allow localhost with any port (for Electron dynamic ports)
    if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\]|\[::\])(:\d+)?$/.test(origin)) {
      return origin;
    }
    // Allow file:// protocol for Electron production
    if (origin.startsWith('file://')) return origin;
    return null;
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

app.get('/health', (c) => c.json({ status: 'ok', timestamp: Date.now(), version: '1.0.0' }));

app.route('/api', promptRouter);
app.route('/api', extractRouter);
app.route('/api', sessionsRouter);
app.route('/api', settingsRouter);

app.notFound((c) => c.json({ error: 'Not Found' }, 404));

app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ success: false, error: err.message || 'Internal server error' }, 500);
});

const port = Number(process.env.PORT) || 3001;
console.log(`Starting server on port ${port}...`);

// Export server configuration
const server = {
  port,
  fetch: app.fetch,
  idleTimeout: 255,
};

// Output PORT for Electron IPC detection (must be after server starts)
// Bun.serve returns immediately, so we output right away
console.log(`PORT:${port}`);

export default server;
