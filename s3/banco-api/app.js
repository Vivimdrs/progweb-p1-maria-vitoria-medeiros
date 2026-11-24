import express from 'express';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import clientesRouter from './routes/clientes.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));
app.use(express.json());
app.use(logger);

app.use('/clientes', clientesRouter);

app.use(errorHandler);

export default app;