const mongoose = require("mongoose");
const dotenv = require("dotenv");

const sensorReadings = require("./utils/sensorReadings");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception! 🌟 Shutting Down...");

  process.exit(1);
});

const app = require("./app");
const User = require("./models/userModel");
// const { users } = require("./data/users");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(() => {
  // User.create(users);
  console.log("successful connection");
});

const port = process.env.PORT || 8080;
// const port = 4545;
const server = app.listen(port, () => {
  console.log("app is running..." + port);
});

// Trigger the function every minute (60000 *60 ms = 1 hour)
setInterval(() => {
  sensorReadings.getFeatures("640fb4795d60e64f83b730c9");
}, 60000);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandeled Rejection! 🌟 Shutting Down...");

  server.close(() => {
    process.exit(1);
  });
});

// ngrok http --scheme=http 4545 --host-header=localhost:4545
