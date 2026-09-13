import Product from "../models/Product.js";

const checkDuplicateProduct = async (req, res, next) => {
  const { name } = req.body;
  try {
    const product = await Product.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    });
    if (product) {
      return res.status(409).json({ message: "Product already exists!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
  next();
};

export default checkDuplicateProduct;
