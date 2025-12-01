import * as dao from "./dao.js";

export default function CourseRoutes(app) {  
  
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/users/current/courses", async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.status(401).json({ error: "Not logged in" });
      }
      
      if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
        const courses = await dao.findAllCourses();
        return res.json(courses);
      }
      
      const courses = await dao.findCoursesForEnrolledUser(currentUser._id);
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/users/:userId/courses", async (req, res) => {
    try {
      const { userId } = req.params;
      const courses = await dao.findCoursesForEnrolledUser(userId);
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      await dao.deleteCourse(courseId);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await dao.updateCourse(courseId, req.body);
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/users/current/courses", async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser || currentUser.role !== "FACULTY") {
        return res.status(403).json({ error: "Only faculty can create courses" });
      }
      
      const course = await dao.createCourse(req.body);
      
      await enrollmentDao.enrollUserInCourse(currentUser._id, course._id);
      
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}