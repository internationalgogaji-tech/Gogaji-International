const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const url = `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`;

    res.json({
      success: true,
      url,
    });
  }
);

module.exports = router;