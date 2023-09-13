import jwt from "jsonwebtoken";

import Admin from "../../../models/admin.js";
import App from "../../../models/apps.js";
import { JWT } from "../../../common/constants/constant.js";

export const getLoginPage = async (req, res) => {
  console.log("at getLoginPage");
  try {
    if (req.session.token) {
      jwt.verify(req.session.token, JWT.SECRET, (err, decoded) => {
        if (err) {
          return res.render("admin/login");
        } else {
          return res.redirect("dashboard");
        }
      });
    } else {
      return res.render("admin/login");
    }
  } catch (error) {
    console.log("error_getLoginPage : ", error);
    return res.render("admin/login");
  }
};

export const getDashboard = async (req, res) => {
  console.log("at getDashboard");
  const apps = await App.count();
  const activeApps = await App.count({ where: { is_active: true } });
  return res.render("admin/dashboard/index", {
    page: "dashboard",
    apps,
    activeApps,
  });
};

export const login = async (req, res) => {
  console.log("at admin login");
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email: email } });

    if (admin) {
      const hashedPassMatch = await Admin.passwordMath(
        password,
        admin.password,
      );

      if (hashedPassMatch) {
        const payload = {
          admin: admin,
        };
        await jwt.sign(
          payload,
          JWT.SECRET,
          { expiresIn: JWT.EXPIRES_IN },
          (error, token) => {
            if (error) {
              console.log("error generating token : ", error);
              return res.render("errors/500");
            } else {
              req.session.token = token;
              console.log("req.session.token : ", req.session.token);
              return res.redirect("/admin/dashboard");
            }
          },
        );
      } else {
        return res.render("admin/login", {
          message: "email or password is incorrect!",
          data: email,
          password,
        });
      }
    } else {
      return res.render("admin/login", {
        message: "email or password is incorrect!",
        data: email,
        password,
      });
    }
  } catch (error) {
    console.log("error_admin_login : ", error);
    return res.render("errors/500");
  }
};

export const logout = async (req, res) => {
  delete req.session.token;
  console.log("admin logged out");
  // console.log("req.session.token", req.session.token);
  return res.render("admin/login");
};
