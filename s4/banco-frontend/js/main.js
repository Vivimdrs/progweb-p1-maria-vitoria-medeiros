import * as clienteService from './services/clienteService.js';
import { store } from './state/store.js';
import { mostrarAviso, limparAviso } from './ui/aviso.js';
import * as clienteView from './ui/clienteView.js';

const form = document.getElementById('form-cliente');
const btnCancelar = document.getElementById('btn-cancelar');
const btnRecarregar = document.getElementById('btn-recarregar');

async function carregarClientes() {
  clienteView.exibirCarregando();
  try {
    store.clientes = await clienteService.listarClientes();
    clienteView.renderizarClientes(store.clientes, {
      onEditar: iniciarEdicao,
      onRemover: excluirCliente
    });
  } catch (erro) {
    clienteView.exibirErro(`Falha ao carregar clientes: ${erro.message}`);
  }
}

function iniciarEdicao(cliente) {
  limparAviso();
  store.editandoId = cliente.id;
  clienteView.preencherFormulario(cliente);
}

function cancelarEdicao() {
  store.editandoId = null;
  clienteView.limparFormulario();
}

async function excluirCliente(id) {
  limparAviso();
  try {
    await clienteService.removerCliente(id);
    if (store.editandoId === id) cancelarEdicao();
    mostrarAviso('Cliente removido com sucesso.');
    await carregarClientes();
  } catch (erro) {
    mostrarAviso(erro.message, 'danger');
  }
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  limparAviso();

  const formData = new FormData(form);
  const dados = {
    nome: formData.get('nome').trim(),
    cpf: formData.get('cpf').trim(),
    email: formData.get('email').trim()
  };

  try {
    if (store.editandoId) {
      await clienteService.atualizarCliente(store.editandoId, dados);
      mostrarAviso('Cliente atualizado com sucesso.');
    } else {
      await clienteService.criarCliente(dados);
      mostrarAviso('Cliente cadastrado com sucesso.');
    }
    cancelarEdicao();
    await carregarClientes();
  } catch (erro) {
    mostrarAviso(erro.message, 'danger');
  }
});

btnCancelar.addEventListener('click', cancelarEdicao);
btnRecarregar.addEventListener('click', carregarClientes);

carregarClientes();