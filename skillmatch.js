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
    new Vaga(
     1,
     "TechStart",
     "Desenvolvedor Front-End Júnior",
     ["JavaScript", "GitHub", "Lógica de Programação"],
     2800,
     "Remoto"
    ),
    
    new Vaga(
     2,
     "CodeLab",
     "Estágio Front-End",
     ["JavaScript", "Kanban", "GitHub"],
     1800,
     "Híbrido" 
    ),
    
    new Vaga(
     3,
     "WebSolutions",
     "Programador JavaScript Júnior",
     ["JavaScript", "Arrays", "Objetos", "Funções"],
     3000,
     "Presencial"
    ),
];

console.log("\nResumo das vagas:");

vagas.forEach((vaga) => {
  console.log(vaga.exibirResumo());
});

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

const resultados = vagas.map((vaga) =>
    calcularCompatibilidade(candidato, vaga)
);

const melhorVaga = resultados.reduce((melhorResultado, resultadoAtual) => {
  return resultadoAtual.compatibilidade > melhorResultado.compatibilidade 
  ? resultadoAtual 
  : melhorResultado;
});

const recomendacaoEstudo = gerarRecomendacaoEstudo(resultados);

console.log("\nResultados da análise:");

resultados.forEach((resultado) => {
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