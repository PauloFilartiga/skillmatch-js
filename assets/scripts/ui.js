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
// campos e mensagens de erro
const formularioPerfil = document.querySelector("#formulario-perfil");

const campoNome = document.querySelector("#nome");
const campoArea = document.querySelector("#area");
const campoHabilidades = document.querySelector("#habilidades");
const campoExperiencia = document.querySelector("#experiencia");

const mensagemErroNome = document.querySelector("#erro-nome");
const mensagemErroArea = document.querySelector("#erro-area");
const mensagemErroHabilidades = document.querySelector("#erro-habilidades");
const mensagemErroExperiencia = document.querySelector("#erro-experiencia");

function exibirErro(campo, elementoErro, mensagem) {
  campo.setAttribute("aria-invalid", "true");
  elementoErro.textContent = mensagem;
}

function limparErro(campo, elementoErro) {
  campo.removeAttribute("aria-invalid");
  elementoErro.textContent = "";
}

function limparErrosFormulario() {
  limparErro(campoNome, mensagemErroNome);
  limparErro(campoArea, mensagemErroArea);
  limparErro(campoHabilidades, mensagemErroHabilidades);
  limparErro(campoExperiencia, mensagemErroExperiencia);
}

export function obterPerfilFormulario() {
  const habilidades = campoHabilidades.value
    .split(",")
    .map((habilidade) => habilidade.trim())
    .filter((habilidade) => habilidade !== "");

  return {
    nome: campoNome.value.trim(),
    area: campoArea.value.trim(),
    habilidades,
    experienciaMeses: Number(campoExperiencia.value),
  };
}

function validarPerfil(perfil) {
  limparErrosFormulario();

  let formularioValido = true;

  if (perfil.nome === "") {
    exibirErro(campoNome, mensagemErroNome, "Informe seu nome.");

    formularioValido = false;
  }

  if (perfil.area === "") {
    exibirErro(campoArea, mensagemErroArea, "Informe sua área de interesse.");

    formularioValido = false;
  }

  if (perfil.habilidades.length === 0) {
    exibirErro(
      campoHabilidades,
      mensagemErroHabilidades,
      "Informe pelo menos uma habilidade.",
    );

    formularioValido = false;
  }

  if (campoExperiencia.value.trim() === "") {
    exibirErro(
      campoExperiencia,
      mensagemErroExperiencia,
      "Informe sua experiencia em meses.",
    );

    formularioValido = false;
  } else if (
    perfil.experienciaMeses < 0 ||
    !Number.isInteger(perfil.experienciaMeses)
  ) {
    exibirErro(
      campoExperiencia,
      mensagemErroExperiencia,
      "A experiência deve ser um número inteiro igual ou maior que zero.",
    );

    formularioValido = false;
  }

  if (!formularioValido) {
    const primeiroCampoInvalido = formularioPerfil.querySelector(
      '[aria-invalid="true"]',
    );

    if (primeiroCampoInvalido) {
      primeiroCampoInvalido.focus();
    }
  }
  return formularioValido;
}

export function configurarFormulario(aoEnviar) {
  formularioPerfil.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const perfil = obterPerfilFormulario();

    if (!validarPerfil(perfil)) {
      return;
    }

    aoEnviar(perfil);
  });
}
