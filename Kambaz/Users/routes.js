import * as dao from "./dao.js";

export default function UserRoutes(app) {
  
  // Get all users with optional filtering
  const findAllUsers = async (req, res) => {
    try {
      const { role, name } = req.query;
      
      if (role) {
        const users = await dao.findUsersByRole(role);
        return res.json(users);
      }
      
      if (name) {
        const users = await dao.findUsersByPartialName(name);
        return res.json(users);
      }
      
      const users = await dao.findAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Get user by ID
  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Create new user
  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Delete user
  const deleteUser = async (req, res) => {
    try {
      await dao.deleteUser(req.params.userId);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Update user
  const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      await dao.updateUser(userId, req.body);
      const updatedUser = await dao.findUserById(userId);
      
      // Update session if current user
      const currentUser = req.session["currentUser"];
      if (currentUser && currentUser._id === userId) {
        req.session["currentUser"] = updatedUser;
      }
      
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Existing routes
  const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const currentUser = await dao.findUserByCredentials(username, password);
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        res.status(401).json({ message: "Unable to login. Try again later." });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  
  // Register all routes
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users", createUser);
  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUser);
  
  app.post("/api/users/signin", signin);
  app.post("/api/users/signup", signup);
  app.post("/api/users/profile", profile);
  app.post("/api/users/signout", signout);
}