import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";
import Category_Menu from "./category_menus.js";

class subCategory extends Model {}

subCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_menu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Category_Menu,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "subcategories",
    timestamps: true,
  },
);

subCategory.belongsTo(Category_Menu, {
  foreignKey: "category_menu_id",
  as: "category_menus",
  onDelete: "CASCADE",
});

export default subCategory;
