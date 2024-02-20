import express from 'express';
import * as loginController from '../controllers/autenticacaoController';

export const router = express.Router();
router.post('/autenticacao/register', loginController.Register);
router.post('/autenticacao/login', loginController.Login);
router.post('/autenticacao/token', loginController.Token);