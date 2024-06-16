import CommentModel from "./comment.model.js" 
import PostModel from "../posts/post.model.js";

export default class CommentController{
    getComments(req, res){  // Retrieve all comments for a specific post
        const {postId} = req.params
        const result = CommentModel.getPostComment(postId);
        if(result.length){
            return res.status(200).send(result);
        } else {
            return res.status(404).send("This post does not exist");
        }
    }

    createComment(req, res){
        try{
            const {postId} = req.params;
            const postExist = PostModel.getPostById(postId);
            if(!postExist){
                return res.status(400).send("This post does not exist");
            }
            const userId = req.userId;
            const {content} = req.body;
            const result = CommentModel.createComment({postId, userId, content});
            return res.status(200).send(result);
        } catch (err){
            return res.status(404).send(err.message);
        }

    }

    updateComment(req, res){
        try{
            const userId = req.userId;
            const {commentId} = req.params;
            const {content} = req.body;
            if(!content){
                return res.status(400).send("Comment can not be empty");
            }
            const result = CommentModel.updateComment({commentId, userId, content});
            return res.status(200).send(result);
        } catch (e){
            return res.status(404).send(e.message)
        }
    }

    deleteComment(req, res){
        try{
            const userId = req.userId;
            const {commentId} = req.params;
            const result = CommentModel.deleteComment({commentId, userId});
            return res.status(200).send(result);
        } catch (e){
            return res.status(404).send(e.message)
        }
    }
}

