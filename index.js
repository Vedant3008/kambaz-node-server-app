import express from "express";
import cors from "cors";
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose";
import UserRoutes from "./Kambaz/Users/routes.js";
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

// Connect to MongoDB
const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: process.env.SERVER_ENV === "production" ? "none" : "lax",
    secure: process.env.SERVER_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
};

if (process.env.SERVER_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(session(sessionOptions));
app.use(express.json());

// Note: No more 'db' parameter needed for routes
UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentsRoutes(app);
EnrollmentRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000, () => console.log('✅ Server running on port 4000'));