import Bootstrap from "./Bootstrap";
import React, { useState, useEffect } from "react";
import {
  PencilIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

//Tabela com o Estoque e uma barra de pesquisa

export default function Tabela({ vetor }) {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProdutos(retorno_convertido));
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = produtos.filter((produto) => {
        return Object.values(produto)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults([]);
    }
  };

  const dataToRender = searchInput !== "" ? filteredResults : vetor;

  return (
    <div style={{ padding: 20 }}>
      <div className="flex justify-center">
        <div className="relative rounded-md shadow-sm mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassCircleIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              placeholder="Pesquisar produto"
              value={searchInput}
              className="pl-10 pr-20 py-1.5 rounded-md border-1 border-black text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
              onChange={(e) => searchItems(e.target.value)}
            />
          </div>
        </div>
      </div>

      <table className="table">
        <Bootstrap />
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
          </tr>
        </thead>

        <tbody>
          {dataToRender.map((obj, indice) => (
            <tr key={indice}>
              <td>{obj.codigo}</td>
              <td>{obj.nome}</td>
              <td>
                {obj.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>{obj.quantidade}</td>
              <td>
                <Link
                  to={`alterar/${obj.codigo}`}
                  className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 no-underline"
                >
                  <PencilIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
