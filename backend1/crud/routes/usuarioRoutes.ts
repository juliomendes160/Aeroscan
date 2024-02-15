import express from 'express';
import * as UsuarioController from '../controllers/usuarioController';

const router = express.Router();

router.post('/usuario', UsuarioController.Salvar);
router.get('/usuario', UsuarioController.Listar);
router.get('/usuario/:id', UsuarioController.Consultar);
router.put('/usuario/:id', UsuarioController.Atualizar);
router.delete('/usuario/:id', UsuarioController.Excluir);