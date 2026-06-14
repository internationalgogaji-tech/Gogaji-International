const mongoose = require("mongoose");

const navbarSettingSchema =
  new mongoose.Schema({
    announcementText: {
      type: String,
      default: "",
    },

    themeColor: {
      type: String,
      default: "#C65A1E",
    },

    hoverColor: {
      type: String,
      default: "#A84714",
    },

    textColor: {
      type: String,
      default: "#1F2937",
    },

    backgroundColor: {
      type: String,
      default: "#FFFFFF",
    },
  });

module.exports = mongoose.model(
  "NavbarSetting",
  navbarSettingSchema
);