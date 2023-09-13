import { Sequelize } from "sequelize";
import {
  DB_CONNECTION,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../constants/config-constant.js";

const sequelize = new Sequelize({
  dialect: DB_CONNECTION,
  username: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  logging: false,
});

export default sequelize;
