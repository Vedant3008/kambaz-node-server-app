import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";

console.log("Attempting to connect to:", CONNECTION_STRING);

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    console.log("Database: kambaz");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err.message);
  });