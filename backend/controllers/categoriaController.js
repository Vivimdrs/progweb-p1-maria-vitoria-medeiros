import * as categoriaService from '../services/categoriaService.js';

export function listar(req, res) {
  const categorias = categoriaService.listar();
  res.json(categorias);
}

export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const categoria = categoriaService.buscarPorId(id);
  res.json(categoria);
}

export function criar(req, res) {
  const nova = categoriaService.criar(req.body);
  res.status(201).json(nova);
}

export function atualizar(req, res) {
  const id = Number(req.params.id);
  const atualizada = categoriaService.atualizar(id, req.body);
  res.json(atualizada);
}

export function remover(req, res) {
  const id = Number(req.params.id);
  categoriaService.remover(id);
  res.status(204).send();
}