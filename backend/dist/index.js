"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_repo_1 = require("./db_repo"); // Import your DB class from the file you've defined
const cors_1 = __importDefault(require("cors"));
// Create an instance of DB
const db = new db_repo_1.DB();
// Create Express app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Middleware for parsing JSON bodies
app.use(body_parser_1.default.json());
// Define routes
// Create a new user
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const newUser = yield db.createUser(name, email);
        res.json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}));
// Add a session to a user
app.post('/user/:userId/session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const { session } = req.body;
        const newSession = yield db.addSession(userId, session);
        res.json(newSession);
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding session to user' });
    }
}));
app.post('/session/:sessionId/change', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionId = parseInt(req.params.sessionId);
        const { change } = req.body;
        const newChange = yield db.addChange(sessionId, change);
        res.json(newChange);
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding change to session' });
    }
}));
app.get('/session/:sessionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionId = parseInt(req.params.sessionId);
        const session = yield db.getSession(sessionId);
        res.json(session);
    }
    catch (error) {
        res.status(500).json({ error: 'Error retrieving session' });
    }
}));
app.get('/user/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const user = yield db.getUser(username);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error retrieving user' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
