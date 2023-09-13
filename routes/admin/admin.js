import express from "express";

import * as authController from "../../src/admin/auth/authControllers.js";
import verifyAdmin from "../../common/middleware/authanticateAdmin.js";
import appRoutes from "../../src/admin/apps/appsRoutes.js";
import categoryRoutes from "../../src/admin/categories/categoryRoutes.js";
import subCategoryRoutes from "../../src/admin/categories/subcategory/subcategoryRoutes.js";
import subCategoryMenusRoutes from "../../src/admin/categories/subcategory/menus/subcategoryRoutes.js";
import contentRoutes from "../../src/admin/content/contentRoutes.js";
import adsTypesRoutes from "../../src/admin/ads_types/ads_typesRoutes.js";
import serveCountryRoutes from "../../src/admin/serve_countries/serve_countryRoutes.js";

const adminRoutes = express.Router();

adminRoutes.get("/", authController.getLoginPage);
adminRoutes.get("/login", authController.getLoginPage);
adminRoutes.post("/login", authController.login);
adminRoutes.get("/logout", authController.logout);
adminRoutes.get("/dashboard", verifyAdmin, authController.getDashboard);

// apps
adminRoutes.use("/apps", verifyAdmin, appRoutes);

// category
adminRoutes.use("/categories", verifyAdmin, categoryRoutes);

// sub category
adminRoutes.use("/category-menus", verifyAdmin, subCategoryRoutes);

// sub category menu
adminRoutes.use("/sub-category", verifyAdmin, subCategoryMenusRoutes);

// content
adminRoutes.use("/content", verifyAdmin, contentRoutes);

// country
adminRoutes.use("/serve-countries", verifyAdmin, serveCountryRoutes);

// ads_types
adminRoutes.use("/ads_types", verifyAdmin, adsTypesRoutes);

export default adminRoutes;
