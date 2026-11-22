let produtos = [
  { id: 1, titulo: 'Jaqueta Jeans Vintage', preco: 45.0, condicao: 'Usado - Bom', categoriaId: 1 },
  { id: 2, titulo: 'Tênis Cano Alto', preco: 60.0, condicao: 'Novo', categoriaId: 2 }
];
let proximoId = 3;

export function listarTodos(categoriaId) {
  if (categoriaId) {
    return produtos.filter((p) => p.categoriaId === categoriaId);
  }
  return produtos;
}

export function buscarPorId(id) {
  return produtos.find((p) => p.id === id);
}

export function criar(dados) {
  const novo = { id: proximoId++, ...dados };
  produtos.push(novo);
  return novo;
}

export function atualizar(id, dados) {
  const index = produtos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  produtos[index] = { ...produtos[index], ...dados, id };
  return produtos[index];
}

export function remover(id) {
  const index = produtos.findIndex((p) => p.id === id);
  if (index === -1) return false;
  produtos.splice(index, 1);
  return true;
}