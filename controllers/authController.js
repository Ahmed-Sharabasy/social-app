import User from "../models/usersModel.js";
// email password name and avatar
export const signUp = async (req, res, next) => {
  const { email, name, password, avatar } = req.body;
  console.log(email, name, password, avatar);

  const newUser = await User.create({
    email,
    name,
    password,
    avatar,
  });

  res.status(200).json({
    data: {
      newUser,
    },
  });
};
