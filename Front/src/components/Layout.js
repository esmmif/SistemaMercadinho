import React from "react";
import Navbar from "./Navbar";

//Layout das páginas
export default function Layout(props, { pageTitle, child }) {
  return (
    <>
      <Navbar />

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {props.children}
        </div>
      </main>
      <footer className="py-6 bg-gray-800 ">
        <p className="text-lg text-white px-4">
          <p>
            Ferramenta desenvolvida como Projeto Final da Cadeira de Programação
            Orientada a Objetos
            <br />
            Curso de Ciência da Computação
            <br />
            Instituto Federal de Educação, Ciência e Tecnologia do Ceará
            <br />
            Campus Maracanaú
          </p>
        </p>
      </footer>
    </>
  );
}
