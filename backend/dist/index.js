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
const express_1 = __importDefault(require("express"));
const db_repo_1 = require("./db_repo");
const app = (0, express_1.default)();
const db_repo = new db_repo_1.DB();
app.use(express_1.default.json());
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const user = yield db_repo.createUser(name, email);
        if (user == null || user == undefined) {
            return res.status(500).json("error creating user");
        }
        return res.status(200).json(user);
    }
    catch (error) {
    }
}));
app.get('/user/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json();
    const username = req.params.username;
    try {
        const user = yield db_repo.getUser(username);
        return user;
    }
    catch (error) {
    }
}));
app.post('tabs/change', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, change, tab_session_name } = req.body;
    try {
    }
    catch (e) {
        console.log(e);
    }
    return res.status(200).json({});
}));
app.post("/tabs/new_session", (req, res) => {
    return res.status(200).json();
});
app.get("/tabs/session", (req, res) => {
    try {
    }
    catch (error) {
        console.log(error);
    }
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
