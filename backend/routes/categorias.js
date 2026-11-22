import { Router } from 'express';
import * as categoriaController from '../controllers/categoriaController.js';

const router = Router();

router.get('/', categoriaController.listar);
router.get('/:id', categoriaController.buscarPorId);
router.post('/', categoriaController.criar);
router.put('/:id', categoriaController.atualizar);
router.delete('/:id', categoriaController.remover);

export default router;