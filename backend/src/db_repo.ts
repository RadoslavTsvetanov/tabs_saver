import { Change, PrismaClient, Snapshot } from '@prisma/client';

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

async addChange(sessionId: number, change: { type_of_change: string, tab: { tab_id_given_from_chrome_api: number, url: string, title: string }}) {
  try {
    // Create the session if it doesn't exist
    let session = await prisma.session.findFirst({
      where: {
        id: sessionId,
      }
    });

    if (!session) {
      return
    }
    const tab = await prisma.tab.create({
      data: {
          tab_id_given_from_chrome_api: change.tab.tab_id_given_from_chrome_api,
          url: change.tab.url,
          title: change.tab.title
        }
      });

    // Create the change
    const newChange = await prisma.change.create({
      data: {
        type_of_change: change.type_of_change,
        tabId: tab.id,
        sessionId: session.id
      }
    });

    return newChange;
  } catch (error) {
    console.error("Error adding change:", error);
    throw error;
  }
}

  
/*

 the sessionId is Global so every sessionId is unique to the overall sessions table and not relative

*/
  async getSession(sessionId: number) {
    const session = prisma.session.findFirst({
      where: {
        id:sessionId
      },
      include: {
        baseSnapshot: {
          include: {
            tabs: true
          }
        },
        changes: true
      }
    })

    return session;
  }


  async getUser(username: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                name: username
            },
            include: {
                sessions: {
                    include: {
                        baseSnapshot: true,
                        changes: true,
                    }
                },
            }
        });

        return user;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

}


const db = new DB();
