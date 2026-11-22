import * as clienteService from '../services/clienteService.js';

export function listar(req, res) {
  const clientes = clienteService.listar();
  res.json(clientes);
}

export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const cliente = clienteService.buscarPorId(id);
  res.json(cliente);
}

export function criar(req, res) {
  const novo = clienteService.criar(req.body);
  res.status(201).json(novo);
}

export function atualizar(req, res) {
  const id = Number(req.params.id);
  const atualizado = clienteService.atualizar(id, req.body);
  res.json(atualizado);
}

export function remover(req, res) {
  const id = Number(req.params.id);
  clienteService.remover(id);
  res.status(204).send();
}