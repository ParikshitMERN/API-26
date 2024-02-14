const { string } = require("joi");
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  stName: String,
  lat: Number,
  long: Number,
  wardNo: Number,
  ruralDev: String,
  district: String,
  State: String,
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    otp: String,
    forgetToken: String,
    expiryTime: Date,
    authtoken: String,
    image: String,
    address: {
      shipping: addressSchema,
      billing: addressSchema,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "seller", "customer"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", //name of the model
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", //name of the model
      default: null,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const UserModel = mongoose.model("User", UserSchema); //generates users table automatically
module.exports = UserModel;
