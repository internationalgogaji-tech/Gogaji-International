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

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://gogaji-international.onrender.com"
      : "http://localhost:5000";

  const url = `${BASE_URL}/${req.file.path.replace(/\\/g, "/")}`;

  return res.json({
    success: true,
    url,
  });
});

module.exports = router;