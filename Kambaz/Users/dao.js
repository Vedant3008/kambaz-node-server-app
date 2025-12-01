import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (user) => {
  const newUser = { ...user, _id: uuidv4() };
  return await model.create(newUser);
};

export const findAllUsers = async () => await model.find();
export const findUserById = async (userId) => await model.findById(userId);
export const findUserByUsername = async (username) => 
  await model.findOne({ username: username });
export const findUserByCredentials = async (username, password) => 
  await model.findOne({ username, password });
export const updateUser = async (userId, user) => {
  await model.updateOne({ _id: userId }, { $set: user });
  return await model.findById(userId);
};
export const deleteUser = async (userId) => await model.deleteOne({ _id: userId });

// Add these new functions for filtering
export const findUsersByRole = async (role) => {
  return await model.find({ role: role });
};

export const findUsersByPartialName = async (partialName) => {
  const regex = new RegExp(partialName, "i");
  return await model.find({
    $or: [
      { firstName: { $regex: regex } },
      { lastName: { $regex: regex } }
    ]
  });
};