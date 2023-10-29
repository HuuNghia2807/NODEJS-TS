import express from "express";
import { deleteUser, getAllUser } from "../controllers/users";
import { isOwner, isAuthenticated } from "../middleware";

export const router = express.Router();

router.get("/", isAuthenticated, getAllUser);
router.delete("/:id", isAuthenticated, isOwner, deleteUser);
