import { baseUrl } from "../../../../../../common/constants/config-constant.js";

export default class subCategoryMenuResourceForAdmin {
  constructor(categoryMenu) {
    return categoryMenu.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.image ? baseUrl(data.image) : null,
      bg_color: data.bg_color,
      font_color: data.font_color,
    }));
  }
}
