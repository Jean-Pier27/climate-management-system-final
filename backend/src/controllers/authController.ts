import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data/users';
import type { User } from '../models/User';

const JWT_SECRET = 'climate_secret_key';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Nombre, email y contraseña son obligatorios',
    });
  }

  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({
      message: 'El usuario ya existe',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'Usuario registrado correctamente',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      message: 'Credenciales inválidas',
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({
      message: 'Credenciales inválidas',
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return res.json({
    message: 'Login correcto',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};