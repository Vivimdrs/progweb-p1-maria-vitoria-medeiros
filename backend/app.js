import express from 'express';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import categoriasRouter from './routes/categorias.js';
import produtosRouter from './routes/produtos.js';

const app = express();

app.use(express.json());
app.use(logger);

app.use('/categorias', categoriasRouter);
app.use('/produtos', produtosRouter);

app.use(errorHandler);

export default app;