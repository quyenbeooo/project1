import express from "express";
import {
  getPosts,
  createPosts,
  updatePosts,
  DetailShoe,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", createPosts);

router.get("/:id", DetailShoe);

router.post("/update", updatePosts);

export default router;
