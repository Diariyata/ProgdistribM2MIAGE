import express from "express";
const app = express();
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
import { hashPassword, verifyPassword } from '../utils/authUtils'

app.use(express.json());

const register = async (req: Request, res: Response) => {
    const { nom, email, password, telephone } = req.body;
    console.log("Requête body:", req.body);

    if (!nom || !email || !password || !telephone) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères.' })
    }

    const hashedPassword = await hashPassword(password);

    try {

        const existingEmail = await prisma.utilisateur.findUnique({
            where: {
                email,
            }
        });

        if (existingEmail) {
            return res.status(400).json({ message: 'Cette email existe déja !' })
        }

        // Compte les utilisateurs existant dans la bdd
        const userCount = await prisma.utilisateur.count();

        let assignedRole = null;
        if (userCount === 0) {
            let adminRole = await prisma.role.findUnique({
                where: { role_nom: 'Admin' },
            });

            if (!adminRole) {
                adminRole = await prisma.role.create({
                    data: {
                        role_nom: 'Admin',
                    },
                });
            }

            assignedRole = adminRole.role_id;  // Assignation "Admin"




        } else {
            if (userCount % 2 === 0) {
        
            let locataireRole = await prisma.role.findUnique({
                where: { role_nom: 'Locataire' },
            });

            if (!locataireRole) {
                locataireRole = await prisma.role.create({
                    data: {
                        role_nom: 'Locataire',
                    },
                });
            }

            assignedRole = locataireRole.role_id;  // Assignation "Locataire"

        } else {
            let proprioRole = await prisma.role.findUnique({
                where: { role_nom: 'Propriétaire' },
            });

            if (!proprioRole) {
                proprioRole = await prisma.role.create({
                    data: {
                        role_nom: 'Propriétaire',
                    },
                });
            }
            assignedRole = proprioRole.role_id // Assignation "Propriétaire"
        }
    }
        

        const signup = await prisma.utilisateur.create({
            data: {
                nom,
                email,
                password: hashedPassword,
                telephone,
                id_role: assignedRole
            },
        });
        const message = "Utilisateur enregistré";
        return res.status(201).json({ message, signup });
    } catch (error) {
        const message = "Erreur lors de l\'enregistrement";
        return res.status(500).json({ message, error });
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("Requête body:", req.body);

    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe sont requis" })
    }

    try {
        const signin = await prisma.utilisateur.findUnique({
            where: {
                email,
            },
            include: {
                role: true
            }
        })

        if (!signin) {
            return res.status(401).json({ message: 'Cet utilisateur n\'existe pas' });
        }

        const isPasswordValid = await verifyPassword(password, signin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({
            userId: signin.user_id,
            email: signin.email,
            role: signin.role.role_nom
        }, process.env.JWT_SECRET, { expiresIn: '1h' });


        const message = "Connexion réussie";
        return res.status(201).json({ message, token, role: signin.role.role_nom });
    } catch (error) {
        const message = "Erreur lors de la connexion";
        return res.status(500).json({ message, error });
    }

}

export { register, login };