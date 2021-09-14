import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import json from 'koa-json';
import logger from 'koa-logger';
import HttpStatus from 'http-status-codes';
import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import Exception from './utils/exception';
import dbConnection from './database/connection';
import config from './config/index';
import router from './routes/index';
import authUtil from './utils/auth';

const app = new Koa();

dbConnection.then(() => {
  // eslint-disable-next-line no-console
  console.info('db listening on port: ', config.dbPort);
});

app.use(helmet());

app.use(bodyParser());
app.use(json());

app.use(cors());

app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error: any) {
    if (error instanceof Exception) {
      ctx.statusCode = error.statusCode;
      ctx.body = error.toObject();
    } else {
      ctx.status =
        error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      error.status = ctx.status;
      ctx.body = { error };
      ctx.app.emit('error', error, ctx);
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
