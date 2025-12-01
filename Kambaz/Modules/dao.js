import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findModulesForCourse = async (courseId) => {
  return await model.find({ course: courseId });
};

export const createModule = async (module) => {
  const newModule = { ...module, _id: uuidv4() };
  return await model.create(newModule);
};

export const deleteModule = async (moduleId) => {
  await model.deleteOne({ _id: moduleId });
};

export const updateModule = async (moduleId, moduleUpdates) => {
  await model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
  return await model.findById(moduleId);
};