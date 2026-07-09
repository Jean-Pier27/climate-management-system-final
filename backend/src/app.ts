import express from 'express';
import cors from 'cors';
import path from 'path';

import climateRoutes from './routes/climateRoutes';
import authRoutes from './routes/authRoutes';
import logger from './middleware/logger';
import { verifyToken } from './middleware/authMiddleware';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger(req);
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/auth', authRoutes);
app.use('/api/climate', verifyToken, climateRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});