// Fetch - módulo de dados
const CAMINHO_VAGAS = "./assets/dados/vagas.json";

export async function carregarVagas() {
  const resposta = await fetch(CAMINHO_VAGAS);

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível carregar as vagas. Status: ${resposta.status}`,
    );
  }

  const vagas = await resposta.json();

  if (!Array.isArray(vagas)) {
    throw new Error("O catálogo de vagas não esta no formato esperado.");
  }

  return vagas;
}
