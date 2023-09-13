import express from "express";

import * as subCategoryController from "./subcategoryMenuControllers.js";
import { uploadImage } from "../../../../../common/middleware/uploadFile.js";
const subCategoryMenusRoutes = express.Router();

subCategoryMenusRoutes.get(
  "/:id",
  subCategoryController.getSubCategoryMenuPage,
);
subCategoryMenusRoutes.get(
  "/menus/data/:id",
  subCategoryController.getSubCategoryMenusData,
);

subCategoryMenusRoutes.post(
  "/menus",
  uploadImage("uploads/subcategoryMenuImage", "image"),
  subCategoryController.createSubCategoryMenu,
);
subCategoryMenusRoutes.get(
  "/menus/view/:id",
  subCategoryController.getSubCategoryMenuDetail,
);
subCategoryMenusRoutes.put(
  "/menus/:id",
  uploadImage("uploads/subcategoryMenuImage", "image"),
  subCategoryController.updateSubCategoryMenu,
);
subCategoryMenusRoutes.delete(
  "/menus/:id",
  subCategoryController.deleteSubCategoryMenu,
);

export default subCategoryMenusRoutes;
