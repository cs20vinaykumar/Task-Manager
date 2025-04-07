import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      default: "",
    },

    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNo: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("User", userSchema);

export default userModel;
