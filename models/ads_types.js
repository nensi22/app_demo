import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";

class Ads_type extends Model {}

Ads_type.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    app_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platform_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "ads_types",
    timestamps: true,
  },
);

export default Ads_type;
