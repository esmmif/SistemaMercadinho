import { useEffect, useState } from "react";
import { Fragment } from "react";
import Layout from "./components/Layout";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Estoque from "./pages/Estoque";
import PaginaAddProduto from "./pages/Adicionar";
import Historico from "./pages/Historico";
import PaginaDeVendas from "./pages/PaginaDeVendas";
import PaginaAlterarProduto from "./pages/Alterar";

import "./App.css";

export default function App() {
  // Objeto produto
  const produto = {
    codigo: 0,
    nome: "",
    preco: 0.0,
    quantidade: 0,
  };
  // UseState
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  // UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/produto/" + objProduto.codigo)
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setObjProduto(retorno_convertido));
  });

  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProdutos(retorno_convertido));
  }, []);

  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/listar-vendas")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setVendas(retorno_convertido));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="sm-app" element={<Home />} />
            <Route path="estoque" element={<Estoque produtos={produtos} />} />
            <Route path="adicionar" element={<PaginaAddProduto />} />
            <Route path="historico" element={<Historico vendas={vendas} />} />
            <Route path="paginadevendas" element={<PaginaDeVendas />} />
            <Route
              path="estoque/alterar/:id"
              element={<PaginaAlterarProduto produto={objProduto} />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}
