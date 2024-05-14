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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DB {
    createUser(name_1) {
        return __awaiter(this, arguments, void 0, function* (name, email = null) {
            try {
                const newUser = yield prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                        is_premium: false,
                        sessions: {
                            create: [],
                        },
                    },
                });
                return newUser;
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw error;
            }
        });
    }
    addSession(userId, session) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create the baseSnapshot using the provided baseSnapshot
                const new_baseSnapshot = yield prisma.snapshot.create({
                    data: {
                        tabs: {
                            create: session.baseSnapshot.tabs,
                        },
                    },
                });
                // Create the session and connect it to the baseSnapshot
                const newSession = yield prisma.session.create({
                    data: {
                        creation_date: new Date(),
                        baseSnapshot: { connect: { id: new_baseSnapshot.id } },
                        user: { connect: { id: userId } },
                    },
                });
                return newSession;
            }
            catch (error) {
                console.error("Error adding session to user:", error);
                throw error;
            }
        });
    }
    addChange(sessionId, change) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create the session if it doesn't exist
                let session = yield prisma.session.findFirst({
                    where: {
                        id: sessionId,
                    },
                });
                if (!session) {
                    return;
                }
                const tab = yield prisma.tab.create({
                    data: {
                        tab_id_given_from_chrome_api: change.tab.tab_id_given_from_chrome_api,
                        url: change.tab.url,
                        title: change.tab.title,
                    },
                });
                // Create the change
                const newChange = yield prisma.change.create({
                    data: {
                        type_of_change: change.type_of_change,
                        tabId: tab.id,
                        sessionId: session.id,
                    },
                });
                return newChange;
            }
            catch (error) {
                console.error("Error adding change:", error);
                throw error;
            }
        });
    }
    /*
  
   the sessionId is Global so every sessionId is unique to the overall sessions table and not relative
  
  */
    getSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = prisma.session.findFirst({
                where: {
                    id: sessionId,
                },
                include: {
                    baseSnapshot: {
                        include: {
                            tabs: true,
                        },
                    },
                    changes: true,
                },
            });
            return session;
        });
    }
    getUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({
                    where: {
                        name: username,
                    },
                    include: {
                        sessions: {
                            include: {
                                baseSnapshot: {
                                    include: {
                                        tabs: true,
                                    },
                                },
                                changes: true,
                            },
                        },
                    },
                });
                return user;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    }
}
exports.DB = DB;
const db = new DB();
