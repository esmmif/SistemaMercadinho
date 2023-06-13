package br.com.api.produtos.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.modelo.*;
import br.com.api.produtos.servico.ProdutoServico;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoControle {

    @Autowired
    private ProdutoServico ps;

    /**
     * Obtém um produto com base no código fornecido.
     *
     * @param codigo o código do produto
     * @return a resposta HTTP contendo o produto
     */
    @GetMapping("/alterar/{codigo}")
    public ResponseEntity<ProdutoModelo> obterPorCodigo(@PathVariable long codigo) {
        return ps.obterPorCodigo(codigo);
    }

    /**
     * Remove um produto com base no código fornecido.
     *
     * @param codigo o código do produto a ser removido
     * @return a resposta HTTP indicando o resultado da remoção
     */
    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo) {
        return ps.remover(codigo);
    }

    /**
     * Altera um produto com base no código fornecido e nas informações do produto fornecidas.
     *
     * @param pm as informações do produto a serem alteradas
     * @return a resposta HTTP indicando o resultado da alteração
     */
    @PutMapping("/alterar/{codigo}")
    public ResponseEntity<?> alterar(@RequestBody ProdutoModelo pm) {
        return ps.cadastrarAlterar(pm, "alterar");
    }

    /**
     * Cadastra um novo produto com base nas informações fornecidas.
     *
     * @param pm as informações do produto a serem cadastradas
     * @return a resposta HTTP indicando o resultado do cadastro
     */
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo pm) {
        return ps.cadastrarAlterar(pm, "cadastrar");
    }

    /**
     * Cadastra uma nova venda com base nos códigos de produtos e quantidades fornecidos.
     *
     * @param venda um mapa contendo os códigos de produtos e suas quantidades
     * @return a resposta HTTP indicando o resultado do cadastro da venda
     */
    @PostMapping("/vendas")
    public ResponseEntity<?> cadastrarVenda(@RequestBody Map<String, List<Long>> venda) {
        List<Long> codigosProdutos = venda.get("codigosProdutos");
        List<Integer> quantidades = new ArrayList<>();

        List<Long> vendaQuantidades = venda.get("quantidades");
        for (Long quantidade : vendaQuantidades) {
            quantidades.add(quantidade.intValue());
        }

        return ps.cadastrarVenda(codigosProdutos, quantidades);
    }

    /**
     * Retorna a lista de todos os produtos.
     *
     * @return a lista de produtos
     */
    @GetMapping("/listar")
    public Iterable<ProdutoModelo> listar() {
        return ps.listar();
    }

    /**
     * Retorna a lista de todas as vendas.
     *
     * @return a lista de vendas
     */
    @GetMapping("/listar-vendas")
    public Iterable<VendaModelo> listarVendas() {
        return ps.listarVendas();
    }

    /**
     * Rota inicial do sistema.
     *
     * @return uma mensagem indicando que o sistema está funcionando
     */
    @GetMapping("/")
    public String rota() {
        return "Sistema Mercadinho funcionando!";
    }

}
