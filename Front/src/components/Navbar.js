import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import Bootstrap from "./Bootstrap";

//Barra de navegação

const navigation = [
  { name: "Estoque", href: "/estoque" },
  { name: "Adicionar Produto", href: "/adicionar" },
  { name: "Vender", href: "/paginadevendas" },
  { name: "Histórico de Vendas", href: "/historico" },
];

export default function Navbar(props) {
  return (
    <>
      <Bootstrap />
      <Disclosure as="nav" className="bg-black">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <NavLink to="/">
                      <img
                        className="h-8 w-30"
                        src={require("./logo.png")}
                        alt="Sistema Mercadinho"
                      />
                    </NavLink>
                  </div>
                  <div className="hidden lg:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) => {
                            return (
                              "rounded-md px-3 py-2 text-sm font-semibold no-underline " +
                              (isActive
                                ? " bg-gray-700  text-white"
                                : " bg-gray-900 text-white hover:bg-gray-700 hover:text-white")
                            );
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex lg:hidden">
                  {/* Mobile menu button */}

                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                      return (
                        "block rounded-md px-3 py-2 text-base font-medium no-underline" +
                        (isActive
                          ? " bg-gray-700  text-white "
                          : " bg-gray-900 text-white hover:bg-gray-700 hover:text-white")
                      );
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
