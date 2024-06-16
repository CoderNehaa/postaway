import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get('/:postId', commentController.getComments);
commentRouter.post('/:postId', commentController.createComment);
// While giving postId, i need to check if that postId exist in postmodel

commentRouter.delete('/:commentId', commentController.deleteComment);
commentRouter.put('/:commentId', commentController.updateComment);

export default commentRouter;


