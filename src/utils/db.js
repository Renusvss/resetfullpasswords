const mongoose = require("mongoose");
const dbConnect = mongoose.createConnection(
    "mongodb+srv://Renu:renu2020@nodes.kftb3xo.mongodb.net/?retryWrites=true&w=majority"
  // "mongodb+srv://prateek:asdqwe123@cluster0.aymw0vw.mongodb.net/auth?retryWrites=true&w=majority"
);
dbConnect.on("connected", () => {
  console.log("connected with data base");
});
dbConnect.on("error", () => {
  console.log("not connected");
});
module.exports = dbConnect;