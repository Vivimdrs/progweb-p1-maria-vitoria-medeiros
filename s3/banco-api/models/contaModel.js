import db from '../db.js';

export function listarTodas() {
  return db.prepare('SELECT id, numero, tipo, saldo, clienteId FROM contas').all();
}

export function buscarPorId(id) {
  return db.prepare('SELECT id, numero, tipo, saldo, clienteId FROM contas WHERE id = ?').get(id);
}

export function buscarPorNumero(numero) {
  return db.prepare('SELECT id, numero, tipo, saldo, clienteId FROM contas WHERE numero = ?').get(numero);
}

export function buscarPorClienteId(clienteId) {
  return db.prepare('SELECT id, numero, tipo, saldo, clienteId FROM contas WHERE clienteId = ?').all(clienteId);
}

export function criar({ numero, tipo, saldo = 0, clienteId }) {
  const resultado = db
    .prepare('INSERT INTO contas (numero, tipo, saldo, clienteId) VALUES (?, ?, ?, ?)')
    .run(numero, tipo, saldo, clienteId);
  return buscarPorId(Number(resultado.lastInsertRowid));
}

export function remover(id) {
  const resultado = db.prepare('DELETE FROM contas WHERE id = ?').run(id);
  return resultado.changes > 0;
}