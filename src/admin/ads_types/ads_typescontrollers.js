import Ads_type from "../../../models/ads_types.js";
import AdsTypesResourceForAdmin from "./resources/ads_types.resources.js";

export const getAdsTypesPage = async (req, res) => {
  console.log("at getAdsTypesPage");
  try {
    const adsTypesData = await Ads_type.findAll({});
    return res.render("admin/ads_types/index", {
      page: "ads_types",
      adsTypesData,
    });
  } catch (error) {
    console.log("error_getAdsTypesPage : ", error);
  }
};

export const getAdsTypesData = async (req, res) => {
  console.log("at getAds_TypesData");
  try {
    const adsTypesData = await Ads_type.findAll({});
    res.send({
      draw: req.draw,
      iTotalRecords: adsTypesData.length,
      iTotalDisplayRecords: adsTypesData.length,
      aaData: new AdsTypesResourceForAdmin(adsTypesData),
    });
    return adsTypesData;
  } catch (error) {
    console.log("error_getAdsTypesData : ", error);
  }
};

export const createAdsTypes = async (req, res) => {
  console.log("at createAdsTypes");
  try {
    const adsTypesData = await Ads_type.create({
      app_name: req.body.app_name,
      paltform_name: req.body.paltform_name,
      priority: req.body.priority,
      name: req.body.name,
    });

    res.send({ success: adsTypesData });
  } catch (error) {
    console.log("error_createAdsTypes : ", error);
  }
};

export const getAdsTypesDetail = async (req, res) => {
  console.log("at getAdsTypesDetail");
  try {
    const id = req.params.id;

    const adsTypesData = await Ads_type.findByPk(id);

    res.send({ data: adsTypesData });
    return adsTypesData;
  } catch (error) {
    console.log("error_getAdsTypesDetail : ", error);
  }
};

export const updateAdsTypes = async (req, res) => {
  console.log("at updateAdsTypes");
  try {
    const id = req.params.id;
    const {
      app_name,
      paltform_name,
      priority,
      name,
    } = req.body;

    const adsTypesData = await Ads_type.findByPk(id);

    if (adsTypesData) {
      adsTypesData.app_name = app_name;
      adsTypesData.paltform_name = paltform_name;
      adsTypesData.priority = priority;
      adsTypesData.name = name;

      await adsTypesData.save();
      res.send({ success: adsTypesData });
    }
  } catch (error) {
    console.log("error_updateAdsTypes : ", error);
  }
};

export const deleteAdsTypes = async (req, res) => {
  console.log("at deleteAdsTypes");
  try {
    const id = req.params.id;

    const adsTypesData = await Ads_type.findByPk(id);

    if (adsTypesData) {
      await adsTypesData.destroy({
        where: { id: id },
      });
      res.send({ success: true });
    }
  } catch (error) {
    console.log("error_deleteAdsTypes : ", error);
  }
};
