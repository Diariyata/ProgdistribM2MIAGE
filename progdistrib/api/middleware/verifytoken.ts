import express from "express";
const app = express();
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

const verifyToken = (req: Request & {user?: any}, res: Response, next: NextFunction) :void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Récupère le token

    if (!token) {
        res.status(401).json({ message: 'Token manquant' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Vérifie le token
        req.user = decoded;  // Attache l'utilisateur décodé à req.user
        next();  // Passe à la suite
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
        return;
    }
};


export default verifyToken;