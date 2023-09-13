import fs from "fs/promises";

import {
  appImagePath,
  baseUrl,
} from "../../../common/constants/config-constant.js";
import App from "../../../models/apps.js";
import AppResourceForAdmin from "./resources/app.resources.js";

export const getAppsPage = async (req, res) => {
  console.log("at getAppsPage");
  try {
    const appsData = await App.findAll({});
    return res.render("admin/apps/index", { page: "apps", appsData });
  } catch (error) {
    console.log("error_getAppsPage : ", error);
  }
};

export const getAppsData = async (req, res) => {
  console.log("at getAppsData");
  try {
    const appsData = await App.findAll({});
    res.send({
      draw: req.draw,
      iTotalRecords: appsData.length,
      iTotalDisplayRecords: appsData.length,
      aaData: new AppResourceForAdmin(appsData),
    });
    return appsData;
  } catch (error) {
    console.log("error_getAppsData : ", error);
  }
};

export const createApp = async (req, res) => {
  console.log("at createApp ");
  try {
    const appData = await App.create({
      name: req.body.name,
      image: req.file ? `${appImagePath}/${req.file.filename}` : null,
      is_sidebar: req.body?.is_sidebar === "true" ? true : false,
      is_bottombar: req.body?.is_bottombar === "true" ? true : false,
      splash_slider_color: req.body.splash_slider_color,
      splash_slider_font_color: req.body.splash_slider_font_color,
      splash_slider_inactive_color: req.body.splash_slider_inactive_color,
      is_adds_true: req.body?.is_adds_true === "true" ? true : false,
      is_active: req.body?.is_active === "true" ? true : false,
    });

    res.send({ success: appData });
  } catch (error) {
    console.log("error_createApp : ", error);
  }
};

export const getAppsDetail = async (req, res) => {
  console.log("at getAppsDetail");
  try {
    const id = req.params.id;

    const appData = await App.findByPk(id);
    appData.image = baseUrl(appData.image);

    res.send({ data: appData });
    return appData;
  } catch (error) {
    console.log("error_getAppsDetail : ", error);
  }
};

export const updateApp = async (req, res) => {
  console.log("at updateApp");
  try {
    const {
      id,
      name,
      is_sidebar,
      is_bottombar,
      splash_slider_color,
      splash_slider_font_color,
      splash_slider_inactive_color,
      is_adds_true,
      is_active,
    } = req.body;

    let image = req.file;

    const appData = await App.findByPk(id);

    if (appData) {
      if (image || "") {
        try {
          await fs.unlink(appData.image);
          console.log("deleted previous app image");
        } catch (err) {
          console.log(
            "error deleting previous app image:",
            err,
          );
        }

        appData.image = `${appImagePath}/${req.file.filename}`;
      }
      appData.name = name;
      appData.is_sidebar = is_sidebar === "true" ? true : false;
      appData.is_bottombar = is_bottombar === "true" ? true : false;
      appData.splash_slider_color = splash_slider_color;
      appData.splash_slider_font_color = splash_slider_font_color;
      appData.splash_slider_inactive_color = splash_slider_inactive_color;
      appData.is_adds_true = is_adds_true === "true" ? true : false;
      appData.is_active = is_active === "true" ? true : false;

      await appData.save();
      res.send({ success: appData });
    }
  } catch (error) {
    console.log("error_updateApp : ", error);
  }
};

export const updateAdds = async (req, res) => {
  console.log("at updateAdds");
  try {
    const id = req.params.id;

    const appData = await App.findByPk(id);

    if (appData) {
      appData.is_adds_true = !appData.is_adds_true;
    }

    await appData.save();
    res.send({ success: appData });
  } catch (error) {
    console.log("error_updateAdds : ", error);
  }
};

export const updateAppStatus = async (req, res) => {
  console.log("at updateAppStatus");
  try {
    const id = req.params.id;

    const appData = await App.findByPk(id);

    if (appData) {
      appData.is_active = !appData.is_active;
    }

    await appData.save();
    res.send({ success: appData });
  } catch (error) {
    console.log("error_updateAppStatus : ", error);
  }
};

export const deleteApp = async (req, res) => {
  console.log("at deleteApp");
  try {
    const id = req.params.id;

    const appData = await App.findByPk(id);

    if (appData) {
      if (appData.image) {
        try {
          await fs.unlink(appData.image);
          console.log("deleted app image");
        } catch (err) {
          console.log(
            "error deleting app image:",
            err,
          );
        }
      }

      await App.destroy({ where: { id: id } });
      res.send({ success: true });
    }
  } catch (error) {
    console.log("error_deleteApp : ", error);
  }
};
