const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {

        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts
            }
            catch(err) {
                throw new Error(err); 
            }
        },

        async getPost(_, { postId}) {
            try {
                const post = await Post.findById(postId);
                if(post) {
                    return post;
                } else {
                    throw new Error('Post does not exist');
                }
            }
            catch(err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {

        async createPost(_, { body }, context) {
            const user = checkAuth(context);

            const newPost = new Post({
                body,
                user: user.id,
                userName: user.userName,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        },

        async deletePost(_, { postId }, context ) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);

                if(user.userName === post.userName) {
                    await post.delete();
                    return "Post successfully deleted"
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            }
            catch(err) {
                throw new Error(err);
            };
        },

        async likePost(_, { postId }, context) {
            const { userName } = checkAuth(context);

            const post = await Post.findById(postId);

            if(post) {
                if(post.likes.find(like => like.userName === userName)) {
                    // unlike post
                    post.likes = post.likes.filter(like => like.userName !== userName);
                }
                else {
                    //like post
                    post.likes.push({
                        userName,
                        createdAt: new Date().toISOString()

                    });
                }
                await post.save();
                return post;
            }
            else {
                throw new UserInputError('Post not found');
            }

        }

    
    }
}