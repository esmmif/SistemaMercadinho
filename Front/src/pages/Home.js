import React from "react";

export default function Home() {
  return (
    <>
      <header className="bg-white shadow text-center">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Bem-vindo(a) ao Sistema Mercadinho
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Uma ferramenta de gerenciamento de mercado
          </p>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                Recursos
              </h2>

              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 p-4">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Estoque
                  </h3>
                  <p className="text-lg text-gray-600">
                    Tenha uma visão completa de todos os produtos em estoque e
                    edite suas informações.
                  </p>
                </div>
                <div className="w-full sm:w-1/2 p-4">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Adicionar Produto
                  </h3>
                  <p className="text-lg text-gray-600">
                    Adicione novos produtos ao estoque, mantendo seu inventário
                    sempre atualizado.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 p-4">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Vender
                  </h3>
                  <p className="text-lg text-gray-600">
                    Registre as vendas realizadas, incluindo os itens vendidos e
                    suas quantidades correspondentes.
                  </p>
                </div>
                <div className="w-full sm:w-1/2 p-4">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Histórico
                  </h3>
                  <p className="text-lg text-gray-600">
                    Acompanhe o histórico de vendas cadastradas, visualizando as
                    datas e informações relevantes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
