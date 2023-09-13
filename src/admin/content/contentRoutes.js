import express from "express";

import * as contentController from "./contentControllers.js";
const contentRoutes = express.Router();

contentRoutes.get("/", contentController.getContentPage);

contentRoutes.post("/", contentController.createContent);
contentRoutes.put("/:id", contentController.updateContent);

export default contentRoutes;
