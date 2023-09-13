import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";
import App from "./apps.js";

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    app_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: App,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bg_color: {
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
    tableName: "categories",
    timestamps: true,
  },
);

Category.belongsTo(App, {
  foreignKey: "app_id",
  as: "app",
  onDelete: "CASCADE",
});

export default Category;
