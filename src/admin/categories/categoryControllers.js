import fs from "fs/promises";

import {
  baseUrl,
  categoryImagePath,
} from "../../../common/constants/config-constant.js";
import App from "../../../models/apps.js";
import Category from "../../../models/categories.js";
import Category_Menu from "../../../models/category_menus.js";
import CategoryMenuResourceForAdmin from "./resources/categoryMenu.resources.js";
import Sequelize from "sequelize";

export const getCategoryPage = async (req, res) => {
  console.log("at getCategoryPage");
  try {
    const Op = Sequelize.Op;

    const categoryData = await Category.findAll({});
    const createdAppIds = categoryData.map((category) => {
      return category.app_id;
    });

    const appData = await App.findAll({
      where: { id: { [Op.notIn]: createdAppIds } },
    });

    const Apps = await App.findAll({});

    return res.render("admin/category/index", {
      page: "data",
      categoryData,
      Apps,
      apps: appData,
    });
  } catch (error) {
    console.log("error_getCategoryPage : ", error);
  }
};

export const getCategoryData = async (req, res) => {
  console.log("at getCategoryData");
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: App,
          as: "app",
          attributes: ["name"],
        },
      ],
    });
    const transformedData = categoryData.map((data) => ({
      id: data.id,
      app_id: data.app?.name || "",
      title: data.title,
      bg_color: data.bg_color,
      position: data.position,
    }));
    res.send({
      draw: req.draw,
      iTotalRecords: transformedData.length,
      iTotalDisplayRecords: transformedData.length,
      aaData: transformedData,
    });
    return transformedData;
  } catch (error) {
    console.log("error_getCategoryData : ", error);
  }
};

export const createCategory = async (req, res) => {
  console.log("at createCategory");
  try {
    const categoryData = await Category.create({
      app_id: req.body.app_id,
      title: req.body.title,
      bg_color: req.body.bg_color,
      position: req.body.position,
    });

    res.send({ success: categoryData });
  } catch (error) {
    console.log("error_createCategory : ", error);
  }
};

export const getCategoryDetail = async (req, res) => {
  console.log("at getCategoryDetail");
  try {
    const id = req.params.id;

    const categoryData = await Category.findByPk(id, {
      include: [
        {
          model: App,
          as: "app",
          attributes: ["name"],
        },
      ],
    });

    const transformedData = {
      id: categoryData.id,
      app_id: categoryData.app?.name || "",
      title: categoryData.title,
      bg_color: categoryData.bg_color,
      position: categoryData.position,
    };

    res.send({ data: transformedData });
    return transformedData;
  } catch (error) {
    console.log("error_getCategoryDetail : ", error);
  }
};

export const updateCategory = async (req, res) => {
  console.log("at updateCategory");
  try {
    const id = req.params.id;
    const {
      app_id,
      title,
      bg_color,
      position,
    } = req.body;

    const categoryData = await Category.findByPk(id);

    if (categoryData) {
      categoryData.app_id = app_id;
      categoryData.title = title;
      categoryData.bg_color = bg_color;
      categoryData.position = position;

      await categoryData.save();
      res.send({ success: categoryData });
    }
  } catch (error) {
    console.log("error_updateCategory : ", error);
  }
};

export const deleteCategory = async (req, res) => {
  console.log("at deleteCategory");
  try {
    const id = req.params.id;

    const categoryData = await Category.findByPk(id);

    if (categoryData) {
      await categoryData.destroy({ where: { id: id } });
      res.send({ success: true });
    }
  } catch (error) {
    console.log("error_deleteCategory : ", error);
  }
};

//  category menus
export const getCategoryMenusPage = async (req, res) => {
  console.log("at getCategoryMenusPage");
  try {
    const category_id = req.params.id;
    const categoryMenuData = await Category_Menu.findAll({
      where: { category_id: category_id },
    });
    return res.render("admin/category/menus/index", {
      page: "data",
      categoryMenuData,
      category_id: category_id,
    });
  } catch (error) {
    console.log("error_getCategoryMenusPage : ", error);
  }
};

export const getCategoryMenusData = async (req, res) => {
  console.log("at getCategoryMenusData");
  try {
    const category_id = req.params.id;
    const categoryMenuData = await Category_Menu.findAll({
      where: { category_id: category_id },
    });
    res.send({
      draw: req.draw,
      iTotalRecords: categoryMenuData.length,
      iTotalDisplayRecords: categoryMenuData.length,
      aaData: new CategoryMenuResourceForAdmin(categoryMenuData),
    });
    return categoryMenuData;
  } catch (error) {
    console.log("error_getCategoryMenusData : ", error);
  }
};

export const createCategoryMenu = async (req, res) => {
  console.log("at createCategoryMenu ");
  try {
    const categoryMenuData = await Category_Menu.create({
      category_id: req.body.category_id,
      name: req.body.name,
      image: req.file ? `${categoryImagePath}/${req.file.filename}` : null,
      bg_color: req.body.bg_color,
      font_color: req.body.font_color,
      is_subcategory: req.body?.is_subcategory === "true" ? true : false,
    });

    return res.send({ success: categoryMenuData });
  } catch (error) {
    console.log("error_createCategoryMenu : ", error);
  }
};

export const getCategoryMenuDetail = async (req, res) => {
  console.log("at getCategoryMenuDetail");
  try {
    const id = req.params.id;

    const categoryMenuData = await Category_Menu.findByPk(id);
    categoryMenuData.image = baseUrl(categoryMenuData.image);

    res.send({ data: categoryMenuData });
    return categoryMenuData;
  } catch (error) {
    console.log("error_getCategoryMenuDetail : ", error);
  }
};

export const updateCategoryMenu = async (req, res) => {
  console.log("at updateCategoryMenu");
  try {
    const id = req.params.id;
    const {
      name,
      bg_color,
      font_color,
      is_subcategory,
    } = req.body;

    let image = req.file;

    const categoryMenuData = await Category_Menu.findByPk(id);

    if (categoryMenuData) {
      if (image || "") {
        try {
          await fs.unlink(categoryMenuData.image);
          console.log("deleted previous category menu image");
        } catch (err) {
          console.log(
            "error deleting previous category menu image:",
            err,
          );
        }

        categoryMenuData.image = `${categoryImagePath}/${req.file.filename}`;
      }
      categoryMenuData.name = name;
      categoryMenuData.bg_color = bg_color;
      categoryMenuData.font_color = font_color;
      categoryMenuData.is_subcategory = is_subcategory === "true"
        ? true
        : false;

      await categoryMenuData.save();
      res.send({ success: categoryMenuData });
    }
  } catch (error) {
    console.log("error_updateCategoryMenu : ", error);
  }
};

export const updateSubCategoryOfCategoryMenu = async (req, res) => {
  console.log("at updateSubCategoryOfCategoryMenu");
  try {
    const id = req.params.id;

    const categoryMenuData = await Category_Menu.findByPk(id);

    if (categoryMenuData) {
      categoryMenuData.is_subcategory = !categoryMenuData.is_subcategory;
    }

    await categoryMenuData.save();
    res.send({ success: categoryMenuData });
  } catch (error) {
    console.log("error_updateSubCategoryOfCategoryMenu : ", error);
  }
};

export const deleteCategoryMenu = async (req, res) => {
  console.log("at deleteCategoryMenu");
  try {
    const id = req.params.id;

    const categoryMenuData = await Category_Menu.findByPk(id);

    if (categoryMenuData) {
      if (categoryMenuData.image) {
        try {
          await fs.unlink(categoryMenuData.image);
          console.log("deleted category menu image");
        } catch (err) {
          console.log(
            "error deleting category menu image:",
            err,
          );
        }
      }

      await categoryMenuData.destroy({
        where: { id: id },
      });
      res.send({ success: true });
    }
  } catch (error) {
    console.log("error_deleteCategoryMenu : ", error);
  }
};
