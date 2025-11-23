import express from "express";
import {
  authUser,
  deleteUserProfile,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controller/userController.js";
import { admin, protect } from "../midd/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/logout", logoutUser);
router.post("/auth", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUserProfile)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
