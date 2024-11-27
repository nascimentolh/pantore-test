const crypto = require("node:crypto");

const readline = require("node:readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Digite o tamanho em bytes para a chave aleatória: ", (tamanho) => {
  try {
    const chave = crypto.randomBytes(Number.parseInt(tamanho)).toString("hex");
    console.log("Chave gerada:", chave);
  } catch (error) {
    console.error("Erro ao gerar a chave:", error.message);
  } finally {
    readline.close();
  }
});
