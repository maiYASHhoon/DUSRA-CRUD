const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("Database Connection Established");
});
mongoose.connection.on("error", (error) => {
  console.log("Database ERROR: " + error);
});
const initConnection = (callback) => {
  let options = {};
  if (process.env.isProduction == true || process.env.isProduction == "true") {
  }
};

mongoose.set("debug", true);
mongoose.connect("-----------");
