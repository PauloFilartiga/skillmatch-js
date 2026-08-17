// Fetch - módulo de dados
const CAMINHO_VAGAS = "./assets/dados/vagas.json";

const CHAVE_PERFIL = "skillmatch-perfil";

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

// funções de persistência
export function salvarPerfil(perfil) {
  const perfilEmTexto = JSON.stringify(perfil);

  localStorage.setItem(CHAVE_PERFIL, perfilEmTexto);
}

export function carregarPerfilSalvo() {
  const perfilEmTexto = localStorage.getItem(CHAVE_PERFIL);

  if (perfilEmTexto === null) {
    return null;
  }

  try {
    return JSON.parse(perfilEmTexto);
  } catch {
    localStorage.removeItem(CHAVE_PERFIL);

    return null;
  }
}
