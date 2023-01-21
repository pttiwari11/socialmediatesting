
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        userName: {
            type: String,
        },
        followers: [],
        following: [],
    }
)

const UserModel = mongoose.model("users", UserSchema);
export default UserModel

