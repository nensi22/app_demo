import { baseUrl } from "../../../../common/constants/config-constant.js";

export default class AppResourceForAdmin {
  constructor(app) {
    return app.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.image ? baseUrl(data.image) : null,
      is_sidebar: data.is_sidebar,
      is_bottombar: data.is_bottombar,
      splash_slider_color: data.splash_slider_color,
      splash_slider_font_color: data.splash_slider_font_color,
      splash_slider_inactive_color: data.splash_slider_inactive_color,
      is_adds_true: data.is_adds_true,
      is_active: data.is_active,
    }));
  }
}
