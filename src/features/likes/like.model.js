export default class LikeModel{
    constructor(likeId, userId, postId){
        this.likeId = likeId,
        this.userId = userId,
        this.postId = postId
    }

    static getLikes(postId){ // get all likes on a specific post
        return likes.filter((obj) => obj.postId == postId);
    }

    static toggleLike({postId, userId}){
        const index = likes.findIndex((like) => like.postId == postId && like.userId == userId);
        if(index != -1){    // remove like
            likes.splice(index, 1);
        } else {   // add like
            const id = new Date().toISOString();
            const like = new LikeModel(id, userId, postId);
            likes.push(like);
        }
    }
}

let likes = [
    new LikeModel(402, 101, 201),
    new LikeModel(403, 101, 202),
    new LikeModel(401, 102, 201),
    new LikeModel(404, 102, 202)
]