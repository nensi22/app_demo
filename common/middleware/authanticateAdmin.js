import jwt from "jsonwebtoken";
import { JWT } from "../constants/constant.js";

const verifyAdmin = async (req, res, next) => {
  console.log("at verifyAdmin");
  try {
    if (req.session.token) {
      jwt.verify(req.session.token, JWT.SECRET, function (err, decoded) {
        if (err) {
          return res.redirect("/admin");
        } else {
          next();
        }
      });
    } else {
      return res.redirect("/admin");
    }
  } catch (error) {
    console.log("error_verifyAdmin : ", error);
  }
};

export default verifyAdmin;
