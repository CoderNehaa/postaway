export default class PostModel{
    constructor(postId, userId, caption, imageUrl){
        this.postId = postId,
        this.userId = userId,
        this.caption = caption,
        this.imageUrl = imageUrl
    }

    static createPost({userId, caption, imageUrl}){
        const date = new Date();
        const postId = date.toISOString();
        const post = new PostModel(postId, userId, caption, imageUrl);
        posts.push(post);
        return post;
    }

    static getAllPosts(){   // Retrieving all posts
        return posts;
    }

    static getUserPosts(id){    // Retrieving user posts
        const userPosts = posts.filter((post) => post.userId == id);
        return userPosts;
    }

    static getPostById(id){
        return posts.find((post) => post.postId == id);
    }

    static updatePost(obj){
        const index = posts.findIndex((post) => post.postId == obj.postId);
        if(index != -1){
            if(obj.userId == posts[index].userId){
                const newPost = new PostModel(obj.postId, obj.userId, obj.caption, obj.imageUrl)
                posts[index] = newPost;
                return newPost;
            } else {
                throw new Error("This post is not created by the logged in user !!");
            }
        } else {
            throw new Error("Post not found to update !!");
        }
    }

    static deletePost({postId, userId}){
        const index = posts.findIndex((post) => post.postId == postId);
        if(index !== -1){
            if(posts[index].userId == userId){
                const result = posts[index];
                posts.splice(index, 1);
                return result;
            } else {
                throw new Error("This post is not created by the logged in user");
            }
        } else {
            throw new Error("Post does not exist");
        }
    }
    
}


let posts = [
    new PostModel(201, 102, "Sky above, earth below and peace within", "https://images.app.goo.gl/tppRiRo7ChAeC5fV8"),
    new PostModel(202, 102, "Colors are the smile of nature", "https://images.app.goo.gl/oA86CEnAAdmCGYwF7https://images.app.goo.gl/tppRiRo7ChAeC5fV8"),
    new PostModel(203, 101, "An animal's eyes have power to speak a great language", "https://images.app.goo.gl/3wKyePBmm5rSwqsu8")
]

