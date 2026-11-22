# Testes da API — Bazar & Brechó

Servidor rodando em `http://localhost:3000` (`npm run dev` dentro de `backend/`).

| # | Método | URL | Body (JSON) | Status Obtido | Resultado Esperado |
|---|--------|-----|-------------|---------------|--------------------|
| 1 | GET | `/categorias` | — | `200` | Lista as categorias iniciais cadastradas |
| 2 | POST | `/categorias` | `{"nome": "Acessórios", "descricao": "Bolsas, cintos e bijuterias"}` | `201` | Cria a categoria `Acessórios` com `id: 3` |
| 3 | POST | `/categorias` | `{"nome": "Acessórios", "descricao": "Duplicada"}` | `409` | Erro de regra: categoria já cadastrada |
| 4 | GET | `/categorias/99` | — | `404` | Erro: categoria não encontrada |
| 5 | POST | `/produtos` | `{"titulo": "Bolsa de Couro", "preco": 35, "condicao": "Usado - Bom", "categoriaId": 3}` | `201` | Cria o produto vinculado à categoria 3 |
| 6 | POST | `/produtos` | `{"titulo": "Item Sem Categoria", "preco": 20, "condicao": "Novo", "categoriaId": 99}` | `422` | Erro de regra: `categoriaId` inexistente |
| 7 | POST | `/produtos` | `{"titulo": "Item Preço Inválido", "preco": -10, "condicao": "Novo", "categoriaId": 1}` | `400` | Erro de regra: preço deve ser maior que zero |
| 8 | GET | `/produtos?categoriaId=1` | — | `200` | Filtra e retorna apenas produtos da categoria 1 |
| 9 | PUT | `/produtos/3` | `{"preco": 30}` | `200` | Atualiza o preço do produto 3 para `30` |
| 10 | DELETE | `/produtos/3` | — | `204` | Remove o produto 3 sem conteúdo na resposta |