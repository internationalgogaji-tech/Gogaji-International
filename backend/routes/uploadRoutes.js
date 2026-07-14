const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  // Database mein only relative path save hoga
  const url = `/${req.file.path.replace(/\\/g, "/")}`;

  return res.status(201).json({
    success: true,
    url,
  });
});

module.exports = router;