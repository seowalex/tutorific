/*
This file initializes your PostgreSQL database. You need to supply
the host name, username, password and database name for your database.
*/
import { createConnection } from 'typeorm';
import dotenv from "dotenv";
import config from "./config/index";

createConnection({
    type     : 'postgres',
    host     : 'localhost',
    port     :  5432,
    username :  config.user,
    password :  config.password,
    database :  config.dbName,
    ssl: true,
    logging: ['query', 'error'],
    synchronize: true,
}).then((connection) => {
    console.log('Database connection established');
    
});


// export const postgresDB = async () => {
//     return await createConnection({
//         type     : 'postgres',
//         host     : 'localhost',
//         port     :  5432,
//         username :  config.user,
//         password :  config.password,
//         database :  config.dbName,
//         ssl: true,
//         logging: ['query', 'error'],
//         synchronize: true,
//     }).then((connection) => {
//         console.log('Database connection established');
        
//     });
// };