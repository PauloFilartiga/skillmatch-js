# 🎯 SkillMatch JS

> **Descubra onde suas habilidades já podem te levar — e o que estudar para chegar ainda mais longe.**

O **SkillMatch JS** é um simulador desenvolvido em JavaScript puro que compara as habilidades de uma pessoa candidata com os requisitos de vagas fictícias de Front-End Júnior.

O sistema calcula o percentual de compatibilidade, identifica habilidades encontradas e faltantes, classifica cada resultado, encontra a vaga mais compatível e gera uma recomendação personalizada de estudo.

---

## 📌 Sobre o projeto

Este projeto foi desenvolvido como parte do:

**Mini-Projeto Avaliativo — Módulo 01 — Semana 06**  
**Curso: Desenvolvedor(a) Front-End React — Turmas 01 e 02**

Apesar de o curso ser voltado para React, este projeto utiliza somente **JavaScript puro**, com execução pelo terminal ou pelo console do navegador.

O principal objetivo foi praticar lógica de programação, manipulação de arrays, objetos, funções, Programação Orientada a Objetos, assincronismo e versionamento com Git e GitHub.

---

## 🧠 Problema proposto

Uma startup precisa automatizar a triagem de candidatos para vagas de tecnologia.

O sistema deve comparar:

- as habilidades da pessoa candidata;
- os requisitos de cada vaga;
- as habilidades já dominadas;
- as habilidades ainda faltantes;
- o percentual de compatibilidade;
- a vaga com maior aderência;
- os conteúdos recomendados para estudo.

---

## ⚙️ O que o sistema faz

Ao ser executado, o SkillMatch JS:

1\. carrega o perfil do candidato;
2\. simula a busca de vagas em um servidor;
3\. apresenta o resumo das vagas;
4\. compara as habilidades com os requisitos;
5\. calcula o percentual de compatibilidade;
6\. classifica a compatibilidade;
7\. lista habilidades encontradas e faltantes;
8\. identifica a vaga com maior compatibilidade;
9\. gera uma recomendação de estudo;
10\. exibe uma mensagem final personalizada.

---

## 🖥️ Exemplo de resultado

```text
Buscando vagas no servidor...
Vagas carregadas com sucesso!

Empresa: TechStart
Cargo: Desenvolvedor Front-End Júnior
Compatibilidade: 100%
Classificação: Alta compatibilidade
Habilidades encontradas: JavaScript, GitHub, Lógica de Programação
Habilidades faltantes: Nenhuma

Vaga mais compatível:
TechStart - Desenvolvedor Front-End Júnior
Compatibilidade: 100%

Recomendação de estudo:
Priorize estudar Arrays, Objetos, Funções, pois esses conteúdos aparecem nas vagas analisadas.
```

---

## 📊 Regras de compatibilidade

O percentual é calculado com a seguinte lógica:

```text
requisitos atendidos ÷ total de requisitos da vaga × 100
```

| Percentual | Classificação |
|---|---|
| 80% a 100% | Alta compatibilidade |
| 50% a 79% | Média compatibilidade |
| 0% a 49% | Baixa compatibilidade |

Em caso de empate, o sistema mantém a primeira vaga com o maior percentual encontrada na lista.

---

## 📁 Estrutura do projeto

```text
skillmatch-js/
│
├── skillmatch.js
├── README.md
└── planejamento/
    └── tarefas-kanban.md
```

### Arquivos

- `skillmatch.js`: contém toda a lógica do sistema.
- `README.md`: documentação do projeto.
- `planejamento/tarefas-kanban.md`: registro da organização das tarefas.

---

## ▶️ Como executar

### Opção 1 — Terminal do VS Code

Este foi o método utilizado durante o desenvolvimento.

1\. Clone o repositório:

```bash
git clone https://github.com/PauloFilartiga/skillmatch-js.git
```

2\. Entre na pasta:

```bash
cd skillmatch-js
```

3\. Execute o arquivo:

```bash
node skillmatch.js
```

É necessário ter o Node.js instalado para utilizar esta opção.

### Opção 2 — Console do navegador

1\. Abra o Google Chrome.
2\. Pressione `F12`.
3\. Acesse a aba **Console**.
4\. Copie o conteúdo de `skillmatch.js`.
5\. Cole no console.
6\. Pressione `Enter`.

---

## ✅ Requisitos funcionais implementados

| Requisito | Implementação |
|---|---|
| RF01 | Objeto com o perfil do candidato |
| RF02 | Lista com três vagas fictícias |
| RF03 | Cálculo do percentual de compatibilidade |
| RF04 | Classificação alta, média ou baixa |
| RF05 | Identificação das habilidades faltantes |
| RF06 | Busca da vaga com maior compatibilidade |
| RF07 | Recomendação personalizada de estudo |
| RF08 | Uso de métodos de array |
| RF09 | Criação da classe `Vaga` |
| RF10 | Herança com a classe `VagaFrontEnd` |
| RF11 | Uso do `this` nos atributos e métodos |
| RF12 | Função que recebe callback |
| RF13 | Closure com contador de análises |
| RF14 | Promise, `async/await` e simulação de servidor |

---

## 🧩 Conceitos de JavaScript utilizados

O projeto utiliza:

- strings;
- números;
- valores booleanos;
- arrays;
- objetos;
- operadores matemáticos e lógicos;
- estruturas condicionais;
- laço `for`;
- funções tradicionais;
- arrow functions;
- escopo de variáveis;
- classes;
- construtores;
- atributos;
- métodos;
- herança;
- callback;
- closure;
- Promise;
- `async/await`;
- tratamento de erros com `try/catch`.

---

## 🔎 Métodos de array utilizados

### `map`

Gera um novo array contendo o resultado da análise de todas as vagas.

```javascript
const resultados = vagasCarregadas.map((vaga) =>
  calcularCompatibilidade(candidato, vaga)
);
```

### `filter`

Identifica as habilidades encontradas e as habilidades faltantes.

```javascript
const habilidadesFaltantes = vaga.requisitos.filter(
  (requisito) => !candidato.habilidades.includes(requisito)
);
```

### `reduce`

Compara os resultados e encontra a vaga com maior compatibilidade.

```javascript
const melhorVaga = resultados.reduce(
  (melhorResultado, resultadoAtual) => {
    return resultadoAtual.compatibilidade >
      melhorResultado.compatibilidade
      ? resultadoAtual
      : melhorResultado;
  }
);
```

Também foram utilizados:

- `forEach`;
- `includes`;
- `join`;
- `push`.

---

## 🏗️ Programação Orientada a Objetos

A classe `Vaga` representa as informações básicas de uma oportunidade:

```javascript
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
```

A classe `VagaFrontEnd` herda as características de `Vaga`:

```javascript
class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível da vaga: ${this.nivel}`;
  }
}
```

Nesse trecho são demonstrados:

- classe;
- construtor;
- atributos;
- métodos;
- herança com `extends`;
- chamada do construtor principal com `super`;
- uso do `this`.

---

## 🔁 Callback

O callback é demonstrado por uma função que recebe outra função como parâmetro:

```javascript
function finalizarAnalise(nomeCandidato, callback) {
  console.log("\nAnálise finalizada.");
  callback(nomeCandidato);
}
```

Após concluir a análise, a função recebida é executada para mostrar uma mensagem personalizada.

---

## 🔒 Closure

A closure mantém o valor interno do contador entre diferentes chamadas:

```javascript
function criarContadorDeAnalises() {
  let total = 0;

  return function () {
    total++;
    return total;
  };
}
```

A variável `total` permanece protegida dentro da função e é atualizada sempre que uma nova análise é realizada.

---

## ⏳ Promise e async/await

O carregamento das vagas é simulado como se os dados viessem de um servidor:

```javascript
function buscarVagasSimuladas() {
  return new Promise((resolve) => {
    console.log("\nBuscando vagas no servidor...");

    setTimeout(() => {
      resolve(vagas);
    }, 1000);
  });
}
```

A função principal aguarda a conclusão da Promise:

```javascript
async function iniciarSistema() {
  try {
    const vagasCarregadas = await buscarVagasSimuladas();
    console.log("Vagas carregadas com sucesso!");
  } catch (erro) {
    console.error("Erro ao carregar as vagas:", erro);
  }
}
```

O `setTimeout` representa o tempo de resposta de uma requisição feita a um servidor.

---

## 🌐 Como funciona na internet

Essa comunicação normalmente acontece por protocolos como HTTP e HTTPS.

Neste projeto não existe uma conexão real com a internet, mas a Promise e o `setTimeout` simulam o tempo necessário para solicitar e receber os dados de um servidor.

---

## 🖧 Arquitetura cliente-servidor

Na arquitetura cliente-servidor, as responsabilidades são separadas:

- **Cliente:** faz solicitações e apresenta os resultados para o usuário.
- **Servidor:** recebe as solicitações, processa os dados e devolve uma resposta.

No SkillMatch JS:

- a função `iniciarSistema()` representa o cliente aguardando os dados;
- a função `buscarVagasSimuladas()` representa uma consulta ao servidor;
- a Promise representa a resposta futura;
- o `await` aguarda a conclusão da solicitação.

Mesmo sem utilizar uma API real, o projeto demonstra o fluxo básico de uma aplicação cliente-servidor.

---

## 🔤 Uso de `const`, `let` e `var`

Neste projeto foram priorizados:

- `const`: para valores que não precisam receber uma nova atribuição;
- `let`: para valores que precisam ser modificados, como o contador da closure.

A palavra `var` não foi utilizada porque possui escopo de função e pode causar comportamentos menos previsíveis. Em JavaScript moderno, normalmente é recomendado priorizar `const` e utilizar `let` quando a reatribuição for necessária.

---

## 🛠️ Ferramentas utilizadas

### Linguagem e execução

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=nodedotjs&logoColor=white)

### Desenvolvimento e versionamento

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-121011?style=for-the-badge&logo=github&logoColor=white)
![GitHub Desktop](https://img.shields.io/badge/GitHub%20Desktop-8034A9?style=for-the-badge&logo=github&logoColor=white)

### Apoio ao desenvolvimento

![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Chrome DevTools](https://img.shields.io/badge/Chrome%20DevTools-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

### Extensões recomendadas para o VS Code

![Code Runner](https://img.shields.io/badge/Code%20Runner-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![GitLens](https://img.shields.io/badge/GitLens-F05032?style=for-the-badge&logo=git&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

O projeto também pode ser executado diretamente pelo terminal, sem depender de extensões.

---

## 🌿 Estratégia de versionamento

O projeto utiliza um fluxo simplificado:

```text
feature ou fix
      ↓
   develop
      ↓
     main
```

- `main`: versão estável do projeto;
- `develop`: branch de integração e testes;
- `feat/*`: desenvolvimento de novas funcionalidades;
- `fix/*`: correção de problemas;
- `docs/*`: alterações na documentação.

A branch `main` foi protegida para evitar alterações diretas e exigir integração por Pull Request.

<details>
<summary><strong>Branches utilizadas durante o desenvolvimento</strong></summary>

- `feat/analise-vagas`
- `feat/dados-vagas`
- `feat/calculo-compatibilidade`
- `feat/classificacao-compatibilidade`
- `feat/habilidades-faltantes`
- `feat/melhor-vaga`
- `feat/recomendacao-estudo`
- `feat/classe-vaga`
- `feat/heranca-vaga-frontend`
- `feat/callback-closure`
- `feat/promise-async-await`
- `fix/ajusta-execucao-final`
- `docs/readme`

</details>

---

## 📋 Organização pelo Kanban

As tarefas foram organizadas no Notion utilizando as colunas:

- Backlog;
- A Fazer;
- Em Andamento;
- Feito.

🔗 **Quadro Kanban:**  
https://app.notion.com/p/99b5701753e8837db74281f757753b14?v=5865701753e88272a2f208cd9a2f61d0&source=copy_link

---

## 🎥 Vídeo de apresentação

O vídeo apresenta:

- o objetivo do sistema;
- a execução do projeto;
- a organização do Kanban;
- as branches utilizadas;
- os principais conceitos do código;
- possíveis melhorias futuras.

🔗 **Vídeo de apresentação no YouTube:**  
[▶️ Assistir à apresentação do SkillMatch JS](https://youtu.be/VVkW4e5Wzr0)

---

## 🚀 Possíveis melhorias futuras

Em uma próxima versão, o projeto poderia receber:

- interface visual com HTML e CSS;
- formulários para cadastrar candidatos;
- cadastro dinâmico de vagas;
- leitura de dados de uma API real;
- armazenamento das análises;
- filtros por salário e modalidade;
- tratamento de empates entre vagas;
- testes automatizados;
- versão desenvolvida com React.

---

## 👨‍💻 Autor

**Paulo Filartiga**

Estudante de Engenharia de Software e desenvolvedor em formação, com interesse em desenvolvimento web, JavaScript, arquitetura de software e boas práticas de versionamento.

🔗 **GitHub:**  
https://github.com/PauloFilartiga

---

## 💬 Considerações finais

O SkillMatch JS foi desenvolvido para transformar os conteúdos estudados em uma solução prática.

Mais do que calcular percentuais, o projeto demonstra como diferentes conceitos de JavaScript podem trabalhar juntos dentro de um fluxo organizado de desenvolvimento.

> **Toda habilidade já aprendida aproxima o candidato de uma oportunidade. Toda habilidade faltante indica o próximo passo.**
