import Serve_Country from "../../../models/serve_countries.js";

export const getServeCountryPage = async (req, res) => {
  console.log("at getServeCountryPage");
  try {
    const countryData = await Serve_Country.findAll({});
    return res.render("admin/serveCountries/index", {
      page: "serve-country",
      countryData,
    });
  } catch (error) {
    console.log("error_getServeCountryPage : ", error);
  }
};
