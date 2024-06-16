import PostModel from "./post.model.js";

export default class PostController{
    getAllposts(req, res){
        const result = PostModel.getAllPosts();
        if(result.length){
            res.status(200).send(result);
        } else {
            res.status(404).send("There are no posts");
        }
    }

    getPostById(req, res){
        const {id} = req.params;
        const post = PostModel.getPostById(id);
        if(post){
            return res.status(200).send(post);
        } else {
            return res.status(404).send("Post does not exist");
        }
    }

    getUserPosts(req, res){
        const userId = req.userId
        const result = PostModel.getUserPosts(userId);
        if(result.length){
            res.status(200).send(result);
        } else {
            res.status(404).send("No posts created by this user");
        }
    }

    createPost(req, res){
        const userId = req.userId;
        const {caption} = req.body;
        console.log(caption, userId, req.file.filename);
        const result = PostModel.createPost({
            userId, 
            caption, 
            imageUrl:req.file.filename
        });        
        console.log(result);
        return res.status(201).send(result);
    }

    updatePostById(req, res){
        try{
            const userId = req.userId;
            const {postId} = req.params;
            const {caption} = req.body;
            const result = PostModel.updatePost({ postId, userId, caption, imageUrl:req.file.filename });
            return res.status(201).send(result);
        } catch (err){
            return res.status(400).send(err.message);
        }
    }

    deletePostById(req, res){
        console.log(req);
        try{
            const userId = req.userId;
            const {postId} = req.params;
            console.log(userId, postId);
            const result = PostModel.deletePost({postId, userId});
            return res.status(200).send("Post deleted");
        } catch (err){
            return res.status(404).send(err.message)
        }
    }

}

