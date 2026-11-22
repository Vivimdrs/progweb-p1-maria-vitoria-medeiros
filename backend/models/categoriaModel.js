let categorias = [
  { id: 1, nome: 'Roupas', descricao: 'Vestuário masculino, feminino e infantil' },
  { id: 2, nome: 'Calçados', descricao: 'Tênis, sapatos, sandálias e botas' }
];
let proximoId = 3;

export function listarTodas() {
  return categorias;
}

export function buscarPorId(id) {
  return categorias.find((c) => c.id === id);
}

export function buscarPorNome(nome) {
  return categorias.find((c) => c.nome.toLowerCase() === nome.trim().toLowerCase());
}

export function criar(dados) {
  const nova = { id: proximoId++, ...dados };
  categorias.push(nova);
  return nova;
}

export function atualizar(id, dados) {
  const index = categorias.findIndex((c) => c.id === id);
  if (index === -1) return null;
  categorias[index] = { ...categorias[index], ...dados, id };
  return categorias[index];
}

export function remover(id) {
  const index = categorias.findIndex((c) => c.id === id);
  if (index === -1) return false;
  categorias.splice(index, 1);
  return true;
}