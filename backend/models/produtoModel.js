import db from '../db.js';

export function listarTodos(categoriaId) {
  if (categoriaId) {
    return db
      .prepare('SELECT id, titulo, preco, condicao, categoriaId FROM produtos WHERE categoriaId = ?')
      .all(Number(categoriaId));
  }
  return db.prepare('SELECT id, titulo, preco, condicao, categoriaId FROM produtos').all();
}

export function buscarPorId(id) {
  return db
    .prepare('SELECT id, titulo, preco, condicao, categoriaId FROM produtos WHERE id = ?')
    .get(id);
}

export function criar({ titulo, preco, condicao, categoriaId }) {
  const resultado = db
    .prepare('INSERT INTO produtos (titulo, preco, condicao, categoriaId) VALUES (?, ?, ?, ?)')
    .run(titulo, preco, condicao, categoriaId);
  return buscarPorId(Number(resultado.lastInsertRowid));
}

export function atualizar(id, { titulo, preco, condicao, categoriaId }) {
  const existente = buscarPorId(id);
  if (!existente) return null;

  db.prepare(
    'UPDATE produtos SET titulo = ?, preco = ?, condicao = ?, categoriaId = ? WHERE id = ?'
  ).run(titulo, preco, condicao, categoriaId, id);

  return buscarPorId(id);
}

export function remover(id) {
  const resultado = db.prepare('DELETE FROM produtos WHERE id = ?').run(id);
  return resultado.changes > 0;
}