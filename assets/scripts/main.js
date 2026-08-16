// Fetch - coordenação no main.js
import { carregarVagas } from "./dados.js";

import { criarVagasFrontEnd } from "./motor.js";

import { exibirMensagemStatus } from "./ui.js";

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

iniciarAplicacao();
