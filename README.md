# Environnement Docker Progdistrib Diariyata Touré & Manel Mansouri M2 MIAGE GROUPE 1 

# Rebnb 🏡
Bienvenue sur Rebnb , une application web inspirée d'Airbnb pour la localisation et la réservation d'hébergements.
Ce projet a été conçu pour offrir une plateforme simple, intuitive et efficace où les utilisateurs peuvent publier des annonces, consulter les disponibilités et effectuer des réservations.

## Prérequis
Avant de commencer, assurez-vous que les outils suivants sont installés sur votre machine :
- Docker et Docker Compose
   https://blog.alphorm.com/installation-docker-guide-complet

## Installation
1. Clonez le dépôt sur votre machine locale :
 ```bash
   git clone https://github.com/Diariyata/ProgdistribM2MIAGE.git
   cd progdistrib
```
2. Assurez-vous que Docker est en cours d'exécution sur votre machine.

## Démarrage avec Docker
 Pour construire et démarrer les conteneurs Docker, exécutez la commande suivante :
 ```bash
docker compose up --build
 ```
Docker s'occupera de configurer et de démarrer l'ensemble des services nécessaires, y compris le serveur et la base de données.

## Installation manuelle des dépendances
Si vous constatez que le dossier node_modulesest vide, vous pouvez installer manuellement les dépendances pour le projet.
Depuis le terminal (et non dans le conteneur Docker), exécutez la commande suivante :
 ```bash
npm install
 ```
## Connexion à la Base de Données et Vérification des Tables
1. Accédez au conteneur PostgreSQL :
 ```bash
docker exec -it db_api bash 
 ```
2. Une fois à l'intérieur du conteneur, connectez-vous à la base de données PostgreSQL :
```bash
psql -U postgres -d progdistrib_db
 ```
3. Vérifiez l'existence des tables en listant leur contenu :
```bash
\dt
 ```

## Tech Stack
Ce projet repose sur les technologies suivantes :

**Frontend :** 
- React
- Angular
- TailwindCSS

**Backend :**
- Node.JS
- Express
- Prisma

**Base de donnée :** 
- PostgreSQL

**Conteneurisation:** 
- Docker

**Déploiement :** 
- Git

## A venir
Nous prévoyons d'ajouter les fonctionnalités suivantes :

- Authentification sécurisée via JWT.
- Système de paiement intégré.
- Notifications en temps réel.

Merci d'utiliser Rebnb 🚀 !


