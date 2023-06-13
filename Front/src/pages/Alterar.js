import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Bootstrap from "../components/Bootstrap";

export default function PaginaAlterarProduto({ produto, ...props }) {
  let { id } = useParams();
  const navigate = useNavigate();

  // UseState
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState({});

  // UseEffect
  useEffect(() => {
    fetch(`http://localhost:8080/alterar/${id}`)
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setObjProduto(retorno_convertido));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProdutos(retorno_convertido));
  }, []);

  // Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  };

  // Alterar produto
  const alterar = () => {
    fetch(`http://localhost:8080/alterar/${id}`, {
      method: "put",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          // Mensagem
          alert("Produto alterado com sucesso!");

          // Cópia do vetor de produtos
          let vetorTemp = [...produtos];

          // Índice
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });

          // Alterar produto do vetorTemp
          vetorTemp[indice] = objProduto;

          // Atualizar o vetor de produtos
          setProdutos(vetorTemp);

          navigate("/estoque");
          window.location.reload();
        }
      });
  };

  // Remover produto
  const remover = () => {
    fetch(`http://localhost:8080/remover/${id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json();
        }
      })
      .then((retorno_convertido) => {
        alert(retorno_convertido.mensagem);

        let vetorTemp = [...produtos];
        let indice = vetorTemp.findIndex((p) => p.codigo === objProduto.codigo);
        vetorTemp.splice(indice, 1);
        setProdutos(vetorTemp);

        navigate("/estoque");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Editar Produto
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <form>
            <Bootstrap />

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 mt-2"
                >
                  Nome
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome do produto..."
                    value={objProduto.nome}
                    onChange={aoDigitar}
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  />
                </div>

                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900 mt-2"
                >
                  Preço
                </label>

                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">R$</span>
                  </div>
                  <input
                    type="number"
                    name="preco"
                    placeholder="0,00"
                    value={objProduto.preco}
                    onChange={aoDigitar}
                    className="block w-full rounded-md border-0 py-1.5 pl-9  pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  />
                </div>

                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900 mt-2"
                >
                  Quantidade
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="quantidade"
                    placeholder="Quantidade"
                    value={objProduto.quantidade}
                    onChange={aoDigitar}
                    className="block w-full rounded-md border-0 py-1.5 px-2 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex items-center py-2 justify-between">
                  <div
                    className="flex-shrink-0 py-1 px-1 rounded"
                    type="button"
                  >
                    <input
                      type="button"
                      value="Salvar Alterações"
                      onClick={alterar}
                      className="btn btn-primary"
                    />
                  </div>

                  <Link
                    to="/estoque"
                    className="flex-shrink-0 py-1 px-1 rounded"
                    type="button"
                  >
                    <input
                      type="button"
                      value="Cancelar"
                      className="btn btn-secondary"
                    />
                  </Link>

                  <div className="flex-shrink-0 py-1 px-1 rounded">
                    <input
                      type="button"
                      value="Remover"
                      onClick={remover}
                      className="btn btn-danger"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
