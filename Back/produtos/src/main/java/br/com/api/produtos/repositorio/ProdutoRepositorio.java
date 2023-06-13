package br.com.api.produtos.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.api.produtos.modelo.ProdutoModelo;

/**
 * Interface de repositório para operações de acesso a dados relacionadas aos produtos.
 */
public interface ProdutoRepositorio extends CrudRepository<ProdutoModelo, Long> {
    
}
