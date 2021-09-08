import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import config from './index';

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: config.dbPort,
  username: config.user,
  password: config.password,
  database: config.dbName,
  entities: [`src/models/*.ts`],
  synchronize: true,
};

const connection: Promise<Connection> = createConnection(connectionOpts);

export default connection;
