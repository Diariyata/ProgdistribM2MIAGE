import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createAnnonce = async (req: Request & { user?: any }, res: Response) => {
  const { picture, titre, description, adresse, prix, date_dispos } = req.body;
  console.log("Requête body:", req.body);

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: 'Utilisateur non autorisé' });
  }
  console.log('Utilisateur dans req.user :', req.user);

  // Convertir la date entrée en "jour/mois/année" en un objet Date compatible avec Prisma
  let dateDispoFinale = date_dispos ? new Date(date_dispos.split('/').reverse().join('-')) : new Date();

  // Vérifier si la date est valide et dans le futur
  if (isNaN(dateDispoFinale.getTime()) || dateDispoFinale <= new Date()) {
    return res.status(400).json({ message: "La date doit être supérieur à la date d\'aujourdh\'hui" });
  }


  if (!picture || !titre || !description || !adresse || !prix || !date_dispos) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    const newAnnonce = await prisma.annonces.create({
      data: {
        picture,
        titre,
        description,
        adresse,
        prix,
        date_dispos: dateDispoFinale,
        id_user: req.user.userId,
      },
    });

    return res.status(201).json({ newAnnonce, message: "Annonces créée" });
  } catch (error: any) {
    const message = "Erreur lors de l\'enregistrement de l\'annonces";
    return res.status(500).json({ message, error: error.message });
  }

};

export const getAnnonces = async (req: Request, res: Response) => {
  try {
    const annonces = await prisma.annonces.findMany();
    res.json(annonces);
    console.log('hey annonce', annonces)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des annonces.' });
  }
};

export const getOneAnnonce = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const oneAnnonce = await prisma.annonces.findUnique({
      where: {
        annonce_id: Number(id)
      }
    })
    if (!oneAnnonce) {
    return res.status(400).json({message: "Aucune annonce trouvée"})
    }
    return res.json(oneAnnonce)
  } catch (error: any) {
    const message = "Erreur lors de la récupération de l\'annonces";
    return res.status(500).json({ message, error: error.message });
  }
}

export const updateAnnonce = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titre, description, prix, id_user, picture, date_dispos } = req.body;

  try {
    const updatedAnnonce = await prisma.annonces.update({
      where: { annonce_id: Number(id) },
      data: { titre, description, prix, id_user, picture, date_dispos }
    });
    res.json(updatedAnnonce);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'annonce.' });
  }
};

export const deleteAnnonce = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.annonces.delete({
      where: { annonce_id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'annonce.' });
  }
};


export const getAnnoncesUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const annoncesUtilisateur = await prisma.utilisateur.findMany({
      where: {
        user_id: Number(id)
      },
      include: {
        annonce: true
      },
    });

    if (!annoncesUtilisateur || annoncesUtilisateur.length === 0 || annoncesUtilisateur[0].annonce.length === 0) {
      return res.status(404).json({ message: "Aucune annonce trouvée pour cet utilisateur." });
    }

    return res.status(200).json(annoncesUtilisateur)
  } catch (error: any) {
    const message = "Erreur lors de la récupération de l\'annonce de l'utilisateur"
    res.status(400).json({ message, error: error.message })
  }

}


// select user_id, annonces.* from utilisateur inner join annonces on utilisateur.user_id = annonces.id_user where user_id = 18;