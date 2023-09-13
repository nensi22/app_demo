import express from "express";

import * as serveCountryController from "./serve_countryControllers.js";

const serveCountryRoutes = express.Router();

serveCountryRoutes.get("/", serveCountryController.getServeCountryPage);

export default serveCountryRoutes;
