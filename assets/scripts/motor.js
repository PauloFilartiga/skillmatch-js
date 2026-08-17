// classificação
export function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

// classe vaga
function normalizarHabilidades(habilidade) {
  return habilidade.trim().toLowerCase();
}
export class Vaga {
  constructor(
    id,
    empresa,
    cargo,
    requisitos,
    salario,
    modalidade,
    experienciaMinimaMeses = 0,
  ) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
    this.experienciaMinimaMeses = experienciaMinimaMeses;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }

  calcularCompatibilidade(candidato) {
    const habilidadesNormalizadas = candidato.habilidades.map((habilidade) =>
      normalizarHabilidades(habilidade),
    );

    const habilidadesEncontradas = this.requisitos.filter((requisito) =>
      habilidadesNormalizadas.includes(normalizarHabilidades(requisito)),
    );

    const habilidadesFaltantes = this.requisitos.filter(
      (requisito) =>
        !habilidadesNormalizadas.includes(normalizarHabilidades(requisito)),
    );

    const totalRequisitos = this.requisitos.length;

    const percentual =
      totalRequisitos === 0
        ? 0
        : Math.round((habilidadesEncontradas.length / totalRequisitos) * 100);

    return {
      id: this.id,
      empresa: this.empresa,
      cargo: this.cargo,
      requisitos: this.requisitos,
      salario: this.salario,
      modalidade: this.modalidade,
      experienciaMinimaMeses: this.experienciaMinimaMeses,
      compatibilidade: percentual,
      classificacao: classificarCompatibilidade(percentual),
      habilidadesEncontradas,
      habilidadesFaltantes,
    };
  }
}

// classe herança com vagaFrontEnd
export class VagaFrontEnd extends Vaga {
  constructor(
    id,
    empresa,
    cargo,
    requisitos,
    salario,
    modalidade,
    stack,
    senioridade,
    experienciaMinimaMeses = 0,
  ) {
    super(
      id,
      empresa,
      cargo,
      requisitos,
      salario,
      modalidade,
      experienciaMinimaMeses,
    );

    this.stack = stack;
    this.senioridade = senioridade;
  }

  exibirResumo() {
    return `${super.exibirResumo()} | Stack: ${this.stack} | Senioridade: ${this.senioridade}`;
  }

  calcularCompatibilidade(candidato) {
    const resultado = super.calcularCompatibilidade(candidato);

    resultado.stack = this.stack;
    resultado.senioridade = this.senioridade;

    return resultado;
  }
}
// Transformar e analisar as vagas
export function criarVagasFrontEnd(dadosVagas) {
  return dadosVagas.map(
    (vaga) =>
      new VagaFrontEnd(
        vaga.id,
        vaga.empresa,
        vaga.cargo,
        vaga.requisitos,
        vaga.salario,
        vaga.modalidade,
        vaga.stack,
        vaga.senioridade,
        vaga.experienciaMinimaMeses,
      ),
  );
}

export function analisarVagas(candidato, vagas) {
  return vagas.map((vaga) => vaga.calcularCompatibilidade(candidato));
}

export function encontrarMelhorVaga(resultados) {
  if (resultados.length === 0) {
    return null;
  }

  return resultados.reduce((melhorResultado, resultadoAtual) =>
    resultadoAtual.compatibilidade > melhorResultado.compatibilidade
      ? resultadoAtual
      : melhorResultado,
  );
}
// classe recomendação de estudo
export function gerarRecomendacaoEstudo(resultados) {
  const contagemFaltantes = resultados.reduce((contagem, resultado) => {
    resultado.habilidadesFaltantes.forEach((habilidade) => {
      if (contagem[habilidade]) {
        contagem[habilidade] += 1;
      } else {
        contagem[habilidade] = 1;
      }
    });

    return contagem;
  }, {});

  const habilidadesContadas = Object.entries(contagemFaltantes);

  if (habilidadesContadas.length === 0) {
    return "Você atende a todos os requisitos das vagas analisadas.";
  }

  const maiorFrequencia = habilidadesContadas.reduce(
    (maior, item) => (item[1] > maior ? item[1] : maior),
    0,
  );

  const habilidadesPrioritarias = habilidadesContadas
    .filter((item) => item[1] === maiorFrequencia)
    .map((item) => item[0]);

  return `Priorize estudar ${habilidadesPrioritarias.join(
    ", ",
  )}. Essas habilidades aparecem com maior frequência entre os requisitos que faltam.`;
}

//Callback
export function finalizarAnalise(nomeCandidato, callback) {
  return callback(nomeCandidato);
}

//Closure
export function criarContadorDeAnalises() {
  let total = 0;

  return function contarAnalise() {
    total += 1;
    return total;
  };
}
