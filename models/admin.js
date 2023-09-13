import { DataTypes, Model } from "sequelize";
import sequelize from "../common/config/database.js";
import bcrypt from "bcryptjs";
import { BCRYPT } from "../common/constants/constant.js";

class Admin extends Model {
  static async beforeCreate(admin) {
    console.log("beforeCreate");
    try {
      if (admin.password) {
        admin.password = await bcrypt.hash(
          admin.password,
          BCRYPT.SALT_ROUND,
        );
      }
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  }

  static async passwordMath(password, hashedPassword) {
    console.log("passwordMath");
    try {
      return bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error("Error comparing password:", error);
    }
  }
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "admin",
    timestamps: true,
    hooks: { beforeCreate: Admin.beforeCreate },
  },
);

export default Admin;
