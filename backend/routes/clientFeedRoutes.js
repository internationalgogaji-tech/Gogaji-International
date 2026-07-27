const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const controller = require("../controllers/clientFeedController");

// Replace requireAdmin below with the same admin middleware used by your other
// protected routes. Keeping public GET separate is intentional.
const router = express.Router();

const uploadDirectory = path.join(__dirname, "..", "uploads", "client-feed");
fs.mkdirSync(uploadDirectory, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadDirectory);
    },

    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname).toLowerCase();

      const safeName = path
        .basename(file.originalname, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      callback(
        null,
        `${Date.now()}-${safeName || "client-feed"}${ext}`
      );
    },
  }),

  limits: {
    fileSize: 100 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    const allowedVideoTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    const allowedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    const isVideo = allowedVideoTypes.includes(file.mimetype);
    const isImage = allowedImageTypes.includes(file.mimetype);

    if (!isVideo && !isImage) {
      return callback(
        new Error(
          "Only MP4, WebM, MOV, JPG, PNG and WebP files are allowed."
        ),
        false
      );
    }

    callback(null, true);
  },
});

router.get("/", controller.getPublicFeed);
router.get("/admin", controller.getAdminFeed);
router.post("/upload", upload.single("file"), controller.uploadFeedMedia);
router.post("/", controller.createFeedItem);
router.put("/:id", controller.updateFeedItem);
router.delete("/:id", controller.deleteFeedItem);

module.exports = router;
