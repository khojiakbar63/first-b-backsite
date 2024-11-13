import { data } from "../utils/index.js";
import { Router } from "express";

const router = Router();

// Get all
// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "This is the data",
//     data,
//   });
// });


  
  // Get By ID
  router.get("/:id", (req, res) => {
    const productID = req.params.id;
    const foundProduct = data.find((product) => product.id === +productID);
    if (!productID) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product by ID.",
      data: foundProduct,
    });
  });
  
  // POST
  router.post("/", (req, res) => {
    const newProduct = {
      id: data.length + 1,
      ...req.body,
    };
    data.unshift(newProduct);
    res.status(201).json({
      success: true,
      message: "ok",
      data: newProduct,
    });
  });
  
  // PUT
  router.put("/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
  
    // Find the index of the product
    const index = data.findIndex((product) => product.id === productId);
  
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  
    // Update the product at the found index
    data[index] = {
      id: productId,
      ...updatedProduct,
    };
  
    res.status(200).json({
      success: true,
      message: "Product updated",
      data: data[index],
    });
  });
  
  // DELETE
  router.delete("/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const index = data.findIndex((product) => product.id === productId);
  
    if (index === -1) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  
    data.splice(index, 1);
    res.status(200).json({
      message: "Product deleted",
    });
    console.log(data);
  });

  export default router;
