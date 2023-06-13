import Bootstrap from "./Bootstrap";
import { Link } from "react-router-dom";

//Formulário de Cadastro de novo Produto

export default function Formulario({ eventoTeclado, cadastrar, obj }) {
  return (
    <>
      <form>
        <Bootstrap />

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900 mt-2"
            >
              Nome
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="nome"
                placeholder="Nome do produto..."
                value={obj.nome}
                onChange={eventoTeclado}
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
                placeholder="R$"
                value={obj.preco}
                onChange={eventoTeclado}
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
                value={obj.quantidade}
                onChange={eventoTeclado}
                className="block w-full rounded-md border-0 py-1.5 px-2 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex items-center py-2 justify-between">
              <div className="flex-shrink-0 py-1 px-1 rounded">
                <input
                  type="button"
                  value="Adicionar"
                  onClick={cadastrar}
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
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
