const config = {
  port: Number(process.env.PORT) || 5000,
  env: process.env.ENV ?? "development"
};

export default config;