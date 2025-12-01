import mongoose from "mongoose";
import * as dao from "./Kambaz/Users/dao.js";

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/kambaz";

async function testUsers() {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("✅ Connected to MongoDB");
    
    // Test finding all users
    const users = await dao.findAllUsers();
    console.log(`Found ${users.length} users in database`);
    
    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

testUsers();