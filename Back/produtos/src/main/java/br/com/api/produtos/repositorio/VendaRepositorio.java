package br.com.api.produtos.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.api.produtos.modelo.VendaModelo;

public interface VendaRepositorio extends CrudRepository<VendaModelo, Long> {

}
