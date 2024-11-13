import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { category, data } from "./utils/index.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Get all
// app.get("/api/products", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "This is the data",
//     data,
//   });
// });

// Get By Category
app.get("/api/products", (req, res) => {
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

// Get By ID
app.get("/api/products/:id", (req, res) => {
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
app.post("/api/products", (req, res) => {
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
app.put("/api/products/:id", (req, res) => {
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
app.delete("/api/products/:id", (req, res) => {
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
// GET = Category
app.get("/api/category", (req, res) => {
  res.status(200).json({
    success: true,
    message: "This is the category.",
    data: category,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});
