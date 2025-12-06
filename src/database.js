// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// export const sequelize = new Sequelize(
//   process.env.PG_DATABASE,   // DB name
//   process.env.PG_USER,       // DB user
//   process.env.PG_PASSWORD,   // DB password
//   {
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     dialect: "postgres",
//     logging: false,
//   }
// );

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

export default sequelize;

// const {Pool} =require("pg");
// const dotenv=require("dotenv");
// dotenv.config();

// const pool= new Pool[{
//     user: process.env.PGUSER,
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     password: process.env.PGPASSWORD,

//     ssl:{
//         rejectUnauthorized: false,
//     },
// }];
// module.exports=pool;