# ProgdistribFrontend

Ce projet est une application Angular. Ce guide vous montrera les étapes pour démarrer et vous donnera des informations sur les commandes courantes à utiliser dans un projet Angular.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version recommandée : 16.x ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
- [Angular CLI](https://angular.io/cli) (commandes Angular en ligne de commande)

Si Angular CLI n'est pas installé, vous pouvez l'installer globalement avec la commande :

```bash
npm install -g @angular/cli
```


## Créer un composant

Pour créer un nouveau composant dans votre projet Angular, utilisez la commande suivante :


Par exemple, pour créer un composant `header` :
```bash 
ng generate component header
```

Cela créera un dossier `header` avec les fichiers suivants :

- `header.component.ts` (logique du composant)
- `header.component.html` (template HTML)
- `header.component.css` (style du composant)
- `header.component.spec.ts` (tests unitaires)

Vous pouvez également utiliser l'alias `ng g c <nom-du-composant>`.

## Créer un service

Pour créer un nouveau service, utilisez la commande suivante :
```bash 
ng generate service <nom-du-service>
```

Par exemple, pour créer un service `data` :
```bash 
ng generate service data
```

Cela créera un fichier `data.service.ts` pour gérer la logique de votre service.

## Lancer le serveur de développement

Pour démarrer le serveur de développement et voir votre application dans le navigateur, utilisez la commande :

```bash 
ng serve
```


Cela lancera un serveur local accessible sur `http://localhost:4200/`. Si vous avez déjà un serveur en cours d'exécution, vous devrez peut-être ajouter l'option `--port` pour changer le port :

```bash 
ng serve --port 4300
```


## Créer un composant

Pour créer un nouveau composant dans votre projet Angular, utilisez la commande suivante :


Par exemple, pour créer un composant `header` :
```bash 
ng generate component header
```

Cela créera un dossier `header` avec les fichiers suivants :

- `header.component.ts` (logique du composant)
- `header.component.html` (template HTML)
- `header.component.css` (style du composant)
- `header.component.spec.ts` (tests unitaires)

Vous pouvez également utiliser l'alias `ng g c <nom-du-composant>`.

## Créer un service

Pour créer un nouveau service, utilisez la commande suivante :
```bash 
ng generate service <nom-du-service>
```

Par exemple, pour créer un service `data` :
```bash 
ng generate service data
```

Cela créera un fichier `data.service.ts` pour gérer la logique de votre service.

## Lancer le serveur de développement

Pour démarrer le serveur de développement et voir votre application dans le navigateur, utilisez la commande :

```bash 
ng serve
```


Cela lancera un serveur local accessible sur `http://localhost:4200/`. Si vous avez déjà un serveur en cours d'exécution, vous devrez peut-être ajouter l'option `--port` pour changer le port :

```bash 
ng serve --port 4300
```
