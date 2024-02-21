import * as models from "./models/Users";
import mongoose, { Schema, Document, Model } from 'mongoose';


// Define the Mongoose schema for User
const userSchema = new Schema<models.User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    base_snapshot: {
        tabs: [{ url: String, id: Number, title: String }]
    },
    changes: [{
        tab: { url: String, id: Number, title: String },
        type_of_change: Number
    }]
});

// Define the Mongoose model for User
const UserModel: Model<models.User> = mongoose.model('User', userSchema);

// Define the DbRepo class
export class DbRepo {
    constructor() {
        mongoose.connect(process.env.MAIN_DB_URI || "mongodb+srv://rado:rado@task-manager.8d8g6sk.mongodb.net/?retryWrites=true&w=majority")
            .then(() => console.log('Connected to MongoDB'))
            .catch((error) => console.error('Error connecting to MongoDB:', error));
    }

    // Method to create a new user
    async createUser(name: string, email: string, baseSnapshot: models.Snapshot | undefined, changes: models.Change[] | undefined): Promise<models.User> {
        try {
            const newUser = await UserModel.create({ name, email, base_snapshot: baseSnapshot || null, changes:changes ||  []});
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }


    async getUserByName(name: string): Promise<models.User | null> {
        try {
            const user = await UserModel.findOne({ name }).exec();
            return user;
        } catch (error) {
            console.error('Error getting user by name:', error);
            throw error;
        }
    }

    async getUserTabsHistory(name: string){
        try {
            const user = await this.getUserByName(name);
            if (user == null) {
                return null
            } else {
                return {
                    base_snapshot: user.base_snapshot,
                    changes: user.changes
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    async addChangeToUser(name: string, change: models.Change): Promise<models.User | null> {
        try {
            const user = await UserModel.findOneAndUpdate(
                { name },
                { $push: { changes: change } },
                { new: true }
            ).exec();
            return user;
        } catch (error) {
            console.error('Error adding change to user:', error);
            throw error;
        }
    }
    // Method to retrieve a user by email
    
} 