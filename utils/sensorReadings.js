const axios = require("axios");
const Feature = require("../models/featureModel");
const User = require("../models/userModel");

exports.getFeatures = async (caseStudy) => {
  try {
    const response = await axios.request({
      method: "get",
      maxBodyLength: Infinity,
      url: "https://ny3.blynk.cloud/external/api/get?token=8JfQZXvdTQnzZJF0UrSbIBkcwqvuJDgv&v0",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      },
      //   data: JSON.stringify(whatsappPayload),
    });

    // console.log("response", response);
    if (response.status === 200 && response.data) {
      // console.log("response.data", response.data);
      let readings = response.data.split(".");
      // console.log("readings", readings);

      readings = readings.map((item) => {
        if (isNaN(item * 1)) return null;
        return item * 1;
      });

      const temperature = readings[0];
      const moisture = readings[1];
      const humidity = readings[2];
      const rain =
        readings[3] === 1 ? "Rainy" : readings[3] === 0 ? "Dry" : "Wet";

      console.log("readings", readings);

      if (temperature && moisture && humidity && rain) {
        const newFeatureData = {
          temperature,
          moisture,
          humidity,
          rain,
          caseStudy,
          // message,
        };
        // console.log("data ==================", newFeatureData);
        const newFeature = await Feature.create(newFeatureData);
        const user = await User.findByIdAndUpdate(caseStudy, {
          lastFeatures: newFeature._id,
        });

        console.log("newFeature", newFeature);
      }
    }
  } catch (err) {
    console.log(
      "err ----------------------------------------------------------> ",
      err
    );
  }
};
