import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";
import Ads_type from "./ads_types.js";

class Serve_Country extends Model {}

Serve_Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ads_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Ads_type,
        key: "id",
      },
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calling_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "serve_countries",
    timestamps: true,
  },
);

Serve_Country.belongsTo(Ads_type, {
  foreignKey: "ads_type_id",
  as: "ads_types",
  onDelete: "CASCADE",
});

export default Serve_Country;
