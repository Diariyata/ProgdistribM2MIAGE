-- CreateTable
CREATE TABLE "role" (
    "role_id" SERIAL NOT NULL,
    "role_nom" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "utilisateur" (
    "user_id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "id_role" INTEGER NOT NULL,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "annonces" (
    "annonce_id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,
    "date_dispos" TIMESTAMP(3) NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "annonces_pkey" PRIMARY KEY ("annonce_id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "reservation_id" SERIAL NOT NULL,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_annonce" INTEGER NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "disponibilite" (
    "disponibilite_id" SERIAL NOT NULL,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "id_annonce" INTEGER NOT NULL,

    CONSTRAINT "disponibilite_pkey" PRIMARY KEY ("disponibilite_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_role_nom_key" ON "role"("role_nom");

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_email_key" ON "utilisateur"("email");

-- AddForeignKey
ALTER TABLE "utilisateur" ADD CONSTRAINT "utilisateur_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annonces" ADD CONSTRAINT "annonces_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "utilisateur"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "utilisateur"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_id_annonce_fkey" FOREIGN KEY ("id_annonce") REFERENCES "annonces"("annonce_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilite" ADD CONSTRAINT "disponibilite_id_annonce_fkey" FOREIGN KEY ("id_annonce") REFERENCES "annonces"("annonce_id") ON DELETE RESTRICT ON UPDATE CASCADE;
