import Post from "../models/postsModel.js";
import appError from "../utils/AppError.js";
import User from "../models/usersModel.js";

// get all post function
export const getAllPosts = async (req, res, next) => {
  //get all posts from DB
  const posts = await Post.find();

  res.status(200).json({
    data: { posts },
    status: "success",
  });
};

export const getPostById = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new appError("Post not found", 404));
  }

  res.status(200).json({
    data: { post },
    status: "success",
  });
};

export const createPost = async (req, res, next) => {
  // get data from req.body
  const { content, userId } = req.body;
  // check if user exists in db
  const user = await User.findById(userId);
  if (!user) {
    return next(new appError("User not found", 404));
  }
  // create new post
  const newPost = await Post.create({
    content,
    userId: user._id,
  });
  res.status(201).json({
    data: { post: newPost },
    status: "success",
  });
};

// Toggle like on a post
export const toggleLikePost = async (req, res, next) => {
  // get postId and userId from req.body
  const { postId, userId } = req.body;
  // check if post and user exists
  const user = await User.findById(userId);
  const post = await Post.findById(postId);
  if (!user || !post) {
    return next(new appError("User or Post not found", 404));
  }
  // insta : you can like your post so we dont check if userId === post.userId
  // check if like already exists
  // loop through post.likes to find if userId exists
  // return -1 if not found
  const existingLikeIndex = post.likes.findIndex(
    (like) => like.userId.toString() === userId,
  );
  if (existingLikeIndex !== -1) {
    // if exists remove like else add like
    // return the index of the like  example 0 → first element , 2 → third element
    post.likes.splice(existingLikeIndex, 1);
  } else {
    // Add like
    post.likes.push({ userId });
  }
  await post.save();

  // return response with message liked or unliked
  res.status(200).json({
    data: { message: existingLikeIndex !== -1 ? "Unlike" : "Liked" },
    status: "success",
  });
};

// delete post by id
export const deletePostById = async (req, res, next) => {
  // find post
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new appError("Post not found", 404));
  }

  // check if user is the owner of the post
  if (post.userId.toString() !== req.body.userId) {
    return next(
      new appError("You are not authorized to delete this post", 403),
    );
  }

  // delete post
  await post.deleteOne();

  res.status(204).end();
};
