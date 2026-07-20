class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível da vaga: ${this.nivel}`;
  }
}

const candidato = {
    nome: "Paulo",
    area: "Front-End",
    habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "Kanban"
    ],
    experienciaMeses: 3
};

console.log("Perfil do candidato:");
console.log(candidato);

const vagas = [
    new VagaFrontEnd(
     1,
     "TechStart",
     "Desenvolvedor Front-End Júnior",
     ["JavaScript", "GitHub", "Lógica de Programação"],
     2800,
     "Remoto",
     "Júnior"
    ),
    
    new VagaFrontEnd(
     2,
     "CodeLab",
     "Estágio Front-End",
     ["JavaScript", "Kanban", "GitHub"],
     1800,
     "Híbrido",
     "Estágio"
    ),
    
    new VagaFrontEnd(
     3,
     "WebSolutions",
     "Programador JavaScript Júnior",
     ["JavaScript", "Arrays", "Objetos", "Funções"],
     3000,
     "Presencial",
     "Júnior"
    ),
];

//RF14 - Promise simulando uma busca em servidor
function buscarVagasSimuladas() {
  return new Promise((resolve) => {
    console.log("\nBuscando vagas no servidor...");

    setTimeout(() => {
      resolve(vagas);
    }, 1000);
  });
}

function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}

function calcularCompatibilidade(candidato, vaga) {
    const habilidadesEncontradas = vaga.requisitos.filter((requisito) => 
        candidato.habilidades.includes(requisito)
    );

    const habilidadesFaltantes = vaga.requisitos.filter((requisito) =>
      !candidato.habilidades.includes(requisito)
      );

    const percentual = Math.round(
        (habilidadesEncontradas.length / vaga.requisitos.length) *100
    );

    return {
        empresa: vaga.empresa,
        cargo: vaga.cargo,
        requisitos: vaga.requisitos,
        compatibilidade: percentual,
        classificacao: classificarCompatibilidade(percentual),
        habilidadesEncontradas,
        habilidadesFaltantes
    };
}

function gerarRecomendacaoEstudo(resultado) {
  const habilidadesParaEstudar = [];

  for (let i = 0; i < resultado.length; i++) {
    const habilidadesFaltantes = resultado[i].habilidadesFaltantes;

    habilidadesFaltantes.forEach((habilidade) => {
      if(!habilidadesParaEstudar.includes(habilidade)) {
        habilidadesParaEstudar.push(habilidade);
      }
    });
  }

  if (habilidadesParaEstudar.length === 0) {
    return "Você atende a todos os requisitos das vagas analizadas.";
  }

  return `Priorize estudar ${habilidadesParaEstudar.join(", ")}, pois esses conteúdos aparecem nas vagas analisadas.`;
}

// RF12 - Callback
function finalizarAnalise(nomeCandidato, callback) {
  console.log("\nAnálise finalizada.");
  callback(nomeCandidato);
}

const exibirMensagemFinal = (nome) => {
  console.log(`${nome}, revise suas habilidades faltantes e atualize seu plano de estudos.`);
}

//RF13 - Cloruse
function criarContadorDeAnalises() {
  let total = 0;

  return function () {
    total++;
    return total;
  }
}

//RF14 - Async/Await
async function iniciarSistema() {
  try {
    const vagasCarregadas = await buscarVagasSimuladas();

    console.log("Vagas carregadas com sucesso!");

    console.log("\nResumo das vagas:");

    vagasCarregadas.forEach((vaga) => {
      console.log(vaga.exibirResumo());
      console.log(vaga.exibirNivel());
    });

    const resultados = vagasCarregadas.map((vaga) => 
      calcularCompatibilidade(candidato, vaga)
    );

    const melhorVaga = resultados.reduce((melhorResultado, resultadoAtual) => {
        return resultadoAtual.compatibilidade > melhorResultado.compatibilidade
        ? resultadoAtual
        : melhorResultado;
      }
    );

    const recomendacaoEstudo = gerarRecomendacaoEstudo(resultados);

    console.log("\nResultados da análise:");

    const contarAnalise = criarContadorDeAnalises();

    resultados.forEach((resultado) => {
      console.log(`\nAnálise número: ${contarAnalise()}`);
      console.log(`\nEmpresa: ${resultado.empresa}`);
      console.log(`Cargo: ${resultado.cargo}`);
      console.log(`Requisitos: ${resultado.requisitos.join(", ")}`);
      console.log(`Compatibilidade: ${resultado.compatibilidade}%`);
      console.log(`Classificação: ${resultado.classificacao}`);
      console.log(`Habilidades encontradas: ${resultado.habilidadesEncontradas.join(", ")}`);
      console.log(`Habilidades faltantes: ${resultado.habilidadesFaltantes.length > 0 ? resultado.habilidadesFaltantes.join(", ") : "Nenhuma"}`)
    });

    console.log("\nVaga mais compatível:");
    console.log(`${melhorVaga.empresa} - ${melhorVaga.cargo}`);
    console.log(`Compatibilidade: ${melhorVaga.compatibilidade}%`);

    console.log("\nRecomendação de estudo:");
    console.log(recomendacaoEstudo);

    finalizarAnalise(candidato.nome, exibirMensagemFinal);
  } catch (erro) {
    console.error("Erro ao carregar as vagas:", erro);
  }
}

iniciarSistema();