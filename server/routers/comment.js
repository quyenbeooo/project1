import express from "express";
import CommentController from "../controllers/CommentController.js";
import authenticate from "../Middleware/authenticate.js"; // Middleware để xác thực
const CommentRouter = express.Router();

const commentController = new CommentController();

CommentRouter.post("/comment", authenticate, commentController.createComment);
CommentRouter.get("/:productId", commentController.getComments);
export default CommentRouter;
