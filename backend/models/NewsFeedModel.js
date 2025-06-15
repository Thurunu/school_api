import mongoose from "mongoose";

const newsFeedSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


const NewsFeed = mongoose.model("NewsFeed", newsFeedSchema);
export default NewsFeed;