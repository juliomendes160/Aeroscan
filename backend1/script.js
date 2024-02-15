import * as UsuarioController from './crud/controllers/usuarioController';

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para coletar uma informação
function coletarInformacao(pergunta) {
    return new Promise((resolve, reject) => {
      rl.question(pergunta, (resposta) => {
        resolve(resposta);
      });
    });
  }
  
  // Função principal
async function main() {
    // Coletar o nome do usuário
    const nome = await coletarInformacao('Digite o seu nome: ');
    console.log('Nome digitado:', nome);
    UsuarioController.Salvar();
  
    // Coletar o número do usuário
    const numero = await coletarInformacao('Digite o seu número: ');
    console.log('Número digitado:', numero);
  
    rl.close();
}
  
  // Iniciar a interação
  main().catch(console.error);