import express from 'express';
import * as pistaController from '../controllers/pistaController';

export const router = express.Router();
router.post('/pista', pistaController.Salvar);
router.get('/pistas', pistaController.Listar);
router.get('/pista/:id', pistaController.Consultar);
router.put('/pista/:id', pistaController.Atualizar);
router.delete('/pista/:id', pistaController.Excluir);