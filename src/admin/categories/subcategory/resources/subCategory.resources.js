export default class subCategoryResourceForAdmin {
  constructor(subCategory) {
    return subCategory.map((data) => ({
      id: data.id,
      category_menu_id: data.category_menu_id,
      title: data.title,
      position: data.position,
    }));
  }
}
