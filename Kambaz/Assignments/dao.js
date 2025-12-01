import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findAssignmentsForCourse = async (courseId) => {
  return await model.find({ course: courseId });
};

export const createAssignment = async (assignment) => {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return await model.create(newAssignment);
};

export const deleteAssignment = async (assignmentId) => {
  await model.deleteOne({ _id: assignmentId });
};

export const updateAssignment = async (assignmentId, assignmentUpdates) => {
  await model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
  return await model.findById(assignmentId);
};

export const findAssignmentById = async (assignmentId) => {
  return await model.findById(assignmentId);
};