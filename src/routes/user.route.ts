import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

// path: http://localhost:3000/api/vi/users

//! router.use(verifyToken); // This will protect all routes below

// Get all users
router.get("/", verifyToken, userController.getAllUsers);

// Get a user by id
router.get("/:id", userController.getUser);

// Create a new user
router.post("/", userController.createUser);

// Update a user
router.put("/:id", userController.updateUser);

// Delete a user
router.delete("/:id", userController.deleteUser);

export default router;
