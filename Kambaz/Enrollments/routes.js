import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const success = dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json({ success });
  };

  const checkEnrollment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrolled = dao.isUserEnrolled(currentUser._id, courseId);
    res.json({ enrolled });
  };

  app.post("/api/enrollments/:courseId", enrollInCourse);
  app.delete("/api/enrollments/:courseId", unenrollFromCourse);
  app.get("/api/enrollments/:courseId/check", checkEnrollment);
}