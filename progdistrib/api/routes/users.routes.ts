import express, { Request, Response } from 'express';
import {getUser, getOneUser, updateUser, deleteUser} from '../controllers/users.controller';
const app = express()
app.use(express.json()); 

app.get('/utilisateurs',(req : Request, res :Response) => {
  getUser(req,res);
});

app.get('/utilisateur/:id',(req : Request, res :Response) => {
  getOneUser(req,res);
});

app.put('/utilisateur/:id', (req: Request, res: Response) => {
  updateUser(req, res);
});

app.delete('/utilisateur/:id', (req: Request, res: Response) => {
  deleteUser(req, res);
});


export default app;