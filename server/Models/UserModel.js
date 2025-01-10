import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber: {
    type: String, // أو Number إذا كنت تفضل تخزينه كرقم
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "logo.png",
  },
  userType: {
    type: String,
    default: "user",
  },
});

const UserModel = mongoose.model("userinfos", UserSchema);

export default UserModel;
