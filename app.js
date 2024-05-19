import express from "express";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import bodyParser from "body-parser";

import { PORT, SESSION_SECRET } from "./common/constants/config-constant.js";
import allModels from "./models/index.js";
import { seeder } from "./seeds/index.js";
import mainRouter from "./routes/index.js";
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// app.use(express.static(path.join("public")));

app.use("/uploads", express.static("uploads"));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(mainRouter);

allModels.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server runnig on port ${PORT}`);
      seeder();
    });
  }).catch((error) => {
    console.log("Error database connecting", error);
  });
