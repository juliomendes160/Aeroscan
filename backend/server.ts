import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as usuarioRoutes from './src/crud/routes/usuarioRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Servidor Node.js funcionando!');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(usuarioRoutes.Rotas());

app.listen(PORT, () => {
  console.log(`Servidor está rodando na port ${PORT}`);
});