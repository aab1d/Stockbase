import Product from "../models/Product.js";

const checkDuplicateProductOnUpdate = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) return next();

  try {
    const existingProduct = await Product.findOne({
      name,
      _id: { $ne: id },
    });
    if (existingProduct) {
      return res.status(409).json({ message: "Product name already in use" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default checkDuplicateProductOnUpdate;
