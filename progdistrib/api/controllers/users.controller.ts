import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { hashPassword, verifyPassword } from '../utils/authUtils'


// export const createUser= async(req :Request, res :Response) => {
//   const {  nom, email, telephone, password, id_role } = req.body;
//   console.log("req body", req.body);

//   if (!nom || !email || !telephone || !password || !id_role) {
//     return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
//   }
//   if (typeof id_role !== 'number') {
//     return res.status(400).json({ error: "Le champ 'id_role' doit être un nombre." });
//   }
//   try {
//     const newUser = await prisma.utilisateur.create({
//       data:{ nom, email, telephone, password, id_role }
//     });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la création du User' });
//   }
// };

export const getUser = async (req: Request, res: Response) => {
  try {
    const Users = await prisma.utilisateur.findMany();
    res.json(Users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des users.' });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const oneUser = await prisma.utilisateur.findUnique({
      where: {
        user_id: Number(id)
      }
    })

    if (!oneUser) {
      return res.status(400).json({ message: "Aucun utilisateur trouvé" })
    }

    return res.status(200).json(oneUser);
  } catch (error: any) {
    const message = "Erreur lors de la récupération de l\'utilisateur";
    return res.status(500).json({ message, error: error.message });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nom, email, password, telephone, id_role } = req.body;

  try {

    if (password && password.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
    }

    // Si un mot de passe est fourni, le hacher avant la mise à jour
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await hashPassword(password);
    }


    const updateduser = await prisma.utilisateur.update({
      where: { user_id: Number(id) },
      data: { nom, email, password: hashedPassword || undefined, telephone, id_role }
    });
    const message = "Utilisateur mise à jour";
    res.json({updateduser, message});
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'user.' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.utilisateur.delete({
      where: { user_id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};

