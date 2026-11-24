import { Router } from 'express';
import * as contaController from '../controllers/contaController.js';

const router = Router();

router.get('/', contaController.listar);
router.get('/:id', contaController.buscarPorId);
router.post('/', contaController.criar);
router.delete('/:id', contaController.remover);

export default router;