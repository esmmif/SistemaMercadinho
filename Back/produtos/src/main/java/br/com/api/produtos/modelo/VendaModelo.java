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

    /**
     * As quantidades dos produtos na venda.
     */
    @ElementCollection
    private List<Integer> quantidades;

    @Column(name = "valor_total")
    private double valorTotal;

    /**
     * A data da venda.
     */
    private LocalDate dataVenda;

}
