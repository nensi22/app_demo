import express from "express";

import * as appsController from "./appsControllers.js";
import * as addsController from "./advertisements/addsControllers.js";
import { uploadImage } from "../../../common/middleware/uploadFile.js";
import addsRoutes from "./advertisements/addsRoutes.js";
const appRoutes = express.Router();

appRoutes.get("/", appsController.getAppsPage);
appRoutes.get("/data", appsController.getAppsData);
appRoutes.get("/view/:id", appsController.getAppsDetail);
appRoutes.post(
  "/",
  uploadImage("uploads/appImage", "image"),
  appsController.createApp,
);
appRoutes.put(
  "/:id",
  uploadImage("uploads/appImage", "image"),
  appsController.updateApp,
);
appRoutes.patch("/adds/:id", appsController.updateAdds);
appRoutes.patch("/active-status/:id", appsController.updateAppStatus);
appRoutes.delete("/:id", appsController.deleteApp);

// Adds
appRoutes.use("/advertise", addsRoutes);
appRoutes.get("/:id", addsController.getAddsPage);
// appRoutes.get("/data/:id", addsController.getAddsData);

// appRoutes.post("/advertise/", addsController.createAdds);
// appRoutes.get("/advertise/view/:id", addsController.getAddsDetail);
// appRoutes.put("/advertise/:id", addsController.updateAdds);
// appRoutes.patch("/advertise/is_show/:id", addsController.updateIs_show);

// appRoutes.delete("/advertise/:id", addsController.deleteAdds);

export default appRoutes;
