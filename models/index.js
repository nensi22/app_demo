import dbConnection from "../common/config/database.js";

// import Admin from "./admin.js";
// import App from "./apps.js";
// import Category from "./categories.js";
// import Category_Menu from "./category_menus.js";

const db = {};
db.sequelize = dbConnection;

export default db;
