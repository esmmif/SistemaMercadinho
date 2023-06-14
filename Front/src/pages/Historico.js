import React from "react";
import Bootstrap from "../components/Bootstrap";

//Página de Historico de Vendas
export default function Historico({ vendas }) {
  let quantidades = [];
  for (let i = 0; i < vendas.length; i++) {
    quantidades.push(vendas[i].quantidades);
  }

  function converterData(dataString) {
    const partes = dataString.split("-");
    const dia = partes[2];
    const mes = partes[1];
    const ano = partes[0];

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Histórico
          </h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <table className="table">
            <Bootstrap />
            <thead>
              <tr>
                <th>ID</th>
                <th>Produtos</th>
                <th>Quantidades</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {vendas.map((obj, indice) => (
                <tr key={indice}>
                  <td>{indice + 1}</td>
                  <td>
                    {obj.produtos.map((produto) => (
                      <p key={produto.id}>{produto.nome}</p>
                    ))}
                  </td>
                  <td>
                    {obj.quantidades.map((quantidade) => (
                      <p key={quantidade}>{quantidade}</p>
                    ))}
                  </td>
                  <td>
                    {obj.valorTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{converterData(obj.dataVenda)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
