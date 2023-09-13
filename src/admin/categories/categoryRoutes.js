import express from "express";

import * as categoryController from "./categoryControllers.js";
import { uploadImage } from "../../../common/middleware/uploadFile.js";
const categoryRoutes = express.Router();

categoryRoutes.get("/", categoryController.getCategoryPage);
categoryRoutes.get("/data", categoryController.getCategoryData);
categoryRoutes.get("/view/:id", categoryController.getCategoryDetail);

categoryRoutes.post("/", categoryController.createCategory);
categoryRoutes.put("/:id", categoryController.updateCategory);
categoryRoutes.delete("/:id", categoryController.deleteCategory);

//  category menus
categoryRoutes.get("/:id", categoryController.getCategoryMenusPage);
categoryRoutes.get(
  "/menus/data/:id",
  categoryController.getCategoryMenusData,
);

categoryRoutes.post(
  "/menus",
  uploadImage("uploads/categoryMenuImage", "image"),
  categoryController.createCategoryMenu,
);
categoryRoutes.get("/menus/view/:id", categoryController.getCategoryMenuDetail);
categoryRoutes.put(
  "/menus/:id",
  uploadImage("uploads/categoryMenuImage", "image"),
  categoryController.updateCategoryMenu,
);
categoryRoutes.patch(
  "/menus/is_subcategory/:id",
  categoryController.updateSubCategoryOfCategoryMenu,
);
categoryRoutes.delete("/menus/:id", categoryController.deleteCategoryMenu);

export default categoryRoutes;
