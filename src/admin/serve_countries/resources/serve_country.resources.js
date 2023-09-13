export default class ServeCountryResourceForAdmin {
  constructor(serveCountry) {
    return serveCountry.map((data) => ({
      id: data.id,
      ads_type_id: data.ads_type_id,
      country_name: data.country_name,
      country_code: data.country_code,
      calling_code: data.calling_code,
    }));
  }
}
