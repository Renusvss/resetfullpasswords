const uuid = require("uuid");
const express = require("express");
const CryptoJS = require("crypto-js");
const dbConnect = require("./utils/db");
const { response } = require("express");
const Users = require("./models");
var jwt = require("jsonwebtoken");
var privateKey = "Renu";
const ejs = require("ejs");
const registerNewUser = (req, res) => {
  var data = req.body;
  console.log(data);
   data.uniqueId = uuid.v4();
  // var encPassword = CryptoJS.AES.encrypt(
  //   data.password,
  //   data.uniqueId
  // ).toString();

  // data.password = encPassword;

  var newUser = Users(data);

  newUser.save().then((response) => {
    return res.json(response);
  });
};

const getAllUsers = (req, res) => {
  Users.find().then((users) => {
    return res.json(users);
  });
};
const getOneUser = (req, res) => {
  var userId = req.query._id;
  Users.findById(userId).then((response) => {
    //response.uniqueId = undefined;
    return res.json(response);
  });
};
const updateOneUser = async (req, res) => {
  var userId = req.query._id;

  var data = req.body;

  var user = await Users.findOne({ username: data.username });

  if (user === null) {
    return res.json({
      status: false,

      msg: "Please enter registered email address",
    });
  }

  Users.findByIdAndUpdate(user, data).then((response) => {
    return res.json({ status: "updated", user: response });
  });
};
const deleteOneUser = (req, res) => {
  var userId = req.query._id;
  Users.findByIdAndDelete(userId).then((response) => {
    return res.json({ status: "Deleted", user: response });
  });
};
const loginUser = async (req, res) => {
  var data = req.body;
  var user = await Users.findOne({ email: data.email });

  if (user === null) {
    return res.json({ status: false, msg: "You entered wrong Username" });
  }

  // var decPass = CryptoJS.AES.decrypt(user.password, user.uniqueId).toString(
  //   CryptoJS.enc.Utf8
  // );

  // if (decPass !== data.password) {
  //   return res.json({ status: false, msg: "You entered wrong Password" });
  // }
    
  if(data.password !== user.password){
    return res.json({ status: false, msg: "You entered wrong Password" });
  }

  var token = jwt.sign({ email: user.email, _id: user._id }, privateKey);

  // user.uniqueId = undefined;
  // user.password = undefined;

  return res.json({ status: true, data: user, token: token });
};

const isAuthenticated = async (req, res) => {
  var userToken = req.query.token;
  var user = jwt.verify(userToken, privateKey);
  if (user) {
    user = await Users.findById(user._id);
    // user.password = undefined;
    // user.uniqueId = undefined;
    return res.json({ status: true, data: user });
  } else {
    return res.json({ status: false });
  }
};
const forgotPassword = (req, res) => {
  res.render("forgotpassword");
};
// const forgotpassword = async (req,res)=>{
//   const data=req.body;
//   var user = await Users.findOne({ email: data.email });
//   if (user ==null) {
//     return res.json({ status: false, msg: "You entered wrong Username" });
//   }
//   // const token = jwt.sign({ username: user.username, _id: user._id }, privateKey, { expiresIn: "120s" });
//   const userToken = jwt.sign({ email:user.email, id: user.id }, privateKey);
//   //var token=req.body.token || req.query.token || req.headers[ "x-access-token"];

//   const link = `http://localhost:4005/api/resetpassword/${user._id}/${userToken}`;
//   console.log(link);
//   res.send("Password reset link has been sent to registered emailid");
// }
const forgotpassword = async (req, res) => {
  const data = req.body;
  var user = await Users.findOne({ email: data.email });
  if (user === null) {
    return res.json({
      status: false,
      msg: "enetered email is wrong enter correct email to proceed",
    });
  }
  const link = `http://localhost:4005/api/resetpassword/${user.uniqueId}`;
  console.log(link);
};
const resetPassword = (req, res) => {
  res.render("resetpassword");
};
// const resetPassword = async (req, res) => {
//   //const userToken=req.query;
//   const { id, token } = req.params;
//   if (id !== Users._id) {
//     res.send("invalid  id..");
//   }
//   //const secret = privateKey + Users.password;
//   try {
//     //var user = jwt.verify(token, privateKey);
//     //const payload = jwt.verify(token, secret);
//     res.render("resetpassword", { email: user.email });
//     //res.render("reset-pass")
//   } catch (error) {
//     console.log(error.message);
//     res.send(error.message);
//   }
// };
// const resetpassword = async (req, res) => {
//   //var token=req.body.token || req.query.token || req.headers[ "x-access-token" ]
//   const { email, newpassword, confirmpassword } = req.body;
//   let query = await Users.findOne({ email: email });
//   jwt.verify(query, process.env.privateKey, async (decPass) => {
//     if (!decPass) {
//       res.send("error");
//       res.redirect(`/resetpassword/${query.resetlink}`);
//     } else if (newpassword !== confirmpassword) {
//       res.send("error", "Passwords do  not match");
//       res.redirect(`/resetpassword/${query}`);
//     } else {
//       try {
//         let savedUser = await query.setPassword(newpassword);
//         await savedUser.save();
//         res.send("success", "Password was successfully changed");
//         res.redirect("/login");
//       } catch (error) {
//         res.send("error", "There was an error updating ");
//         res.redirect(`/resetpassword/${query}`);
//       }
//     }
//   });
// };
const resetpassword = async (req, res) => {
  var userId = req.query.uniqueId;
  var data = req.body;
  var newpassword = req.body;
  var confirmpassword = req.body;
  if (newpassword === confirmpassword) {
    Users.findOneAndUpdate(userId, data).then((response) => {
       return res.json({user:response});
    });
  }
  else{
      return res.json({ status: false, msg: "You entered wrong Password" });
     }
  }
  // if(newpassword !== confirmpassword) {
  //   return res.json({ status: false, msg: "You entered wrong Password" });
  // }

module.exports = {
  registerNewUser,
  isAuthenticated,
  loginUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  forgotPassword,
  forgotpassword,
  resetPassword,
  resetpassword,
  updateOneUser,
};
