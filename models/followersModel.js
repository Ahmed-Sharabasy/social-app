import mongoose from "mongoose";

const followersSchema = new mongoose.Schema({
    follower : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    following : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
    
},{timestamps:true})


const Followers = mongoose.model("Followers", followersSchema)
export default Followers