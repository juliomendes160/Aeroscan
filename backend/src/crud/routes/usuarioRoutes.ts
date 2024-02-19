import express from 'express';
import * as usuarioController from '../controllers/usuarioController';

export const router = express.Router();
router.post('/usuario', usuarioController.Salvar);
router.get('/usuarios', usuarioController.Listar);
router.get('/usuario/:id', usuarioController.Consultar);
router.put('/usuario/:id', usuarioController.Atualizar);
router.delete('/usuario/:id', usuarioController.Excluir);