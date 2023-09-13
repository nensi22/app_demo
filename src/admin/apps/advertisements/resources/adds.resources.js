export default class AddsResourceForAdmin {
  constructor(adds) {
    return adds.map((data) => ({
      id: data.id,
      add_type: data.add_type,
      add_platform: data.add_platform,
      add_key: data.add_key,
      keyword: data.keyword,
      is_show: data.is_show,
    }));
  }
}
