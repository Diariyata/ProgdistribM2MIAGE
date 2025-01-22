import { PrismaClient } from '@prisma/client';
import express from "express";
const prisma = new PrismaClient()
const app = express()


app.use(express.json());

async function deleteAllData() {
  try {
    // Supprimer les données de la table 'utilisateur'
    await prisma.utilisateur.deleteMany({});
    
    // Supprimer les données de la table 'role'
    await prisma.role.deleteMany({});
    
    // Supprimer les données de la table 'annonce'
    await prisma.annonces.deleteMany({});

    console.log('Toutes les données ont été supprimées.');
  } catch (error) {
    console.error('Erreur lors de la suppression des données :', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllData();
