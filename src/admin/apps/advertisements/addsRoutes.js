import express from "express";

import * as addsController from "./addsControllers.js";
const addsRoutes = express.Router();

addsRoutes.get("/data/:id", addsController.getAddsData);

addsRoutes.post("/", addsController.createAdds);
addsRoutes.get("/view/:id", addsController.getAddsDetail);
addsRoutes.put("/:id", addsController.updateAdds);
addsRoutes.patch("/is_show/:id", addsController.updateIs_show);
addsRoutes.delete("/:id", addsController.deleteAdds);

export default addsRoutes;
