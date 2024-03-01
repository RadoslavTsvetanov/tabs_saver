import mongoose, { Schema, Document, Model } from 'mongoose';
import { User, Session, Change, Tab, Snapshot, changes } from "./models/Users";

// Define the Mongoose schema for Tab
const tabSchema = new Schema<Tab>({
    id: { type: Number, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true }
});

// Define the Mongoose schema for Change
const changeSchema = new Schema<Change>({
    id: { type: Number, required: true },
    type_of_change: { type: String, enum: Object.values(changes), required: true },
    tab: { type: tabSchema, required: true }
});

// Define the Mongoose schema for Snapshot
const snapshotSchema = new Schema<Snapshot>({
    tabs: { type: [tabSchema], required: true }
});

// Define the Mongoose schema for Session
const sessionSchema = new Schema<Session>({
    id: { type: Number, required: true },
    creation_date: { type: Date, required: true },
    baseSnapshot: { type: snapshotSchema, required: true },
    changes: { type: [changeSchema], default: [] }
});

// Define the Mongoose schema for User
const userSchema = new Schema<User>({
    id: { type: Number, required: true },
    is_premium: { type: Boolean, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    sessions: { type: [sessionSchema], default: [] }
});

// Define the Mongoose model for User
const UserModel = mongoose.model('User', userSchema);

// Define the DbRepo class
export class DbRepo {
    constructor() {
        mongoose.connect(process.env.MAIN_DB_URI || "mongodb+srv://rado:rado@task-manager.8d8g6sk.mongodb.net/?retryWrites=true&w=majority")
            .then(() => console.log('Connected to MongoDB'))
            .catch((error) => console.error('Error connecting to MongoDB:', error));
    }

    // Method to create a new user
    async createUser(name: string, email: string, changes: Change[] | undefined): Promise<User | null> {
        try {
            const user = await UserModel.create({ id: 1, is_premium: false, name, email, sessions: [] });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    // Method to get user by name
    async getUserByName(name: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ name }).exec();
            return user;
        } catch (error) {
            console.error('Error getting user by name:', error);
            return null;
        }
    }

    // Method to add change to user
    async addChangeToUser(username: string, change: Change, session_id: number): Promise<User | null> {
        try {
            const user = await UserModel.findOneAndUpdate(
                { name: username, "sessions.id": session_id },
                { $push: { "sessions.$.changes": change } },
                { new: true }
            ).exec();
            return user;
        } catch (error) {
            console.error('Error adding change to user:', error);
            return null;
        }
    }
}
