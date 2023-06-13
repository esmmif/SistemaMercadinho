import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";

//Página de adicionar Produto

export default function PaginaAddProduto() {
  const navigate = useNavigate();

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

  // Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  };

  // Cadastrar produto
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method: "post",
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
          setProdutos([...produtos, retorno_convertido]);
          alert("Produto cadastrado com sucesso!");

          navigate("/estoque");
          window.location.reload();
        }
      });
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Adicionar Produto
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Formulario
            eventoTeclado={aoDigitar}
            cadastrar={cadastrar}
            obj={objProduto}
          />
        </div>
      </main>
    </>
  );
}
