import Advertisements from "../../../../models/advertisements.js";
import AddsResourceForAdmin from "./resources/adds.resources.js";

export const getAddsPage = async (req, res) => {
  console.log("at getAddsPage");
  try {
    const app_id = req.params.id;
    const addsData = await Advertisements.findAll({
      where: { app_id: app_id },
    });
    return res.render("admin/apps/advertisements/index", {
      page: "apps",
      addsData,
      app_id: app_id,
    });
  } catch (error) {
    console.log("error_getAddsPage : ", error);
  }
};

export const getAddsData = async (req, res) => {
  console.log("at getAddsData");
  try {
    const app_id = req.params.id;
    const addsData = await Advertisements.findAll({
      where: { app_id: app_id },
    });
    res.send({
      draw: req.draw,
      iTotalRecords: addsData.length,
      iTotalDisplayRecords: addsData.length,
      aaData: new AddsResourceForAdmin(addsData),
    });
    return addsData;
  } catch (error) {
    console.log("error_getAddsData : ", error);
  }
};

export const createAdds = async (req, res) => {
  console.log("at createAdds ");
  try {
    const addsdata = await Advertisements.create({
      app_id: req.body.app_id,
      add_type: req.body.add_type,
      add_platform: req.body.add_platform,
      add_key: req.body.add_key,
      keyword: req.body.keyword,
      is_show: req.body?.is_show === "true" ? true : false,
    });

    return res.send({ success: addsdata });
  } catch (error) {
    console.log("error_createAdds : ", error);
  }
};

export const getAddsDetail = async (req, res) => {
  console.log("at getAddsDetail");
  try {
    const id = req.params.id;

    const addsData = await Advertisements.findByPk(id);

    res.send({ data: addsData });
    return addsData;
  } catch (error) {
    console.log("error_getAddsDetail : ", error);
  }
};

export const updateAdds = async (req, res) => {
  console.log("at updateAdds");
  try {
    const id = req.params.id;
    const {
      add_type,
      add_platform,
      add_key,
      keyword,
      is_show,
    } = req.body;

    const addsData = await Advertisements.findByPk(id);

    if (addsData) {
      addsData.add_type = add_type;
      addsData.add_platform = add_platform;
      addsData.add_key = add_key;
      addsData.keyword = keyword;
      addsData.is_show = is_show === "true" ? true : false;

      await addsData.save();
      res.send({ success: addsData });
    }
  } catch (error) {
    console.log("error_updateAdds : ", error);
  }
};

export const updateIs_show = async (req, res) => {
  console.log("at updateIs_show");
  try {
    const id = req.params.id;

    const addsData = await Advertisements.findByPk(id);

    if (addsData) {
      addsData.is_show = !addsData.is_show;
    }

    await addsData.save();
    res.send({ success: addsData });
  } catch (error) {
    console.log("error_updateIs_show : ", error);
  }
};

export const deleteAdds = async (req, res) => {
  console.log("at deleteAdds");
  try {
    const id = req.params.id;

    const addsData = await Advertisements.findByPk(id);

    if (addsData) {
      await addsData.destroy({
        where: { id: id },
      });
      res.send({ success: true });
    }
  } catch (error) {
    console.log("error_deleteAdds : ", error);
  }
};
