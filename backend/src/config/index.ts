const config = {
  port: Number(process.env.PORT) || 5000,
  env: process.env.ENV ?? "development",
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASS ?? "postgres",
  dbName: process.env.DB_NAME ?? "tutorific"
};

export default config;
