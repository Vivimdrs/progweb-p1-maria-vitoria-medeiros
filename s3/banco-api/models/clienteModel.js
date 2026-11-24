import db from '../db.js';

export function listarTodos() {
  return db.prepare('SELECT id, nome, cpf, email FROM clientes').all();
}

export function buscarPorId(id) {
  return db.prepare('SELECT id, nome, cpf, email FROM clientes WHERE id = ?').get(id);
}

export function buscarPorCpf(cpf) {
  return db.prepare('SELECT id, nome, cpf, email FROM clientes WHERE cpf = ?').get(cpf);
}

export function criar({ nome, cpf, email }) {
  const resultado = db
    .prepare('INSERT INTO clientes (nome, cpf, email) VALUES (?, ?, ?)')
    .run(nome, cpf, email);
  return buscarPorId(Number(resultado.lastInsertRowid));
}

export function atualizar(id, { nome, cpf, email }) {
  const existente = buscarPorId(id);
  if (!existente) return null;

  db.prepare('UPDATE clientes SET nome = ?, cpf = ?, email = ? WHERE id = ?')
    .run(nome, cpf, email, id);

  return buscarPorId(id);
}

export function remover(id) {
  const resultado = db.prepare('DELETE FROM clientes WHERE id = ?').run(id);
  return resultado.changes > 0;
}