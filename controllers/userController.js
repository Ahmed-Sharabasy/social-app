import multer from "multer";
import AppError from "../utils/AppError.js";
import User from "../models/usersModel.js";

// define multer storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb (error , data(path))  // null ? no error : error
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    const photoExtention = file.mimetype.split("/")[1];
    // name of the photo
    // cb(null, `user-${req.user._id}-${Date.now()}.${photoExtention}`);
    cb(null, `user-${514651651615}-${Date.now()}.${photoExtention}`);
  },
});

// define multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    // this will based to multerStorage.filename cb function
    cb(new AppError("you must upload image", 400), false);
  }
};

// const upload = multer({ dest: "public/img" });
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserAvatar = upload.single("photo");

// update user profile
export const updateMe = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.body.id,
    { avatar: req.file.filename },
    { new: true, runValidators: true },
  );

  const data = req.file; // Multer adds the file info to req.file
  res.status(200).json({
    updatedUser,
    data,
    status: "success",
    message: "User profile updated successfully",
  });
};
