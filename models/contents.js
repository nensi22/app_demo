import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";
import Category_Menu from "./category_menus.js";
import subCategory_Menu from "./subcategory_menus.js";

class Content extends Model {}

Content.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subcategory_menu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: subCategory_Menu,
        key: "id",
      },
    },
    category_menu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Category_Menu,
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "contents",
    timestamps: true,
  },
);

Content.belongsTo(subCategory_Menu, {
  foreignKey: "subcategory_menu_id",
  as: "subcategory_menus",
  onDelete: "CASCADE",
});
Content.belongsTo(Category_Menu, {
  foreignKey: "category_menu_id",
  as: "category_menus",
  onDelete: "CASCADE",
});

export default Content;
