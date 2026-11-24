export function mostrarAviso(mensagem, tipo = 'success') {
  const container = document.getElementById('area-aviso');
  container.textContent = '';

  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
  alerta.setAttribute('role', 'alert');
  alerta.textContent = mensagem;

  const btnFechar = document.createElement('button');
  btnFechar.type = 'button';
  btnFechar.className = 'btn-close';
  btnFechar.setAttribute('aria-label', 'Fechar');
  btnFechar.addEventListener('click', () => alerta.remove());

  alerta.appendChild(btnFechar);
  container.appendChild(alerta);
}

export function limparAviso() {
  const container = document.getElementById('area-aviso');
  if (container) container.textContent = '';
}