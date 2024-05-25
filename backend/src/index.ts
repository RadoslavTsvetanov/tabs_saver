// Import necessary modules
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { DB, IDB } from "./db_repo"; // Import your DB class from the file you've defined
import cors from "cors";
// Create an instance of DB
const db: IDB = new DB();

// Create Express app
const app = express();
app.use(cors());
// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Define routes

// Create a new user
app.post("/user", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newUser = await db.createUser(name, email);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Add a session to a user
app.post("/user/:userId/session", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const { session } = req.body;
    const newSession = await db.addSession(userId, session);
    res.json(newSession);
  } catch (error) {
    res.status(500).json({ error: "Error adding session to user" });
  }
});

app.post("/session/:sessionId/change", async (req: Request, res: Response) => {
  try {
    const sessionId = parseInt(req.params.sessionId);
    const { change } = req.body;
    const newChange = await db.addChange(sessionId, change);
    res.json(newChange);
  } catch (error) {
    res.status(500).json({ error: "Error adding change to session" });
  }
});

app.get("/session/:sessionId", async (req: Request, res: Response) => {
  try {
    const sessionId = parseInt(req.params.sessionId);
    const session = await db.getSession(sessionId);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving session" });
  }
});

app.get("/user/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = await db.getUser(username);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
export default app;
