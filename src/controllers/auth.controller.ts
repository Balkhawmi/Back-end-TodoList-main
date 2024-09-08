import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JSECRET_ACCESS_TOKEN!;
const JWT_EXPIRATION = process.env.JSECRET_TIME_TO_EXPIRE!;

interface CustomJwtPayload extends JwtPayload {
  id: number; 
  username: string;
}

export class AuthController {
  async register(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
      console.error("Erreur lors de l'inscription de l'utilisateur:", error);
      res.status(500).json({ message: "Erreur lors de l'inscription de l'utilisateur" });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      // Rechercher l'utilisateur par son nom d'utilisateur
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res.status(401).json({ message: "Nom d'utilisateur incorrect" });
      }

      // Comparer le mot de passe fourni avec celui haché en base de données
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }

      // Créer un token JWT avec un payload incluant l'id et le username
      const token = jwt.sign(
        { id: user.id, username: user.username } as CustomJwtPayload,
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRATION,
        }
      );

      // Réponse en cas de succès
      res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
  }
}
