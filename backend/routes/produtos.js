import { Router } from 'express';
import * as produtoController from '../controllers/produtoController.js';

const router = Router();

router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscarPorId);
router.post('/', produtoController.criar);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.remover);

export default router;