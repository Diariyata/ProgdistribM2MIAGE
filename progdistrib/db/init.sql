CREATE TABLE role (
  "role_id" SERIAL PRIMARY KEY,
  "role_nom" VARCHAR(255) UNIQUE
);

CREATE TABLE utilisateur (
  "user_id" SERIAL PRIMARY KEY,
  "nom" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "telephone" VARCHAR(20)  NULL,
  "id_role" INT REFERENCES "role"("role_id") ON DELETE CASCADE
);

CREATE TABLE annonces (
  "annonce_id" SERIAL PRIMARY KEY,
  "picture" VARCHAR(255),
  "titre" VARCHAR(255) NOT NULL,
  "adresse" VARCHAR(255) NOT NULL,
  "description" VARCHAR(255) NOT NULL,
  "prix" INT NOT NULL,
  "date_dispos" TIMESTAMP NOT NULL,
  "id_user" INT REFERENCES "utilisateur"("user_id") ON DELETE CASCADE
);

CREATE TABLE reservation (
  "reservation_id" SERIAL PRIMARY KEY,
  "date_debut" DATE NOT NULL,
  "date_fin" DATE NOT NULL,
  "id_user" INTEGER  REFERENCES "utilisateur"("user_id") ON DELETE CASCADE,
  "id_annonce" INT REFERENCES "annonces"("annonce_id") ON DELETE CASCADE
);

CREATE TABLE disponibilite (
  "disponibilite_id" SERIAL PRIMARY KEY,
  "date_debut" DATE NOT NULL, 
  "date_fin" DATE NOT NULL,
  "id_annonce" INT REFERENCES "annonces"("annonce_id") ON DELETE CASCADE
);

