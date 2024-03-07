import express, { Request, Response } from 'express';
import { Change } from '@prisma/client';
import { DB } from './db_repo';


const app = express();
const db_repo = new DB();

app.use(express.json());

app.post("/user",async (req: Request, res: Response) => {
    const {name, email} = req.body
    
    try {
        const user = await db_repo.createUser(name, email)
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
        const user = await db_repo.getUser(username)
        return user
    } catch (error) {
        
    }
});

app.post('tabs/change',async (req: Request, res: Response) => {
  const { username,change, tab_session_name }:{username: string,change: Change, tab_session_name: string} = req.body;
        


  try {
    
  } catch (e) {
    console.log(e)
  }

  return res.status(200).json({
    
  });
});

app.post("/tabs/new_session", (req, res) => {

  return res.status(200).json()
})

app.get("/tabs/session", (req, res) => {
  try {
  } catch (error){
  console.log(error)
    
  }
})


const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
