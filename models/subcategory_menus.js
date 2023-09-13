import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";
import subCategory from "./subcategories.js";

class subCategory_Menu extends Model {}

subCategory_Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: subCategory,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bg_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    font_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "subcategory_menus",
    timestamps: true,
  },
);

subCategory_Menu.belongsTo(subCategory, {
  foreignKey: "subcategory_id",
  as: "subcategory",
  onDelete: "CASCADE",
});

export default subCategory_Menu;
