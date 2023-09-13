import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 2000;
const DB_CONNECTION = process.env.DB_CONNECTION;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

const appImagePath = "uploads/appImage";
const categoryImagePath = "uploads/categoryMenuImage";
const subCategoryImagePath = "uploads/subcategoryMenuImage";

const baseUrl = (path = null) => {
  let url = `http://${process.env.HOST}:${process.env.PORT}`;
  if (process.env.isSSLEnable === "true") {
    url = `https://${process.env.HOST}:${process.env.PORT}`;
  }
  return url + (path ? `/${path}` : "");
};

export {
  appImagePath,
  baseUrl,
  categoryImagePath,
  DB_CONNECTION,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  PORT,
  SESSION_SECRET,
  subCategoryImagePath,
};
