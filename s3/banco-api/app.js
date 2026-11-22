import express from 'express';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import clientesRouter from './routes/clientes.js';

const app = express();

app.use(express.json());
app.use(logger);

app.use('/clientes', clientesRouter);

app.use(errorHandler);

export default app;