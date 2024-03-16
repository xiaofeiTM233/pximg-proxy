import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { getRuntimeKey } from 'hono/adapter';
import { index } from './middleware';
import { illust } from './middleware/illust';
import { pixivReverseProxy } from './utils/pixiv';
import { env } from './utils/env';
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge'
}

const app = new Hono({ strict: false });

app.use('*', logger());
app.get('/', index);
app.get('/favicon.ico', c => c.notFound());
app.get('/:pid{\\d+}/:p{\\d+}?', illust);
app.get('/:size/:pid{\\d+}/:p{\\d+}?', illust);
app.get('/*', c => pixivReverseProxy(c));

export default handle(app)
