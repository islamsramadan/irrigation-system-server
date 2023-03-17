const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: [true, "temperature is required"],
  },
  moisture: {
    type: Number,
    required: [true, "moisture is required"],
  },
  humidity: {
    type: Number,
    required: [true, "humidity is required"],
  },
  rain: {
    type: String,
    enum: ["Dry", "Wet", "Rainy"],
    required: [true, "rain is required"],
  },

  caseStudy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  creator: { type: mongoose.Schema.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
  },
  time: {},
  date: {},
});

featureSchema.pre("save", function (next) {
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

const Feature = mongoose.model("Feature", featureSchema);

module.exports = Feature;
