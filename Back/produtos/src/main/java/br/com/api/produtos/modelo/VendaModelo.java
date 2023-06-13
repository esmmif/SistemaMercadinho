package br.com.api.produtos.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "vendas")
@Getter
@Setter

public class VendaModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToMany
    @JoinTable(
            name = "venda_produto",
            joinColumns = @JoinColumn(name = "venda_id"),
            inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private List<ProdutoModelo> produtos;

    @ElementCollection
    private List<Integer> quantidades;

    @CollectionTable(name = "venda_quantidade", joinColumns = @JoinColumn(name = "venda_id"))
    @Column(name = "quantidade")

    private double valorTotal;

    private LocalDate dataVenda;

}
