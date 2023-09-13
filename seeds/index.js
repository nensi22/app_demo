import adminData from "./admin.js";

import Admin from "../models/admin.js";

export const seeder = async () => {
  const admin = await Admin.findAll({});
  if (admin.length === 0) {
    Admin.create(adminData).then(() => console.log("Admin created"));
  }
};
