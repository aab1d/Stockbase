import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Failed to fetch products" });
  }
};
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { q } = req.query;
    const products = await Product.find({
      name: { $regex: q, $options: "i" },
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search failed" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const existingProduct = await Product.findOne({ name: name });
    if (existingProduct) {
      return res.status(401).json({ message: "Product already exists!" });
    }
    const prod = await Product.create({ name, price, description });
    res.status(200).json({ message: "Product created" });
    console.log(prod);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Failed to add product" });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { change } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { amount: change },
      },
      { returnDocument: "after" },
    );
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Stock updated", data: updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
