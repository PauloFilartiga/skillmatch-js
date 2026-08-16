// Fetch - coordenação no main.js
import { carregarVagas } from "./dados.js";

import { criarVagasFrontEnd } from "./motor.js";

import { configurarFormulario, exibirMensagemStatus } from "./ui.js";

let vagasCarregadas = [];

async function iniciarAplicacao() {
  exibirMensagemStatus("Carregando vagas...");

  try {
    const dadosVagas = await carregarVagas();

    if (dadosVagas.length === 0) {
      exibirMensagemStatus("Nada encontrado. Não existem vagas disponíveis.");

      return;
    }

    vagasCarregadas = criarVagasFrontEnd(dadosVagas);

    exibirMensagemStatus(
      `${vagasCarregadas.length} vagas carregadas. Preencha seu perfil para iniciar a análise.`,
      "sucesso",
    );
  } catch (erro) {
    console.error(erro);

    exibirMensagemStatus(
      "Não foi possível carregar as vagas. Tente novamente mais tarde.",
      "erro",
    );
  }
}
function processarPerfil(candidato) {
  if (vagasCarregadas.length === 0) {
    exibirMensagemStatus("Aguarde o carregamento das vagas.", "erro");

    return;
  }

  exibirMensagemStatus(
    `${candidato.nome}, seu perfil foi validado com sucesso.`,
    "sucesso",
  );
}
configurarFormulario(processarPerfil);

iniciarAplicacao();
