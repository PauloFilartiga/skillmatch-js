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
    {
     id: 1,
     empresa: "TechStart",
     cargo: "Desenvolvedor Front-End Júnior",
     requisitos: [
       "JavaScript",
       "GitHub",
       "Lógica de Programação"
     ],
     salario: 2800,
     modalidade: "Remoto"
    },
    {
     id: 2,
     empresa: "CodeLab",
     cargo: "Estágio Front-End",
     requisitos: [
       "JavaScript",
       "Kanban",
       "GitHub"
     ],
     salario: 1800,
     modalidade: "Híbrido" 
    },
    {
     id: 3,
     empresa: "WebSolutions",
     cargo: "Programador JavaScript Júnior",
     requisitos: [
        "JavaScript",
        "Arrays",
        "Objetos",
        "Funções"
     ],
     salario: 3000,
     modalidade: "Presencial"
    },
];

console.log("\nLista de vagas:");
console.log(vagas);

function calcularCompatibilidade(candidato, vaga) {
    const habilidadesEncontradas = vaga.requisitos.filter((requisito) => 
        candidato.habilidades.includes(requisito)
    );

    const percentual = Math.round(
        (habilidadesEncontradas.length / vaga.requisitos.length) *100
    );

    return {
        empresa: vaga.empresa,
        cargo: vaga.cargo,
        requisitos: vaga.requisitos,
        compatibilidade: percentual,
        habilidadesEncontradas
    };
}

const resultados = vagas.map((vaga) =>
    calcularCompatibilidade(candidato, vaga)
);

console.log("\nResultados da análise:");

resultados.forEach((resultado) => {
    console.log(`\nEmpresa: ${resultado.empresa}`);
    console.log(`Cargo: ${resultado.cargo}`);
    console.log(`Requisitos: ${resultado.requisitos.join(", ")}`);
    console.log(`Compatibilidade: ${resultado.compatibilidade}%`);
    console.log(`Habilidades encontradas: ${resultado.habilidadesEncontradas.join(", ")}`
    );
});