let clientes = [
  { id: 1, nome: 'Ana Silva', cpf: '11122233344', email: 'ana@email.com' },
  { id: 2, nome: 'Bruno Costa', cpf: '55566677788', email: 'bruno@email.com' }
];
let proximoId = 3;

export function listarTodos() {
  return clientes;
}

export function buscarPorId(id) {
  return clientes.find((c) => c.id === id);
}

export function buscarPorCpf(cpf) {
  return clientes.find((c) => c.cpf === cpf);
}

export function criar(dados) {
  const novo = { id: proximoId++, ...dados };
  clientes.push(novo);
  return novo;
}

export function atualizar(id, dados) {
  const index = clientes.findIndex((c) => c.id === id);
  if (index === -1) return null;
  clientes[index] = { ...clientes[index], ...dados, id };
  return clientes[index];
}

export function remover(id) {
  const index = clientes.findIndex((c) => c.id === id);
  if (index === -1) return false;
  clientes.splice(index, 1);
  return true;
}