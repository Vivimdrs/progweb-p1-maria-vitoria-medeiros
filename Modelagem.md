# Modelagem do Sistema — Bazar & Brechó

## 1. Domínio da Aplicação
O sistema gerencia as operações de um Bazar e Brechó comunitário. Ele controla a entrada de itens doados, a organização do catálogo por categorias, o registro das vendas para os clientes e o fluxo financeiro gerado para doações beneficentes.

## 2. Entidades, Atributos e Relacionamentos

* **Categoria (`Category`)**
  * **Atributos:** `id` (UUID), `name` (String), `description` (String)
  * **Relacionamento:** Possui vários `Product` (1 para N).

* **Produto (`Product`)**
  * **Atributos:** `id` (UUID), `title` (String), `price` (Number), `condition` (String - ex: "Novo", "Usado - Bom"), `categoryId` (UUID)
  * **Relacionamento:** Pertence a uma `Category` (N para 1) e pode estar presente em vários `SaleItem` (1 para N).

* **Cliente (`Customer`)**
  * **Atributos:** `id` (UUID), `name` (String), `email` (String), `phone` (String)
  * **Relacionamento:** Realiza várias `Sale` (1 para N).

* **Venda (`Sale`)**
  * **Atributos:** `id` (UUID), `date` (Date), `totalAmount` (Number), `customerId` (UUID)
  * **Relacionamento:** Pertence a um `Customer` (N para 1) e possui vários `SaleItem` (1 para N).

* **Item da Venda (`SaleItem`)**
  * **Atributos:** `id` (UUID), `saleId` (UUID), `productId` (UUID), `quantity` (Number), `unitPrice` (Number)
  * **Relacionamento:** Pertence a uma `Sale` (N para 1) e referencia um `Product` (N para 1).

---

## 3. Diagrama de Classes (Mermaid)

```mermaid
classDiagram
    class Category {
        +UUID id
        +String name
        +String description
    }

    class Product {
        +UUID id
        +String title
        +Number price
        +String condition
        +UUID categoryId
    }

    class Customer {
        +UUID id
        +String name
        +String email
        +String phone
    }

    class Sale {
        +UUID id
        +Date date
        +Number totalAmount
        +UUID customerId
    }

    class SaleItem {
        +UUID id
        +UUID saleId
        +UUID productId
        +Number quantity
        +Number unitPrice
    }

    %% Interfaces dos Repositórios (DIP)
    class ICategoryRepository {
        <<interface>>
        +save(category)
        +findById(id)
    }

    class IProductRepository {
        <<interface>>
        +save(product)
        +findById(id)
    }

    class ICustomerRepository {
        <<interface>>
        +save(customer)
        +findById(id)
    }

    class ISaleRepository {
        <<interface>>
        +save(sale)
        +findById(id)
    }

    %% Serviços (Regras de Negócio)
    class CategoryService {
        -ICategoryRepository categoryRepository
        +createCategory(data)
    }

    class ProductService {
        -IProductRepository productRepository
        +registerProduct(data)
    }

    class CustomerService {
        -ICustomerRepository customerRepository
        +registerCustomer(data)
    }

    class SaleService {
        -ISaleRepository saleRepository
        -IProductRepository productRepository
        +processSale(customerId, items)
    }

    %% Relacionamentos do Domínio
    Category "1" -- "*" Product
    Customer "1" -- "*" Sale
    Sale "1" -- "*" SaleItem
    Product "1" -- "*" SaleItem

    %% Inversão de Dependência (Services -> Repository Interfaces)
    CategoryService ..> ICategoryRepository
    ProductService ..> IProductRepository
    CustomerService ..> ICustomerRepository
    SaleService ..> ISaleRepository
    SaleService ..> IProductRepository

Entidade,     Quem cuida da regra (Service),       Quem cuida dos dad(Repository)
Category      CategoryService ,ICategoryRepository CategoryRepository
Item          itemService                           ItemRepository 
Sale          SaleService                          ISaleRepository / SaleRepository 

    SRP: Cada classe de modelo guarda apenas os seus dados, os Services cuidam apenas das regras de negócio e validações, e os Repositories cuidam exclusivamente do salvamento/busca de dados.

    DIP: As classes de serviço dependem de interfaces (ICategoryRepository, IItemRepository, ISaleRepository) em vez de se conectarem diretamente ao banco de dados.