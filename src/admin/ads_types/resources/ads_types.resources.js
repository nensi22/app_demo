export default class AdsTypesResourceForAdmin {
  constructor(adsTypes) {
    return adsTypes.map((data) => ({
      id: data.id,
      app_name: data.app_name,
      paltform_name: data.paltform_name,
      priority: data.priority,
      name: data.name,
    }));
  }
}
