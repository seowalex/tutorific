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
