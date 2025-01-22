FROM node:18.19 AS builder
# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY /progdistrib-frontend/package*.json ./
RUN npm install

# Copier tout le projet
COPY /progdistrib-frontend .

# Construire l'application Angular
RUN npm run build --prod

# Étape 2 : Serveur web pour le déploiement
FROM nginx:alpine

# Copier les fichiers construits vers le serveur Nginx
COPY --from=builder /app/dist/progdistrib-frontend/browser /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]

