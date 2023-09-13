import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";

class App extends Model {}

App.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_sidebar: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_bottombar: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    splash_slider_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    splash_slider_font_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    splash_slider_inactive_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_adds_true: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "apps",
    timestamps: true,
  },
);

export default App;
