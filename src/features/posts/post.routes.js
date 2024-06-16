import express from "express";
import PostController from "./post.controller.js";
import {upload} from "../../middlewares/fileupload.middleware.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.get('/all', postController.getAllposts);
postRouter.get('/:id', postController.getPostById);
postRouter.get('/', postController.getUserPosts);

// All three req above are woking fine.
postRouter.post('/', upload.single('image'), postController.createPost);
postRouter.delete('/:postId', postController.deletePostById);
postRouter.put('/:postId', upload.single('image'), postController.updatePostById);

export default postRouter;

