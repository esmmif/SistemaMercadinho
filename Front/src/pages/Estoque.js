import React from "react";
import Tabela from "../components/Tabela";

//Página de Estoque

export default function Estoque({ produtos }) {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Estoque
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Tabela vetor={produtos} />
        </div>
      </main>
    </>
  );
}
