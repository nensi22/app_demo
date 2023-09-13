import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";
import App from "./apps.js";

class Advertisements extends Model {}

Advertisements.init(
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
    add_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    add_platform: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    add_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keyword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_show: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "advertisements",
    timestamps: true,
  },
);

Advertisements.belongsTo(App, {
  foreignKey: "app_id",
  as: "app",
  onDelete: "CASCADE",
});

export default Advertisements;
