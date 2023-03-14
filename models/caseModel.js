const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  properties: [{}],

  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
  },
  time: {},
  date: {},
});

caseSchema.pre("save", function (next) {
  this.createdAt = Date.now();

  const toConverTime = (time) => {
    let hours = time.split(":")[0] * 1;
    if (hours > 12) {
      time = time.split(":").splice(1).join(":");
      hours = hours - 12;
      return `${hours < 10 ? "0" + hours : hours}:${time} PM`;
    } else {
      return `${time} AM`;
    }
  };

  this.time = toConverTime(
    new Date(this.createdAt).toTimeString().split(" ")[0]
  );

  this.date = new Date(this.createdAt)
    .toUTCString()
    .split(" ")
    .splice(0, 4)
    .join(" ");

  next();
});

const Case = mongoose.model("Case", caseSchema);

module.exports = Case;
