const mongoose = require("mongoose");

const clientFeedSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    caption: { type: String, trim: true, maxlength: 500, default: "" },
    videoUrl: { type: String, required: true, trim: true },
    posterUrl: { type: String, trim: true, default: "" },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ClientFeed", clientFeedSchema);
