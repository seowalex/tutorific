import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes/index';
import cors from 'cors';
import dotenv from 'dotenv';
import json from 'koa-json';
import config from './config/index';
import logger from 'koa-logger';
import HttpStatus from 'http-status-codes';
import databaseConnection from './config/connection';

const result = dotenv.config();
if (result.error) {
  throw new Error('Error parsing dotenv');
}

databaseConnection.then(() => {
  app.listen(config.dbPort); // eslint-disable-next-line no-console
  console.info('db listening on port: ', config.dbPort);
});

const app = new Koa();

app.use(bodyParser());
app.use(json());

// TODO fix cors for deployment

// if (config.env === 'development') {
//   app.use(cors({ origin: '*' }));
// } else if (config.env === 'production') {
//   app.use(cors({ origin: '//TODO' }));
// } else {
//   app.use(cors({ origin: '//TODO' }));
// }

app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error: any) {
    ctx.status =
      error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

app.use(router.routes()).use(router.allowedMethods());

// Development logging
app.use(
  logger((str, args) => {
    // redirect koa logger to other output pipe
    // default is process.stdout(by console.log function)
    console.log(str);
  })
);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.info('listening on port: ', config.port);
});
