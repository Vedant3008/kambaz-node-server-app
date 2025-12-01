import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const enrollUserInCourse = async (userId, courseId) => {
  const existing = await model.findOne({ user: userId, course: courseId });
  if (existing) return existing;
  
  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId
  };
  return await model.create(newEnrollment);
};

export const unenrollUserFromCourse = async (userId, courseId) => {
  const result = await model.deleteOne({ user: userId, course: courseId });
  return result.deletedCount > 0;
};

export const isUserEnrolled = async (userId, courseId) => {
  const enrollment = await model.findOne({ user: userId, course: courseId });
  return !!enrollment;
};

export const findEnrollmentsForUser = async (userId) => {
  return await model.find({ user: userId });
};