import * as dao from "./dao.js";

export default function AssignmentsRoutes(app) {  // No more 'db' parameter
  
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignment = {
        ...req.body,
        course: courseId,
      };
      const newAssignment = await dao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await dao.findAssignmentById(assignmentId);
      res.json(assignment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await dao.updateAssignment(assignmentId, req.body);
      res.json(assignment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      await dao.deleteAssignment(assignmentId);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}