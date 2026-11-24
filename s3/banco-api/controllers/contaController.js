import * as contaService from '../services/contaService.js';

export function listar(req, res) {
  res.json(contaService.listar());
}

export function buscarPorId(req, res) {
  res.json(contaService.buscarPorId(Number(req.params.id)));
}

export function criar(req, res) {
  const nova = contaService.criar(req.body);
  res.status(201).json(nova);
}

export function remover(req, res) {
  contaService.remover(Number(req.params.id));
  res.status(204).send();
}