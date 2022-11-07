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
} = require("./controllers");
router.post("/register", registerNewUser);
router.get("/is-auth", isAuthenticated);
router.post("/login", loginUser);
//router.post("/update-one-user", updateOneUser);
router.get("/get-users", getAllUsers);
router.get("/get-one-users", getOneUser);
router.get("/delete-one-users", deleteOneUser);
module.exports = router;