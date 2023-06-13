package br.com.api.produtos.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.api.produtos.modelo.VendaModelo;

/**
 * Interface de repositório para operações de acesso a dados relacionadas às vendas.
 */
public interface VendaRepositorio extends CrudRepository<VendaModelo, Long> {

}
