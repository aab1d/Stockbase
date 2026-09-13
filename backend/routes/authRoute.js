import { Router } from "express";
import { loginUser, registerUser } from "../controller/userController.js";
import validateUser from "../middlewares/validateUser.js";
import validateLogin from "../middlewares/validateLogin.js";
import checkDuplicateUser from "../middlewares/checkDuplicateUser.js";
import auth from "../middlewares/auth.js";
import User from "../models/User.js";

const router = Router();

router.post("/register", validateUser, checkDuplicateUser, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

export default router;
