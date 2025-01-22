import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {deleteUser, getUser, updateUser} from '../controllers/users.controller';
const prisma = new PrismaClient();
const app = express()
app.use(express.json()); 

app.get('/utilisateurs',(req : any, res :any) => {
  getUser(req,res);
});
app.put('/utilisateur/:id', (req: Request, res: Response) => {
  updateUser(req, res);
});
app.delete('/utilisateurs/:id', (req: Request, res: Response) => {
  deleteUser(req, res);
});
export default app;