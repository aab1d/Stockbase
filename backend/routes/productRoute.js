import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  searchProduct,
  updateStock,
} from "../controller/productController.js";
import validateProduct from "../middlewares/validateProduct.js";
import checkDuplicateProduct from "../middlewares/checkDuplicateProduct.js";
import checkDuplicateProductOnUpdate from "../middlewares/checkDuplicateProductOnUpdate.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import validateStockAmount from "../middlewares/validateStockAmount.js";
import auth from "../middlewares/auth.js";
import requireRole from "../middlewares/requireRole.js";

const router = Router();

router.get("/all", auth, getAllProducts);
router.get("/search", auth, searchProduct);
router.get("/:id", auth, validateObjectId, getProduct);

router.post(
  "/",
  auth,
  requireRole("admin"),
  validateProduct,
  checkDuplicateProduct,
  addProduct,
);
router.patch(
  "/:id/stock",
  auth,
  requireRole("admin", "manager"),
  validateObjectId,
  validateStockAmount,
  updateStock,
);
router.put(
  "/:id",
  auth,
  requireRole("admin"),
  validateObjectId,
  checkDuplicateProductOnUpdate,
  validateProduct,
  updateProduct,
);
router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  validateObjectId,
  deleteProduct,
);

export default router;
