
export default class CommentModel{
    constructor(commentId, postId, userId, content){
        this.commentId = commentId,
        this.postId = postId,
        this.userId = userId,
        this.content = content
    }

    static createComment({postId, userId, content}){
        const date = new Date();
        const comment = new CommentModel(date.toISOString(), postId, userId, content);
        comments.push(comment);
        return comment;
    }

    static getPostComment(postId){  // getting all comments on a specific post
        const postComments = comments.filter((comment) => comment.postId == postId);
        return postComments;
    }

    static updateComment({commentId, userId, content}){
        const index = comments.findIndex((comment) => comment.commentId == commentId);
        if(index != -1){
            if(comments[index].userId == userId){
                const postId = comments[index].postId;
                const updatedComment = new CommentModel(commentId, postId, userId, content);
                comments[index] = updatedComment;
                return updatedComment;
            } else {
                throw new Error("This comment is not created by the logged in user!!");
            }
        } else {
            throw new Error("Comment not found");
        }
    }

    static deleteComment({commentId, userId}){
        const index = comments.findIndex((comment) => comment.commentId == commentId);
        if(index != -1){
            if(comments[index].userId == userId){
                const comment = comments[index];
                comments.splice(index, 1);
                return comment;
            } else {
                throw new Error("This comment is not created by the logged in user!!");
            }
        } else {
            throw new Error("Comment not found");
        }
    }   
}

let comments = [
    new CommentModel(301, 201, 101, "this caption is amazing"),
    new CommentModel(302, 202, 101, "Guys, i gave vote today at 9 am"),
    new CommentModel(303, 202, 102, "Wow, this image is really beautiful"),
]

