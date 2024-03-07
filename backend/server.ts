import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as usuarioRoutes from './src/cadastro/routes/usuarioRoutes';
import * as pistaRoutes from './src/cadastro/routes/pistaRoutes';
import * as kartRoutes from './src/cadastro/routes/kartRoutes';
import * as autenticacaoRoutes from './src/autenticacao/routes/autenticacaoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando!');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  usuarioRoutes.router, 
  pistaRoutes.router,
  kartRoutes.router,
  autenticacaoRoutes.router
);

app.listen(PORT, () => {
  console.log(`Servidor está rodando na port ${PORT}`);
});