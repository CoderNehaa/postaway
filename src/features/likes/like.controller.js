import LikeModel from "./like.model.js";
import PostModel from "../posts/post.model.js";

export default class LikeController{
    getLikes(req, res){ // Retrieve likes on a specific post
        const {postId} = req.params;
        const postExist = PostModel.getPostById(postId);
        if(!postExist){
            return res.status(404).send("Poes does not exist")
        }
        const result = LikeModel.getLikes(postId);
        if(result.length){
            const count = result.length.toString()
            return res.status(200).send(count);
        } else {
            return res.status(400).send("No likes on this post");
        }
    }

    toggleLike(req, res){// toggle likes on a specific post
        try{
            const {postId} = req.params;
            const postExist = PostModel.getPostById(postId);
            if(!postExist){
                return res.status(404).send("Poes does not exist")
            }
            const userId = req.userId;
            LikeModel.toggleLike({postId, userId});
            return res.status(200).send("Like toggled")
        } catch (err){
            return res.status(404).send(err.message)
        }
    }
}