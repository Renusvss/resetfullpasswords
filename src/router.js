const express = require("express");
const dbConnect = require("./utils/db");
const router = express.Router();
const {
  registerNewUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  isAuthenticated,
  loginUser,
  forgotPassword,
  forgotpassword,
  resetPassword,
  resetpassword,
  updateOneUser,
} = require("./controllers");
router.post("/register", registerNewUser);
router.get("/is-auth", isAuthenticated);
router.post("/login", loginUser);
router.get("/get-users", getAllUsers);
router.get("/get-one-users", getOneUser);
router.get("/delete-one-users", deleteOneUser);
router.get("/forgotpassword",forgotPassword);
router.post("/forgotpassword",forgotpassword);
router.get("/resetpassword/:uniqueId",resetPassword);
router.post("/resetpassword/:uniqueId",resetpassword);
router.post("/update-user",updateOneUser);

module.exports = router;