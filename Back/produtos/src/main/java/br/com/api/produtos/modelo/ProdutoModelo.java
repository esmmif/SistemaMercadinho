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

    private String nome;
    private double preco;
    private int quantidade;

    @JsonIgnore
    @ManyToMany(mappedBy = "produtos")
    private List<VendaModelo> vendas;

}
