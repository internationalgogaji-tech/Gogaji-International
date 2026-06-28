  const HomeDecorInfo = require("../models/HomeDecorInfo");
  const Product = require("../models/Product");

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
    console.log("HOME DECOR SAVE HIT");
    console.log(req.body);


    try {
      if (req.body.products?.length) {

        const cleanImagePath = (value = "") => {
  if (!value) return "";

  return String(value)
    .replace(/\/uploads\/uploads\//g, "/uploads/")
    .replace(/\r/g, "")
    .replace(/\n/g, "")
    .trim();
};

req.body.image = cleanImagePath(req.body.image);

req.body.products = req.body.products.map((item) => ({
  ...item,
  image: cleanImagePath(item.image),
  hoverImage: cleanImagePath(item.hoverImage),
}));

        const updatedProducts = await Promise.all(
          req.body.products.map(async (item) => {

            if (!item.sku) return item;

          const sku = String(item.sku || "").trim();

const product = await Product.findOne({
  isActive: true,
  status: "published",
  $or: [
    { sku: sku.toUpperCase() },
    { mpn: sku },
    { slug: sku.toLowerCase() },
  ],
});

            console.log(
    "UPDATED PRODUCT =",
    {
      sku: item.sku,
      productId: product?._id,
      slug: product?.slug,
    }
  );

            console.log("HOME DECOR SKU =", item.sku);

            console.log(
              "FOUND PRODUCT =",
              product?._id,
              product?.name,
              product?.slug
            );


            return {
              ...item,

              productId: product?._id,

              slug: product?.slug,

              buttonLink: product
                ? `/product/${product.slug}`
                : item.buttonLink,
            };
          })
        );

        req.body.products = updatedProducts;
      }

      console.log("AFTER CLEAN =", req.body.products?.[0]?.image);
console.log("AFTER CLEAN HOVER =", req.body.products?.[0]?.hoverImage);


      const data = await HomeDecorInfo.findOneAndUpdate(
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