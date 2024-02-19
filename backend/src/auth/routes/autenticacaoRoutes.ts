import express from 'express';
import * as loginController from '../controllers/autenticacaoController';

export const router = express.Router();
router.post('/autenticacao', loginController.Login);