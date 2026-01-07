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
  origin: ['http://localhost:8080', 'http://[::]:8080', 'http://127.0.0.1:8080', 'http://localhost:5173'],
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

export default {
  port,
  fetch: app.fetch,
  idleTimeout: 255,
};
