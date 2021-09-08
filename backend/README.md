# Tutorific

## Setup
1. Install all dependencies and setup the pre-commit hooks:

```bash
npm install
```

Fill in .env file


2. Install Postgres
- https://formulae.brew.sh/formula/postgresql
- https://blog.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/


3. Start the development server:

```bash
npm run start
```

4. Run npm scripts where necessary
- npm run lint-fix (run eslint)
- npm run format-fix (run prettier)
- npm run build (check linting and formatting and recompile into js)


## How to use Koa
```
ctx.request // is a Koa Request
ctx.response // is a Koa Response

ctx.throw // throw some error other than 200
ctx.params // request params eg /:id
ctx.query // request parsed query-string, does not support nested objects
ctx.status // response status
ctx.message // response message
ctx.body // response body
ctx.state

```