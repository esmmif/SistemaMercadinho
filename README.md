# Sistema Mercadinho

Este é um projeto de um sistema web chamado Sistema Mercadinho, que foi desenvolvido como Projeto Final da Cadeira de **Programação Orientada a Objetos**.

**Curso:** Ciência da Computação  
**Instituição:** Instituto Federal de Educação, Ciência e Tecnologia do Ceará - Campus Maracanaú

**Alunos:**
- Allan Neil Gomes
- Davi Cassundé
- Esmeraldo
- Reulisson Gabriel

### Backend (Java - Spring Boot)

O backend do Sistema Mercadinho foi desenvolvido com Java, utilizando o framework Spring Boot, e utiliza o banco de dados MySQL. Ele oferece os seguintes endpoints:

- __`GET /alterar/{codigo}`__: Retorna as informações de um produto pelo código.
- __`PUT /alterar/{codigo}`__: Altera as informações de um produto existente. Envie um objeto JSON com as informações atualizadas do produto.
- __`POST /cadastrar`__: Cadastra um novo produto. Envie um objeto JSON com as informações do produto.
- __`POST /vendas`__: Cadastra uma venda de produtos. Envie um objeto JSON com os códigos dos produtos e as quantidades.
- __`DELETE /remover/{codigo}`__: Remove um produto pelo código.
- __`GET /listar`__: Retorna todos os produtos cadastrados.
- __`GET /listar-vendas`__: Retorna todas as vendas cadastradas.
- __`GET /`__: Retorna uma mensagem indicando que o Sistema Mercadinho está funcionando.

### Frontend (React.js - Tailwind CSS)

- O frontend do Sistema Mercadinho foi desenvolvido com JavaScript em React.js e Tailwind CSS, implementando as seguintes páginas:

#### Estoque

- Lista todos os produtos em estoque.
- Permite editar as informações dos produtos.

#### Adicionar Produto

- Permite adicionar um novo produto ao estoque.

#### Vender

- Permite cadastrar uma venda, registrando os itens vendidos e suas quantidades correspondentes.

#### Histórico

- Lista todas as vendas cadastradas juntamente com suas datas.

## Executando o projeto

Para executar o Sistema Mercadinho localmente, siga os passos abaixo:

1. Para iniciar base de dados:
- Navegue até o diretório do projeto: __`cd Back`__
- Execute o projeto usando o Maven Wrapper: __`./mvnw spring-boot:run`__
- A API estará disponível em: __`http://localhost:8080`__
- Uma vez instalada, no diretório Back\produtos\src\main\java\br\com\api\produtos, você pode executar a classe `ProdutosApplication` para iniciar a aplicação posteriormente.

2. Para iniciar a aplicação do Sistema Mercadinho execute:

   ```shell
   cd sm-app
   npm install
   npm start

O aplicativo estará disponível em __`http://localhost:3030`__
