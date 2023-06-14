package br.com.api.produtos.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.modelo.*;
import br.com.api.produtos.repositorio.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProdutoServico {

    @Autowired
    private ProdutoRepositorio pr;

    @Autowired
    private VendaRepositorio vr;

    @Autowired
    private RespostaModelo rm;

    /**
     * Obtém um produto pelo código.
     *
     * @param codigo O código do produto.
     * @return A resposta contendo o produto encontrado ou uma resposta de erro.
     */
    public ResponseEntity<ProdutoModelo> obterPorCodigo(long codigo) {
        ProdutoModelo produto = pr.findById(codigo).orElse(null);

        if (produto != null) {
            return new ResponseEntity<ProdutoModelo>(produto, HttpStatus.OK);
        } else {
            return new ResponseEntity<ProdutoModelo>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Lista todos os produtos.
     *
     * @return A lista de produtos.
     */
    public Iterable<ProdutoModelo> listar() {
        return pr.findAll();
    }

    /**
     * Lista todas as vendas.
     *
     * @return A lista de vendas.
     */
    public Iterable<VendaModelo> listarVendas() {
        return vr.findAll();
    }

    /**
     * Realiza o cadastro ou a alteração de um produto.
     *
     * @param pm    O objeto do produto a ser cadastrado ou alterado.
     * @param acao  A ação a ser realizada (cadastrar ou alterar).
     * @return A resposta contendo o produto cadastrado ou alterado ou uma resposta de erro.
     */
    public ResponseEntity<?> cadastrarAlterar(ProdutoModelo pm, String acao) {
        // Implementação do método cadastrarAlterar atual

        if (pm.getNome().equals("")) {
            rm.setMensagem("O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.OK);
            }
        }
    }

    /**
     * Remove um produto pelo código.
     *
     * @param codigo O código do produto a ser removido.
     * @return A resposta indicando o sucesso ou erro na remoção do produto.
     */
    public ResponseEntity<RespostaModelo> remover(long codigo) {
        ProdutoModelo produto = pr.findById(codigo).orElse(null);

        if (produto == null) {
            rm.setMensagem("Produto com código " + codigo + " não encontrado!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.NOT_FOUND);
        }

        // Verifica se o produto está presente em alguma venda
        Iterable<VendaModelo> vendas = vr.findAll();
        for (VendaModelo venda : vendas) {
            List<ProdutoModelo> produtos = venda.getProdutos();
            if (produtos.contains(produto)) {
                rm.setMensagem("O produto está presente em uma venda e não pode ser removido!");
                return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
            }
        }

        pr.deleteById(codigo);

        rm.setMensagem("Produto removido com sucesso");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }

    /**
     * Realiza o cadastro de uma venda.
     *
     * @param codigosProdutos Os códigos dos produtos da venda.
     * @param quantidades     As quantidades dos produtos da venda.
     * @return A resposta indicando o sucesso ou erro no cadastro da venda.
     */
    public ResponseEntity<?> cadastrarVenda(List<Long> codigosProdutos, List<Integer> quantidades) {
        // Verifica se a lista de códigos de produtos e quantidades têm o mesmo tamanho
        if (codigosProdutos.size() != quantidades.size()) {
            rm.setMensagem("A lista de códigos de produtos e quantidades deve ter o mesmo tamanho!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }

        // Verifica se todos os produtos existem no banco de dados
        List<ProdutoModelo> produtos = new ArrayList<>();
        for (int i = 0; i < codigosProdutos.size(); i++) {
            long codigo = codigosProdutos.get(i);
            ProdutoModelo produto = pr.findById(codigo).orElse(null);
            if (produto == null) {
                rm.setMensagem("Produto com código " + codigo + " não encontrado!");
                return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
            }
            produtos.add(produto);
        }

        // Verifica se há quantidade suficiente de cada produto
        for (int i = 0; i < produtos.size(); i++) {
            ProdutoModelo produto = produtos.get(i);
            int quantidadeVendida = quantidades.get(i);
            if (produto.getQuantidade() < quantidadeVendida) {
                rm.setMensagem("Quantidade insuficiente do produto " + produto.getNome());
                return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
            }
        }

        // Calcula o valor total da venda
        double valorTotal = 0;
        for (int i = 0; i < produtos.size(); i++) {
            ProdutoModelo produto = produtos.get(i);
            int quantidadeVendida = quantidades.get(i);
            valorTotal += produto.getPreco() * quantidadeVendida;
        }

        // Atualiza a quantidade de produtos no banco de dados
        for (int i = 0; i < produtos.size(); i++) {
            ProdutoModelo produto = produtos.get(i);
            int quantidadeVendida = quantidades.get(i);
            int novaQuantidade = produto.getQuantidade() - quantidadeVendida;
            produto.setQuantidade(novaQuantidade);
            pr.save(produto);
        }

        // Cria a nova venda
        VendaModelo venda = new VendaModelo();
        venda.setProdutos(produtos);
        venda.setQuantidades(quantidades);
        venda.setValorTotal(valorTotal);
        venda.setDataVenda(LocalDate.now());
        vr.save(venda);

        rm.setMensagem("Venda cadastrada com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.CREATED);
    }
}
