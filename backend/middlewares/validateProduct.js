const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  if (!name || price == undefined || price == null || !category) {
    return res.status(400).json({ message: "Missing essential details" });
  }
  if (typeof price !== "number" || isNaN(price)) {
    return res.status(400).json({ message: "Price must be a valid number" });
  }
  next();
};

export default validateProduct;
