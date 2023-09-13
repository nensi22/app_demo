import express from "express";

import * as adsTypesController from "./ads_typescontrollers.js";

const adsTypesRoutes = express.Router();

adsTypesRoutes.get("/", adsTypesController.getAdsTypesPage);
adsTypesRoutes.get("/data", adsTypesController.getAdsTypesData);

adsTypesRoutes.post("/", adsTypesController.createAdsTypes);
adsTypesRoutes.get("/view/:id", adsTypesController.getAdsTypesDetail);
adsTypesRoutes.put("/:id", adsTypesController.updateAdsTypes);
adsTypesRoutes.delete("/:id", adsTypesController.deleteAdsTypes);

export default adsTypesRoutes;
