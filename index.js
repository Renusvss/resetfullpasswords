const {
  registerNewUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  loginUser,
  isAuthenticated,
  forgotPassword,
  forgotpassword,
  resetPassword,
  resetpassword,
  updateOneUser,
} = require("./src/controllers");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require ("ejs");
const server = express();
const cors = require("cors");
const router = require("./src/router");
const dbConnect = require("./src/utils/db");
// server.engine('ejs', require('ejs').renderFile);
//server.use(express.static(__dirname + '/view'));
server.use(cors());
server.use(bodyParser.json());
server.set('views', './src/views');
server.use("/api", router);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.set("view engine", "ejs");
server.listen(4005, () => {
  console.log("Server Started..");
});
