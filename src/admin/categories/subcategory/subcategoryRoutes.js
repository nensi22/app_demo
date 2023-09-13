import express from "express";

import * as subCategoryController from "./subcategoryControllers.js";
const subCategoryRoutes = express.Router();

subCategoryRoutes.get("/:id", subCategoryController.getSubCategoryPage);
subCategoryRoutes.get(
  "/sub-category/data/:id",
  subCategoryController.getSubCategoryData,
);

subCategoryRoutes.post(
  "/sub-category",
  subCategoryController.createSubCategory,
);
subCategoryRoutes.get(
  "/sub-category/view/:id",
  subCategoryController.getSubCategoryDetail,
);
subCategoryRoutes.put(
  "/sub-category/:id",
  subCategoryController.updateSubCategory,
);
subCategoryRoutes.delete(
  "/sub-category/:id",
  subCategoryController.deleteSubCategory,
);

export default subCategoryRoutes;
