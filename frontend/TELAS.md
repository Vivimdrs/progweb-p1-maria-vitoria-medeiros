# Documentação de Estados da Interface — Bazar & Brechó (`frontend/`)

Aplicação servida em `http://localhost:5500` (`npx http-server -p 5500 -c-1` dentro de `frontend/`) consumindo a API em `http://localhost:3000` (`npm run dev` dentro de `backend/`).

## 1. Estados das Listas (Categorias e Produtos)

| Estado | Como Provocar na Interface | Comportamento Esperado |
|--------|----------------------------|------------------------|
| **Carregando** | Abrir a página ou clicar em **Recarregar** (visível instantaneamente ou usando DevTools → *Network* → *Slow 3G*). | O *spinner* do Bootstrap (`#cat-estado-carregando` / `#prod-estado-carregando`) é exibido enquanto a requisição `GET` aguarda resposta. |
| **Sucesso** | Com o `backend/` rodando e itens cadastrados, abrir `http://localhost:5500`. | As tabelas (`#tabela-categorias` e `#tabela-produtos`) são preenchidas via `textContent` com os registros da API e os botões **Editar** e **Remover**. |
| **Vazio** | Remover todas as categorias/produtos cadastrados clicando em **Remover**, ou filtrar os produtos por uma categoria que ainda não possui itens. | A tabela é ocultada e o alerta neutro (`Nenhuma categoria cadastrada.` / `Nenhum produto encontrado para o filtro selecionado.`) é exibido. |
| **Erro** | Parar o servidor do `backend/` no terminal (`Ctrl + C`) e clicar em **Recarregar** em qualquer uma das listas. | O alerta vermelho (`alert-danger`) exibe a mensagem de falha de comunicação com a API. |

## 2. Erros de Regra de Negócio do Backend na Tela

| Cenário | Como Provocar | Status HTTP | Mensagem Exibida no `#area-aviso` |
|---------|---------------|-------------|-----------------------------------|
| **Categoria duplicada** | Tentar cadastrar uma nova categoria com o nome `"Roupas"` (já existente). | `409` | `Já existe uma categoria cadastrada com este nome.` |
| **Preço inválido** | Tentar cadastrar um produto informando preço `0` ou `-15`. | `400` | `O preço do produto deve ser um número maior que zero.` |
| **Campos obrigatórios** | Enviar o formulário de categoria ou produto com campos em branco. | `400` | `Nome e descrição da categoria são obrigatórios.` / `Título, preço, condição e categoriaId são obrigatórios.` |