export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const mensagem = err.message || 'Erro interno do servidor.';
  res.status(status).json({ erro: mensagem });
}