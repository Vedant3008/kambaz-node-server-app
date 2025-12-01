import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {  // No more 'db' parameter
  
  app.post("/api/users/:userId/courses/:courseId", async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      const enrollment = await dao.enrollUserInCourse(userId, courseId);
      res.json(enrollment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/users/:userId/courses/:courseId", async (req, res) => {
    try {
      const { userId, courseId } = req.params;
      const success = await dao.unenrollUserFromCourse(userId, courseId);
      if (success) {
        res.sendStatus(200);
      } else {
        res.status(404).json({ error: "Enrollment not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/users/:userId/enrolled", async (req, res) => {
    try {
      const { userId } = req.params;
      const enrollments = await dao.findEnrollmentsForUser(userId);
      res.json(enrollments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}