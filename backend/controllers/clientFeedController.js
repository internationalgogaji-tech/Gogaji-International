const ClientFeed = require("../models/ClientFeed");

const populateProduct = {
  path: "product",
  select:
    "name slug thumbnail images price salePrice discountPrice mrp category moq stock",
  populate: {
    path: "category",
    select: "name slug",
  },
};

exports.getPublicFeed = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 24, 1), 100);
    const items = await ClientFeed.find({ isActive: true })
      .populate(populateProduct)
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(limit)
      .lean();

    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

exports.getAdminFeed = async (req, res, next) => {
  try {
    const items = await ClientFeed.find()
      .populate(populateProduct)
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

exports.createFeedItem = async (req, res, next) => {
  try {
    const item = await ClientFeed.create(req.body);
    await item.populate(populateProduct);
    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

exports.updateFeedItem = async (req, res, next) => {
  try {
    const item = await ClientFeed.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate(populateProduct);

    if (!item) return res.status(404).json({ success: false, message: "Feed item not found" });
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

exports.deleteFeedItem = async (req, res, next) => {
  try {
    const item = await ClientFeed.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Feed item not found" });
    res.json({ success: true, message: "Feed item deleted" });
  } catch (error) {
    next(error);
  }
};

exports.uploadFeedMedia = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please choose a video or image file." });
  }

  res.status(201).json({
    success: true,
    url: `/uploads/client-feed/${req.file.filename}`,
  });
};
