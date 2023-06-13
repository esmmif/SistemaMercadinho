package br.com.api.produtos.repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.api.produtos.modelo.ProdutoModelo;

public interface ProdutoRepositorio extends CrudRepository<ProdutoModelo, Long> {
    
}
