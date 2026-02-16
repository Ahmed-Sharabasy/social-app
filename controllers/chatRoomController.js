import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";
import ChatRoom from "../models/chatRoomsModel.js";
import mongoose from "mongoose";

// ? todo todo first 14/2/2026
// for index.js socket
export const findOrCreateChatRoom = async (userId1, userId2) => {
  let room;
  room = await ChatRoom.findOne({
    participants: { $all: [userId1, userId2] },
  });
  if (room) return room;

  // if not, create a new chat room and save it to the database

  room = await ChatRoom.create({
    participants: [userId1, userId2],
  });

  return room;
};
export const createRoom = async (req, res) => {
  // console.log ( jwt token)
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Unauthorized please login first" });
  }
  const decoded = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET,
  );
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "cant find user you sign up" });
  }

  // check the data sent by the client

  const { participantId } = req.body;

  // cheack if the chat room already exists between the two users

  // console.log(otherUserId);
  console.log(user._id);

  const room = await ChatRoom.findOne({
    participants: { $all: [user._id, participantId] },
  });
  if (room) {
    return res
      .status(200)
      .json({ ChatRoom: room, message: "Chat room already exists" });
  }

  // if not, create a new chat room and save it to the database

  const newChatRoom = await ChatRoom.create({
    participants: [user._id, req.body.participantId],
  });

  res
    .status(200)
    .json({ ChatRoom: newChatRoom, message: "Chat room created successfully" });
};

export const getUserChatRooms = async (req, res) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Unauthorized please login first" });
  }
  const decoded = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET,
  );
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ message: "cant find user you sign up" });
  }
  const chatRooms = await ChatRoom.find({ participants: user._id });
  res.status(200).json({ chatRooms });
};

export const getRoomMessages = async (req, res) => {
  const messages = await ChatMessage.find({
    chatRoom: req.params.roomId,
  }).populate({
    path: "sender",
    select: "username email avatar",
  });
  res.status(200).json({ messages });
};

// todo later!: create chat room between two or more users, and save it to the database
// export const createRoombettwensomeusers = async (req, res) => {
//   // console.log ( jwt token)
//   if (
//     !req.headers.authorization ||
//     !req.headers.authorization.startsWith("Bearer")
//   ) {
//     return res.status(401).json({ message: "Unauthorized please login first" });
//   }
//   const decoded = jwt.verify(
//     req.headers.authorization.split(" ")[1],
//     process.env.JWT_SECRET,
//   );
//   const user = await User.findById(decoded.id);
//   if (!user) {
//     return res.status(401).json({ message: "cant find user you sign up" });
//   }

//   // check the data sent by the client
//   //promese all users to get those data from the database
//   const { participantId } = req.body;
//   console.log(participantId);
//   // get all users data from the database using the ids sent by the client
//   const ids = req.body.participantId.map((p) => p.user);

//   const users = await Promise.all(
//     ids.map((id) =>
//       User.findOne({
//         _id: id,
//         isVerified: "true",
//       }),
//     ),
//   );

//   console.log(ids, users);

//   // cheack if the chat room already exists between the two users
//   // if not, create a new chat room and save it to the database

//   // return the chat room data to the client

//   res.status(200).json({ message: "Chat room created successfully" });
// };
