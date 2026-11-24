import db from '../db.js';

export function listarTodas() {
  return db.prepare('SELECT id, nome, descricao FROM categorias').all();
}

export function buscarPorId(id) {
  return db.prepare('SELECT id, nome, descricao FROM categorias WHERE id = ?').get(id);
}

export function buscarPorNome(nome) {
  return db
    .prepare('SELECT id, nome, descricao FROM categorias WHERE LOWER(nome) = LOWER(?)')
    .get(nome.trim());
}

export function criar({ nome, descricao }) {
  const resultado = db
    .prepare('INSERT INTO categorias (nome, descricao) VALUES (?, ?)')
    .run(nome, descricao);
  return buscarPorId(Number(resultado.lastInsertRowid));
}

export function atualizar(id, { nome, descricao }) {
  const existente = buscarPorId(id);
  if (!existente) return null;

  db.prepare('UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?').run(
    nome,
    descricao,
    id
  );
  return buscarPorId(id);
}

export function remover(id) {
  const resultado = db.prepare('DELETE FROM categorias WHERE id = ?').run(id);
  return resultado.changes > 0;
}