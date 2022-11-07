const mongoose = require("mongoose");
const dbConnect = require("./utils/db");
const userSchema = mongoose.Schema({
  id: String,
  dob: String,
  email: String,
  name: String,
  username: String,
  phone:String,
  password: String,
  country:String,
  gender:String,
  enc_password: String,
  uniqueId: String,
});

const Users = dbConnect.model("Users", userSchema);
module.exports = Users;