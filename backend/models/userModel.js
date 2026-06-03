import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String },
  googleId: { type: String, required: true, unique: true }
});

const User = mongoose.model("User", userSchema);
export default User;
