const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  bulkCreateCategories,
  updateCategory,
  deleteCategory,
  getMainCategories,
  getSubCategories,
  getChildCategories,
  getNavbarCategories,
  getHomeSliderCategories,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/main", getMainCategories);

router.get("/sub", getSubCategories);

router.get("/child", getChildCategories);

router.get("/navbar", getNavbarCategories);
router.get("/home-slider", getHomeSliderCategories);

// bulk route ko /:slug se pehle rakhna zaroori hai
router.post("/bulk", bulkCreateCategories);

router.get("/:slug", getCategoryBySlug);

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;