import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createRole = async (req: Request, res: Response) => {
    const { role_nom } = req.body;
    if (!role_nom) {
      return res.status(400).json({ error: 'Le champ "nom" est obligatoire.' });
    }
  
    try {
      const newRole = await prisma.role.create({
        data: { role_nom }
      });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du rôle.' });
    }
  };
  export const getRoles = async (req: Request, res: Response) => {
    try {
      const roles = await prisma.role.findMany();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des roles.' });
    }
  };
  export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role_nom  } = req.body;
  
    if (!role_nom ) {
      return res.status(400).json({ error: 'Le champ "nom" est obligatoire.' });
    }
  
    try {
      const updatedRole = await prisma.role.update({
        where: { role_id: Number(id) },
        data: { role_nom  }
      });
      res.json(updatedRole);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du rôle.' });
    }
  };
  export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.role.delete({
        where: { role_id: Number(id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression du rôle.' });
    }
  };