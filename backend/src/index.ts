import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import cors from "cors";
import dotenv from "dotenv";
import json from "koa-json";
import config from "./config/index";


const result = dotenv.config();
if (result.error) {
  throw new Error("Error parsing dotenv");
}

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
      await next()
    } catch(err) {
      // console.log(err.status)
      // ctx.status = err.status || 500;
      // ctx.body = err.message;
    }
  });

app.use(json());

if (config.env === "development") {
  app.use(cors({ origin: "*" }));
} else if (config.env === "production") {
  app.use(
    cors({ origin: "//TODO" })
  );
} else {
  app.use(cors({ origin: "//TODO" }));
}

app
  .use(router.routes())
  .use(router.allowedMethods());


// setup npm start to work
// settle environment
// hook up postgres
// folder structure

  

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.info("listening on port: ", config.port);
});