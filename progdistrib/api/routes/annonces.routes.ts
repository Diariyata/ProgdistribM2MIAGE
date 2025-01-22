import express, { Request, Response } from 'express';
import {createAnnonce, getAnnonces, getOneAnnonce, updateAnnonce, deleteAnnonce, getAnnoncesUser} from '../controllers/annonces.controller';
import verifyToken from '../middleware/verifytoken'
const app = express()

app.use(express.json());

app.post('/annonce', verifyToken, (req: Request, res: Response) => {
    createAnnonce(req, res);
  });
  
  app.get('/annonces', (req: Request, res: Response) => {
    getAnnonces(req, res);
  });

  app.get('/annonce/:id', (req: Request, res: Response) => {
    getOneAnnonce(req, res);
  });
  
  app.put('/annonce/:id', (req: Request, res: Response) => {
    updateAnnonce(req, res);
  });
  
  app.delete('/annonce/:id', (req: Request, res: Response) => {
    deleteAnnonce(req, res);
  });

  app.get('/userAds/:id', (req: Request, res: Response) => {
    getAnnoncesUser(req, res)
  });

  export default app;