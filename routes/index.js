import express from "express";

import adminRoutes from "./admin/admin.js";

const mainRouter = express.Router();

mainRouter.use("/admin", adminRoutes);

export default mainRouter;
