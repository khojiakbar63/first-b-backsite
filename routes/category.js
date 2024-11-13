import { category,  data } from "../utils/index.js";
import { Router } from "express";

const router = Router();
// GET = Category
router.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "This is the category.",
      data: category,
    });
  });


  // Get By Category
router.get("/", (req, res) => {
    const category = req.query.category;
    const limit = req.query.limit;
    let products = data;
    if (category) {
      products = products.filter((product) => product.category === category);
    }
    console.log(products);
    res.status(200).json({
      success: true,
      message: "This is the data",
      data: products.slice(0, limit),
    });
  });

  export default router;