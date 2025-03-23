// src/routes/user.ts

import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

const router = Router();

/**
 * 👤 Alice - User Creation
 * ------------------------
 * Route: POST /
 * Description: Creates a new user and saves it to the database.
 */
router.post("/", async (req, res) => {
  const userRepo = getRepository(User);
  const newUser = userRepo.create(req.body); // Automatically maps the request body to the User entity
  const result = await userRepo.save(newUser); // Saves to database
  res.json(result); // Returns the created user
});

/**
 * ❌ Bob - User Deletion
 * ----------------------
 * Route: DELETE /:id
 * Description: Deletes a user by ID.
 */
router.delete("/:id", async (req, res) => {
  const userRepo = getRepository(User);
  const result = await userRepo.delete(req.params.id); // Deletes user by ID
  res.json(result); // Returns delete result
});

/**
 * 📃 Carol - User Listing and Retrieval
 * -------------------------------------
 * Route: GET /
 * Description: Lists all users.
 */
router.get("/", async (_req, res) => {
  const userRepo = getRepository(User);
  const users = await userRepo.find(); // Gets all users
  res.json(users); // Returns user list
});

/**
 * 📄 Carol - Get Single User
 * --------------------------
 * Route: GET /:id
 * Description: Gets a single user by ID.
 */
router.get("/:id", async (req, res) => {
  const userRepo = getRepository(User);
  const user = await userRepo.findOneBy({ id: parseInt(req.params.id) });
  if (user) res.json(user); // Found user
  else res.status(404).json({ message: "User not found" }); // User not found
});

export default router;
