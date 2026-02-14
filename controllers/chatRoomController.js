import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";
import ChatRoom from "../models/chatRoomsModel.js";

// ? todo todo first 14/2/2026
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
  //promese all users to get those data from the database
  const { participantId } = req.body;
  // cheack if the chat room already exists between the two users
  // const room = await ChatRoom.findOne({
  //   participants: { $all: [user._id, participantId] },
  // });

  console.log(room);
  // if not, create a new chat room and save it to the database

  // return the chat room data to the client

  res.status(200).json({ message: "Chat room created successfully" });
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
