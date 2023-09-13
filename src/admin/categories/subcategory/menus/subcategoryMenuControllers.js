import fs from "fs/promises";
import {
  baseUrl,
  subCategoryImagePath,
} from "../../../../../common/constants/config-constant.js";
import subCategory_Menu from "../../../../../models/subcategory_menus.js";
import subCategoryMenuResourceForAdmin from "./resources/subcatgoryMenu.resources.js";

export const getSubCategoryMenuPage = async (req, res) => {
  console.log("at getSubCategoryMenuPage");
  try {
    const subcategory_id = req.params.id;

    const subCategoryMenuData = await subCategory_Menu.findAll({
      where: { subcategory_id: subcategory_id },
    });
    return res.render("admin/category/menus/subcategory/menus/index", {
      page: "data",
      subCategoryMenuData,
      subcategory_id: subcategory_id,
    });
  } catch (error) {
    console.log("error_getSubCategoryMenuPage : ", error);
  }
};

export const getSubCategoryMenusData = async (req, res) => {
  console.log("at getSubCategoryMenusData");
  try {
    const subcategory_id = req.params.id;

    const subCategoryMenuData = await subCategory_Menu.findAll({
      where: { subcategory_id: subcategory_id },
    });
    res.send({
      draw: req.draw,
      iTotalRecords: subCategoryMenuData.length,
      iTotalDisplayRecords: subCategoryMenuData.length,
      aaData: new subCategoryMenuResourceForAdmin(subCategoryMenuData),
    });
    return subCategoryMenuData;
  } catch (error) {
    console.log("error_getSubCategoryMenusData : ", error);
  }
};

export const createSubCategoryMenu = async (req, res) => {
  console.log("at createSubCategoryMenu");
  try {
    const subCategoryMenuData = await subCategory_Menu.create({
      subcategory_id: req.body.subcategory_id,
      name: req.body.name,
      image: req.file ? `${subCategoryImagePath}/${req.file.filename}` : null,
      bg_color: req.body.bg_color,
      font_color: req.body.font_color,
    });

    return res.send({ success: subCategoryMenuData });
  } catch (error) {
    console.log("error_createSubCategoryMenu : ", error);
  }
};

export const getSubCategoryMenuDetail = async (req, res) => {
  console.log("at getSubCategoryMenuDetail");
  try {
    const id = req.params.id;

    const subCategoryMenuData = await subCategory_Menu.findByPk(id);
    subCategoryMenuData.image = baseUrl(subCategoryMenuData.image);

    res.send({ data: subCategoryMenuData });
    return subCategoryMenuData;
  } catch (error) {
    console.log("error_getSubCategoryMenuDetail : ", error);
  }
};

export const updateSubCategoryMenu = async (req, res) => {
  console.log("at updateSubCategoryMenu");
  try {
    const id = req.params.id;
    const {
      name,
      bg_color,
      font_color,
    } = req.body;

    let image = req.file;

    const subCategoryMenuData = await subCategory_Menu.findByPk(id);

    if (subCategoryMenuData) {
      if (image) {
        try {
          await fs.unlink(subCategoryMenuData.image);
          console.log("deleted previous sub category menu image");
        } catch (err) {
          console.log(
            "error deleting previous sub category menu image:",
            err,
          );
        }

        subCategoryMenuData.image =
          `${subCategoryImagePath}/${req.file.filename}`;
      }

      subCategoryMenuData.name = name;
      subCategoryMenuData.bg_color = bg_color;
      subCategoryMenuData.font_color = font_color;

      await subCategoryMenuData.save();
      res.send({ success: subCategoryMenuData });
    }
  } catch (error) {
    console.log("error_updateSubCategoryMenu : ", error);
  }
};

export const deleteSubCategoryMenu = async (req, res) => {
  console.log("at deleteSubCategoryMenu");
  try {
    const id = req.params.id;

    const subCategoryMenuData = await subCategory_Menu.findByPk(id);

    if (subCategoryMenuData) {
      if (subCategoryMenuData.image) {
        try {
          await fs.unlink(subCategoryMenuData.image);
          console.log("deleted sub category menu image");
        } catch (err) {
          console.log("Error deleting sub category menu image : ", err);
        }
      }

      await subCategoryMenuData.destroy({
        where: { id: id },
      });
      res.send({ success: true });
    }
  } catch (error) {
    console.log("error_deleteSubCategoryMenu : ", error);
  }
};
