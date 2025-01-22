import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import routeAuth from './routes/auth.routes';
import routeUtilisateur from "./routes/users.routes";
import routeRole from "./routes/roles.route";
import routeAnnonce from "./routes/annonces.routes";
const prisma = new PrismaClient()
const app = express()
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);
const cors = require('cors');

app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Hello, Progdistrib!' });
});

app.use(cors({
  origin:  ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://localhost:8080']
}));


app.use('/', routeAuth)
app.use('/', routeUtilisateur)
app.use('/', routeRole)
app.use('/', routeAnnonce)

// app.get('/api/generate-users', async (req, res) => {
//   try {
//     const users = await seedDatabase();  // Appeler la fonction pour générer les utilisateurs
//     res.status(200).json({ message: "Utilisateurs générés avec succès", users });  // Retourner les utilisateurs générés
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur lors de la création des utilisateurs", error });
//   }
// });

const testDbConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};

testDbConnection().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  }
});

export default app;