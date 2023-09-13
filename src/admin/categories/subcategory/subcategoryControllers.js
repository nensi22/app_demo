import Category from "../../../../models/categories.js";
import subCategory from "../../../../models/subcategories.js";
import subCategoryResourceForAdmin from "./resources/subCategory.resources.js";

export const getSubCategoryPage = async (req, res) => {
  console.log("at getSubCategoryPage");
  try {
    const category_menu_id = req.params.id;

    let category_id;

    const subCategoryData = await subCategory.findAll({
      where: { category_menu_id: category_menu_id },
    });
    return res.render("admin/category/menus/subcategory/index", {
      page: "data",
      subCategoryData,
      category_id,
      category_menu_id: category_menu_id,
    });
  } catch (error) {
    console.log("error_getSubCategoryPage : ", error);
  }
};

export const getSubCategoryData = async (req, res) => {
  console.log("at getSubCategoryData");
  try {
    const category_menu_id = req.params.id;
    const subCategoryData = await subCategory.findAll({
      where: { category_menu_id: category_menu_id },
    });
    res.send({
      draw: req.draw,
      iTotalRecords: subCategoryData.length,
      iTotalDisplayRecords: subCategoryData.length,
      aaData: new subCategoryResourceForAdmin(subCategoryData),
    });
    return subCategoryData;
  } catch (error) {
    console.log("error_getSubCategoryData : ", error);
  }
};

export const createSubCategory = async (req, res) => {
  console.log("at createSubCategory");
  try {
    const subCategoryData = await subCategory.create({
      category_menu_id: req.body.category_menu_id,
      title: req.body.title,
      position: req.body.position,
    });

    return res.send({ success: subCategoryData });
  } catch (error) {
    console.log("error_createSubCategory : ", error);
  }
};

export const getSubCategoryDetail = async (req, res) => {
  console.log("at getSubCategoryDetail");
  try {
    const id = req.params.id;

    const subCategoryData = await subCategory.findByPk(id);

    res.send({ data: subCategoryData });
    return subCategoryData;
  } catch (error) {
    console.log("error_getSubCategoryDetail : ", error);
  }
};

export const updateSubCategory = async (req, res) => {
  console.log("at updateSubCategory");
  try {
    const id = req.params.id;
    const {
      title,
      position,
    } = req.body;

    const subCategoryData = await subCategory.findByPk(id);

    if (subCategoryData) {
      subCategoryData.title = title;
      subCategoryData.position = position;

      await subCategoryData.save();
      res.send({ success: subCategoryData });
    }
  } catch (error) {
    console.log("error_updateSubCategory : ", error);
  }
};

export const deleteSubCategory = async (req, res) => {
  console.log("at deleteSubCategory");
  try {
    const id = req.params.id;

    const subCategoryData = await subCategory.findByPk(id);

    if (subCategoryData) {
      await subCategoryData.destroy({ where: { id: id } });
      res.send({ success: true });
    }
  } catch (error) {
    console.log("error_deleteSubCategory : ", error);
  }
};
