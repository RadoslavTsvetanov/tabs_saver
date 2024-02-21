import express, { Request, Response } from 'express';
import { DbRepo } from './db_repo';
const app = express();
const db_repo = new DbRepo();

app.use(express.json());

app.post("/create_user",async (req: Request, res: Response) => {
    const {name, email} = req.body
    
    try {
        const user = await db_repo.createUser(name, email, undefined, undefined)
        if (user == null || user == undefined) {
            return res.status(500).json("error creating user")
        }
        return res.status(200).json(user)
    } catch (error) {
        
    }
})



app.get('/user/:username',async (req: Request, res: Response) => {
  res.status(200).json();
    const username = req.params.username
    try {
        const user = await db_repo.getUserByName(username)
        return user
    } catch (error) {
        
    }
});

app.post('/change_tabs',async (req: Request, res: Response) => {
    const { username, change } = req.body;

    try {
        const updated_user = await db_repo.addChangeToUser(username, change)
    } catch (err) { }

  res.status(200).json({
    
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
