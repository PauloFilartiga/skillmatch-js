// Fetch - coordenação no main.js
import { carregarVagas } from "./dados.js";

import {
  analisarVagas,
  criarContadorDeAnalises,
  criarVagasFrontEnd,
  encontrarMelhorVaga,
  finalizarAnalise,
  gerarRecomendacaoEstudo,
} from "./motor.js";

import {
  configurarFormulario,
  exibirMensagemStatus,
  renderizarMelhorVaga,
  renderizarResumoPerfil,
  renderizarVagas,
} from "./ui.js";

let vagasCarregadas = [];

const contarAnalise = criarContadorDeAnalises();

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

  const resultados = analisarVagas(candidato, vagasCarregadas);

  if (resultados.length === 0) {
    exibirMensagemStatus("Nada encontrado para o perfil informado.");

    return;
  }

  const melhorVaga = encontrarMelhorVaga(resultados);

  const recomendacao = gerarRecomendacaoEstudo(resultados);

  const numeroAnalise = contarAnalise();

  renderizarResumoPerfil(candidato, numeroAnalise);
  renderizarVagas(resultados);
  renderizarMelhorVaga(melhorVaga, recomendacao);

  const mensagemFinal = finalizarAnalise(candidato.nome, (nome) => {
    return `${nome}, análise ${numeroAnalise} concluída. Confira os resultados abaixo.`;
  });

  exibirMensagemStatus(mensagemFinal, "sucesso");
}

configurarFormulario(processarPerfil);

iniciarAplicacao();
