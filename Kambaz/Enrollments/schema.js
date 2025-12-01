import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    _id: String,
    user: { type: String, ref: 'UserModel', required: true },
    course: { type: String, ref: 'CourseModel', required: true }
  },
  { collection: "enrollments" }
);

export default enrollmentSchema;