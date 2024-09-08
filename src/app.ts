import express from 'express';
import cors from 'cors';
import routerAuth from './routes/user.route';
import routerTache from './routes/tache.route';

const app = express();

// Configurer CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use("/api/v1/taches", routerTache);
app.use('/api/v1/auth', routerAuth);

export default app;
