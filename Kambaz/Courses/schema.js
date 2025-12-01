import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    _id: String,
    name: { type: String, required: true },
    number: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    department: String,
    credits: Number,
    description: String
  },
  { collection: "courses" }
);

export default courseSchema;