# Sistema Mercadinho

Este é um projeto de um sistema web chamado Sistema Mercadinho, que foi desenvolvido como Projeto Final da Cadeira de **Programação Orientada a Objetos**.

**Curso:** Ciência da Computação  
**Instituição:** Instituto Federal de Educação, Ciência e Tecnologia do Ceará - Campus Maracanaú

### Backend (Java - Spring Boot)

O backend do Sistema Mercadinho foi desenvolvido com Java, utilizando o framework Spring Boot, e utiliza o banco de dados MySQL. Ele oferece os seguintes endpoints:

- **`GET /alterar/{codigo}`**: Retorna as informações de um produto pelo código.
- **`PUT /alterar/{codigo}`**: Altera as informações de um produto existente. Envie um objeto JSON com as informações atualizadas do produto.
- **`POST /cadastrar`**: Cadastra um novo produto. Envie um objeto JSON com as informações do produto.
- **`POST /vendas`**: Cadastra uma venda de produtos. Envie um objeto JSON com os códigos dos produtos e as quantidades.
- **`DELETE /remover/{codigo}`**: Remove um produto pelo código.
- **`GET /listar`**: Retorna todos os produtos cadastrados.
- **`GET /listar-vendas`**: Retorna todas as vendas cadastradas.
- **`GET /`**: Retorna uma mensagem indicando que o Sistema Mercadinho está funcionando.

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

- Navegue até o diretório do projeto: **`cd Back`**
- Execute o projeto usando o Maven Wrapper: **`./mvnw spring-boot:run`**
- A API estará disponível em: **`http://localhost:8080`**
- Uma vez instalada, no diretório Back\produtos\src\main\java\br\com\api\produtos, você pode executar a classe `ProdutosApplication` para iniciar a aplicação posteriormente.

2. Para iniciar a aplicação do Sistema Mercadinho execute:

   ```shell
   cd sm-app
   npm install
   npm start
   ```

O aplicativo estará disponível em **`http://localhost:3030`**
