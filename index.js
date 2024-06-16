import cors from "cors"
import swagger from "swagger-ui-express"
import express from "express";

import userRouter from "./src/features/users/user.routes.js";
import postRouter from "./src/features/posts/post.routes.js";
import likeRouter from "./src/features/likes/like.routes.js";
import commentRouter from "./src/features/comments/comment.routes.js";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";
import swaggerDoc from "./swagger.json" assert {type:"json"};

const server = express();
server.use(cors());

server.use(express.json())

server.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc))
// swagger.serve returns handlers for serving Swagger UI files.
// swagger.setup function creates a middleware function that returns the pre-generated HTML file for the Swagger UI page.

server.use('/api/users', userRouter);
server.use('/api/posts', jwtAuth, postRouter);
server.use('/api/comments', jwtAuth, commentRouter);
server.use('/api/likes', likeRouter);

server.use('/', (req, res) => {
    res.send("Welcome to postaway API. Get API for your next social media website. Explore api docs on localhost:3200/api-docs");
});

server.listen(3200, () => {
    console.log('server is listening on port 3200');
})
