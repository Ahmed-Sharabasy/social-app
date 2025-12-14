import mongoose from "mongoose";
import dotenv from "dotenv";  
import app from "./app.js";


dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log("db is connected suc");
});


app.listen(3000, () => {
  console.log(`Server Is Running on port ${3000}`);
});
