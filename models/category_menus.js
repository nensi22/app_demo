import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";
import Category from "./categories.js";

class Category_Menu extends Model {}

Category_Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Category,
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
    is_subcategory: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "category_menus",
    timestamps: true,
  },
);

Category_Menu.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
  onDelete: "CASCADE",
});

export default Category_Menu;
