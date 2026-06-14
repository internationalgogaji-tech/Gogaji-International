const HomeDecorInfo = require("../models/HomeDecorInfo");

exports.getHomeDecorInfo = async (req, res) => {
  try {
    let data = await HomeDecorInfo.findOne();

    if (!data) {
      data = await HomeDecorInfo.create({
        sectionTitle: "Trending & New Launches",
        products: [],
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateHomeDecorInfo = async (req, res) => {
  try {
    const data =
      await HomeDecorInfo.findOneAndUpdate(
        {},
        req.body,
        {
          upsert: true,
          new: true,
        }
      );

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};