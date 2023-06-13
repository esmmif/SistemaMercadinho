import React, { useState, useEffect } from "react";
import Bootstrap from "./Bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

export default function Venda({ botao }) {
  // UseState
  const [produtos, setProdutos] = useState([]);
  const [selectedProdutos, setSelectedProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [produtoQuantidade, setProdutoQuantidade] = useState({});
  const [selectedProduto, setSelectedProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const navigate = useNavigate();

  // UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then((response) => response.json())
      .then((data) => {
        setProdutos(data);
        const initialProdutoQuantidade = {};
        data.forEach((produto) => {
          initialProdutoQuantidade[produto.codigo] = produto.quantidade;
        });
        setProdutoQuantidade(initialProdutoQuantidade);
      })
      .catch((error) => console.error("Erro em listar produtos:", error));
  }, []);

  // Funções
  const handleProdutoChange = (event) => {
    const { value } = event.target;
    setSelectedProduto(value);
  };

  const handleQuantidadeChange = (event) => {
    const { value } = event.target;
    setQuantidade(value);
  };

  //Adicionar Produto
  const handleAddProduto = () => {
    if (selectedProduto && quantidade) {
      const selectedProdutoObj = produtos.find(
        (produto) => produto.codigo === parseInt(selectedProduto)
      );

      const existingIndex = selectedProdutos.findIndex(
        (produto) => produto.codigo === selectedProdutoObj.codigo
      );

      if (existingIndex !== -1) {
        // Se Produto ja existe na Prévia
        const updatedQuantidades = [...quantidades];
        updatedQuantidades[existingIndex] = quantidade;
        setQuantidades(updatedQuantidades);
      } else {
        // Se o Produto não existe ainda na Prévia
        setSelectedProdutos([...selectedProdutos, selectedProdutoObj]);
        setQuantidades([...quantidades, quantidade]);
      }

      setSelectedProduto("");
      setQuantidade("");
    }
  };

  //Efetuar a Venda
  const handleVendaSubmit = (event) => {
    event.preventDefault();

    const codigosProdutos = selectedProdutos.map((produto) => produto.codigo);

    const vendaData = {
      codigosProdutos: codigosProdutos,
      quantidades: quantidades,
    };

    fetch("http://localhost:8080/vendas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendaData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Venda created:", data);

        alert(data.mensagem);
        navigate("/historico");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating venda:", error);
      });
  };

  return (
    <Form>
      <Bootstrap />

      <div className="flex min-h-full flex-1 justify-between px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-lg font-bold text-gray-900 text-center">
            Selecione os produtos a serem vendidos
          </h3>
          <label className="block text-sm font-medium leading-6 text-gray-900 mt-2">
            Produto
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <select
              name="produto"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
              onChange={handleProdutoChange}
              value={selectedProduto}
            >
              <option value="">Selecionar</option>
              {produtos.map((produto) => (
                <option key={produto.codigo} value={produto.codigo}>
                  {produto.nome}
                </option>
              ))}
            </select>
          </div>

          <label className="block text-sm font-medium leading-6 text-gray-900 mt-2">
            Quantidade
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              type="number"
              name="quantidade"
              placeholder="Quantidade"
              className="block w-full rounded-md border-0 py-1.5 px-2 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
              onChange={handleQuantidadeChange}
              value={quantidade}
            />
          </div>

          <div className="flex items-center py-2 justify-between">
            <div className="flex-shrink-0 py-1 px-1 rounded">
              <input
                type="button"
                value="+ Adicionar Produto"
                className="btn bg-black text-white"
                onClick={handleAddProduto}
              />
            </div>
          </div>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {selectedProdutos.length > 0 && (
            <>
              <div className="mt-1">
                <h3 className="text-lg font-bold text-gray-900 text-center">
                  Prévia da Venda
                </h3>
                <div className="flex">
                  <div className="w-1/2 font-semibold">Produto</div>
                  <div className="w-1/2 font-semibold text-right">
                    Quantidade
                  </div>
                </div>
                <ul className="divide-y divide-gray-200">
                  {selectedProdutos.map((produto, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 py-2"
                    >
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="mb-1 mt-1 text-sm font-semibold leading-2 text-gray-900 align-middle">
                            {produto.nome}
                          </p>
                          <p className="mb-1 mt-1 truncate text-xs leading-2 text-gray-500 ">
                            Em estoque: {produto.quantidade}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900 mb-1 mt-1">
                          {quantidades[index]}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center py-2 justify-between">
                  <Link
                    to="/historico"
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
                      value="Confirmar"
                      className="btn btn-success"
                      onClick={handleVendaSubmit}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Form>
  );
}
