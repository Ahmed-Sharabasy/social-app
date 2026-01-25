import Follows from "../models/followersModel.js";
import appError from "../utils/appError.js";

//? POST/users/toggle-follow (follow or unfollow a given user by its id) // شوف الحوار دا
export const followRequest = async (req, res, next) => {
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

  console.log(existingFollow);
  if (existingFollow) {
    return next(new appError("you are already following this user", 400));
  }

  // Create a new follow request
  existingFollow = await Follows.create({
    follower: followerId,
    following: userIdToFollow,
    // status: "pending",
  });

  res.status(200).json({
    status: "success",
    data: existingFollow,
  });
};
