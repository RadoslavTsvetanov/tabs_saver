import { PrismaClient, Snapshot } from '@prisma/client';

const prisma = new PrismaClient();

export class DB {
    async createUser(name: string, email: string | null = null) {
        try {
            const newUser = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    is_premium: false,
                    sessions: {
                        create: []
                    }
                }
            });
            return newUser;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async addSession(userId: number, session: { creation_date: Date, BaseSnapshotData: { tabs: { tab_id_given_from_chrome_api: number, url: string, title: string }[] } }) {
        try {
            // Create the baseSnapshot using the provided BaseSnapshotData
            const baseSnapshot = await prisma.snapshot.create({
                data: {
                    tabs: {
                        create: session.BaseSnapshotData.tabs
                    }
                }
            });

            // Create the session and connect it to the baseSnapshot
            const newSession = await prisma.session.create({
                data: {
                    creation_date: new Date(),
                    baseSnapshot: { connect: { id: baseSnapshot.id } },
                    user: { connect: { id: userId } }
                }
            });

            return newSession;
        } catch (error) {
            console.error("Error adding session to user:", error);
            throw error;
        }
    }
}


const db = new DB();
