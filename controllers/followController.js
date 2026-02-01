import Follows from "../models/followersModel.js";
import appError from "../utils/AppError.js";

//Done toggle-follow (follow or unfollow a given user by its id)
export const followRequest = async (req, res, next) => {
  let message;
  const { userIdToFollow, followerId } = req.body;

  // ckeck if followerId and userIdToFollow are same IDS
  if (userIdToFollow === followerId) {
    return next(new appError("You cannot follow yourself", 400));
  }

  // Check if a follow relationship already exists
  let existingFollow = await Follows.findOne({
    follower: followerId,
    following: userIdToFollow,
    // status: { $ne: "blocked" },
  });
  if (existingFollow) {
    existingFollow = await Follows.findByIdAndDelete(existingFollow._id);
    message = "unfollowed successfully";
    existingFollow.status = "unfollowed";
    return res.status(200).json({
      status: "success",
      message,
      data: existingFollow,
    });
  }

  // Create a new follow request
  existingFollow = await Follows.create({
    follower: followerId,
    following: userIdToFollow,
    // status: "pending",
  });
  message = "followed successfully";

  res.status(200).json({
    status: "success",
    message,
    data: existingFollow,
  });
};
