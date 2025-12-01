import * as dao from "./dao.js";

export default function ModulesRoutes(app) {  // No more 'db' parameter
  
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await dao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const module = {
        ...req.body,
        course: courseId,
      };
      const newModule = await dao.createModule(module);
      res.json(newModule);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      await dao.deleteModule(moduleId);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const module = await dao.updateModule(moduleId, req.body);
      res.json(module);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}