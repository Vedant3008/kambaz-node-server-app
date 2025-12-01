import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./Kambaz/Database/users.js";
import courses from "./Kambaz/Database/courses.js";
import modules from "./Kambaz/Database/modules.js";
import assignments from "./Kambaz/Database/assignments.js";
import enrollments from "./Kambaz/Database/enrollments.js";

dotenv.config();

const CONNECTION_STRING = "mongodb+srv://shahh7107_db_user:C5baVJEjyDuxjp44@kambaz-cluster.epkhoey.mongodb.net/kambaz?retryWrites=true&w=majority";
async function importData() {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("✅ Connected to MongoDB");

    // Import users
    const UserModel = mongoose.model("UserModel");
    await UserModel.deleteMany({});
    await UserModel.insertMany(users);
    console.log(`✅ Imported ${users.length} users`);

    // Import courses
    const CourseModel = mongoose.model("CourseModel");
    await CourseModel.deleteMany({});
    await CourseModel.insertMany(courses);
    console.log(`✅ Imported ${courses.length} courses`);

    // Import modules
    const ModuleModel = mongoose.model("ModuleModel");
    await ModuleModel.deleteMany({});
    await ModuleModel.insertMany(modules);
    console.log(`✅ Imported ${modules.length} modules`);

    // Import assignments
    const AssignmentModel = mongoose.model("AssignmentModel");
    await AssignmentModel.deleteMany({});
    await AssignmentModel.insertMany(assignments);
    console.log(`✅ Imported ${assignments.length} assignments`);

    // Import enrollments
    const EnrollmentModel = mongoose.model("EnrollmentModel");
    await EnrollmentModel.deleteMany({});
    await EnrollmentModel.insertMany(enrollments);
    console.log(`✅ Imported ${enrollments.length} enrollments`);

    console.log("✅ All data imported successfully!");
    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Import error:", err);
  }
}

// Import all models first
import "./Kambaz/Users/model.js";
import "./Kambaz/Courses/model.js";
import "./Kambaz/Modules/model.js";
import "./Kambaz/Assignments/model.js";
import "./Kambaz/Enrollments/model.js";

importData();