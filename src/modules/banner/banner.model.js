const { string } = require("joi");
const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
    },
    image: {
      type: String,
      required: true,
    },
    link: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Banner", //name of the model
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Banner", //name of the model
      default: null,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const BannerModel = mongoose.model("Banner", BannerSchema);
module.exports = BannerModel;
