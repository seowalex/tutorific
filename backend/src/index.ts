import Koa from 'koa';
import serve from 'koa-static';
import send from 'koa-send';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import json from 'koa-json';
import logger from 'koa-logger';
import HttpStatus from 'http-status-codes';
import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import webpush from 'web-push';
import Exception from './utils/exception';
import dbConnection from './database/connection';
import config from './config/index';
import router from './routes/index';
import authUtil from './utils/auth';

const app = new Koa();

webpush.setVapidDetails(
  'mailto:cs3216-staff@googlegroups.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default webpush;

app.use(serve(`../frontend/build`));

dbConnection.then(() => {
  // eslint-disable-next-line no-console
  console.info('db listening on port: ', config.dbPort);
});

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(bodyParser());
app.use(json());

app.use(cors());

app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error: any) {
    if (error instanceof Exception) {
      // model validator errors
      ctx.status = HttpStatus.BAD_REQUEST;
      ctx.body = error;
    } else {
      // ctx.throw errors
      ctx.status =
        error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      if (error.message) {
        ctx.body = { errors: [{ detail: [error.message] }] };
      }
    }
  }
});

app.use(
  jwt({ secret: process.env.JWT_SECRET ?? 'secret' }).unless({
    custom: (ctx: Koa.Context): boolean =>
      authUtil.isOpenRoute(ctx.method, ctx.url),
  })
);

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  await send(ctx, '/index.html', { root: '../frontend/build' });
});

// Development logging
app.use(
  logger((str) => {
    // redirect koa logger to other output pipe
    // default is process.stdout(by console.log function)
    // eslint-disable-next-line no-console
    console.info(str);
  })
);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.info('listening on port: ', config.port);
});
