// Fetch - mensagem acessível da interface
const elementoMensagemStatus = document.querySelector("#mensagem-status");

const elementoResumoPerfil = document.querySelector("#resumo-perfil");

const elementoListaVagas = document.querySelector("#lista-vagas");

const elementoDestaqueResultado = document.querySelector("#destaque-resultado");

const elementoMelhorVaga = document.querySelector("#melhor-vaga");

const elementoRecomendacaoEstudo = document.querySelector(
  "#recomendacao-estudo",
);

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

export function preencherFormulario(perfil) {
  if (!perfil) {
    return;
  }

  campoNome.value = perfil.nome || "";
  campoArea.value = perfil.area || "";

  if (Array.isArray(perfil.habilidades)) {
    campoHabilidades.value = perfil.habilidades.join(", ");
  } else {
    campoHabilidades.value = "";
  }

  if (Number.isInteger(perfil.experienciaMeses)) {
    campoExperiencia.value = perfil.experienciaMeses;
  } else {
    campoExperiencia.value = "";
  }
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

export function renderizarResumoPerfil(candidato, numeroAnalise) {
  elementoResumoPerfil.textContent = "";

  const tituloResumo = document.createElement("h3");

  tituloResumo.classList.add("resumo-perfil__titulo");

  tituloResumo.textContent = `Perfil de ${candidato.nome}`;

  const listaInformacoes = document.createElement("ul");

  listaInformacoes.classList.add("resumo-perfil__lista");

  const informacoes = [
    `Área: ${candidato.area}`,
    `Habilidades: ${candidato.habilidades.join(", ")}`,
    `Experiência: ${candidato.experienciaMeses} meses`,

    `Análise número: ${numeroAnalise} nesta sessão`,
  ];

  informacoes.forEach((informacoes) => {
    const item = document.createElement("li");

    item.textContent = informacoes;

    listaInformacoes.appendChild(item);
  });

  elementoResumoPerfil.appendChild(tituloResumo);
  elementoResumoPerfil.appendChild(listaInformacoes);
}

export function renderizarMelhorVaga(melhorVaga, recomendacao) {
  elementoMelhorVaga.textContent = "";
  elementoRecomendacaoEstudo.textContent = "";

  if (!melhorVaga) {
    elementoDestaqueResultado.hidden = true;
    return;
  }

  const resumoVaga = criarParagrafo(
    `${melhorVaga.empresa} - ${melhorVaga.cargo}`,
    "melhor-vaga__resumo",
  );

  const compatibilidade = criarParagrafo(
    `${melhorVaga.compatibilidade}% de compatibilidade`,
    "melhor-vaga__compatilidade",
  );

  elementoMelhorVaga.appendChild(resumoVaga);
  elementoMelhorVaga.appendChild(compatibilidade);

  elementoRecomendacaoEstudo.textContent = recomendacao;
  elementoDestaqueResultado.hidden = false;
}

//cards das vagas
function criarParagrafo(texto, nomeClasse) {
  const paragrafo = document.createElement("p");

  paragrafo.classList.add(nomeClasse);
  paragrafo.textContent = texto;

  return paragrafo;
}

function formatarSalario(salario) {
  return salario.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function obterClasseCompatibilidade(classificacao) {
  if (classificacao === "Alta compatibilidade") {
    return "compatibilidade--alta";
  } else if (classificacao === "Média compatibilidade") {
    return "compatibilidade--media";
  } else {
    return "compatibilidade--baixa";
  }
}

export function renderizarVagas(resultados) {
  elementoListaVagas.textContent = "";

  resultados.forEach((resultado) => {
    const card = document.createElement("article");

    card.classList.add("card-vaga");

    const titulo = document.createElement("h3");

    titulo.classList.add("card-vaga__titulo");
    titulo.textContent = resultado.cargo;

    const empresa = criarParagrafo(resultado.empresa, "card-vaga__empresa");

    const detalhes = criarParagrafo(
      `${resultado.modalidade} | ${formatarSalario(resultado.salario)}`,
      "card-vaga__detalhes",
    );

    const stack = criarParagrafo(
      `Stack: ${resultado.stack} | ${resultado.senioridade}`,
      "card-vaga__stack",
    );

    const percentual = criarParagrafo(
      `${resultado.compatibilidade}% de compatibilidade`,
      "card-vaga__percentual",
    );

    const classificacao = criarParagrafo(
      resultado.classificacao,
      "card-vaga__classificacao",
    );

    classificacao.classList.add(
      obterClasseCompatibilidade(resultado.classificacao),
    );

    const encontradas = criarParagrafo(
      `Encontradas: ${
        resultado.habilidadesEncontradas.length > 0
          ? resultado.habilidadesEncontradas.join(", ")
          : "Nenhuma"
      }`,
      "card-vaga__encontradas",
    );

    const faltantes = criarParagrafo(
      `Faltantes: ${
        resultado.habilidadesFaltantes.length > 0
          ? resultado.habilidadesFaltantes.join(", ")
          : "Nenhuma"
      }`,
      "card-vaga__faltantes",
    );

    card.appendChild(titulo);
    card.appendChild(empresa);
    card.appendChild(detalhes);
    card.appendChild(stack);
    card.appendChild(percentual);
    card.appendChild(classificacao);
    card.appendChild(encontradas);
    card.appendChild(faltantes);

    elementoListaVagas.appendChild(card);
  });
}
