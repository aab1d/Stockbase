const validateStockAmount = (req, res, next) => {
  const { change } = req.body;
  if (typeof change != "number" || isNaN(change)) {
    return res.status(400).json({ message: "Amount must be a valid number" });
  }
  next();
};

export default validateStockAmount;
