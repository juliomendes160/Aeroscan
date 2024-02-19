import express from 'express';
import * as kartController from '../controllers/kartController';

export const router = express.Router();
router.post('/kart', kartController.Salvar);
router.get('/karts', kartController.Listar);
router.get('/kart/:id', kartController.Consultar);
router.put('/kart/:id', kartController.Atualizar);
router.delete('/kart/:id', kartController.Excluir);