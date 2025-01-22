#!/bin/sh

# Génération automatique du fichier .env pour Prisma
if [ ! -f .env ]; then
  echo "Création du fichier .env avec les variables de connexion..."
  echo "DATABASE_URL="postgresql://postgres:test@db:5432/progdistrib_db""> .env
else
  echo "Le fichier .env existe déjà, aucune modification effectuée."
fi