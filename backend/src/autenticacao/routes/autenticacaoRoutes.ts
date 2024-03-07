import express from 'express';
import * as autenticacaoController from '../controllers/autenticacaoController';

export const router = express.Router();
router.post('/autenticacao/login', autenticacaoController.Login);
router.post('/autenticacao/register', autenticacaoController.Validar, autenticacaoController.Register);