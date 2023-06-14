package br.com.api.produtos.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "produtos")
@Getter
@Setter
public class ProdutoModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long codigo;

    /**
     * O nome do produto.
     */
    private String nome;

    /**
     * O preço do produto.
     */
    private double preco;

    /**
     * A quantidade disponível do produto.
     */
    private int quantidade;

    @JsonIgnore
    @ManyToMany(mappedBy = "produtos")
    private List<VendaModelo> vendas;

}
