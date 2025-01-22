import express, { Request, Response } from 'express';
import {createRole, getRoles, updateRole, deleteRole } from '../controllers/roles.controller';
const app = express()

app.use(express.json());
app.post('/role', (req: Request, res: Response) => {
    createRole(req, res);
  });
  app.get('/roles', (req: Request, res: Response) => {
    getRoles(req, res);
  });
  app.put('/roles/:id', (req: Request, res: Response) => {
    updateRole(req, res);
  });
  app.delete('/roles/:id', (req: Request, res: Response) => {
    deleteRole(req, res);
  });
  export default app;
  