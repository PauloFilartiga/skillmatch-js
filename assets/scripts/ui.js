// Fetch - mensagem acessível da interface
const elementoMensagemStatus = document.querySelector("#mensagem-status");

export function exibirMensagemStatus(mensagem, tipo = "informacao") {
  elementoMensagemStatus.textContent = mensagem;

  elementoMensagemStatus.classList.remove(
    "mensagem-status--erro",
    "mensagem-status--sucesso",
  );

  if (tipo === "erro") {
    elementoMensagemStatus.classList.add("mensagem-status--erro");
  } else if (tipo === "sucesso") {
    elementoMensagemStatus.classList.add("mensagem-status--sucesso");
  }
}
