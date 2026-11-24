import { API_BASE_URL } from './config.js';

export async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_BASE_URL}${caminho}`, {
    headers: {
      'Content-Type': 'application/json',
      ...opcoes.headers
    },
    ...opcoes
  });

  if (resposta.status === 204) {
    return null;
  }

  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(dados.erro || `Erro HTTP ${resposta.status}`);
  }

  return dados;
}