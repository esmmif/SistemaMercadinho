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

    @GetMapping("/alterar/{codigo}")
    public ResponseEntity<ProdutoModelo> obterPorCodigo(@PathVariable long codigo) {
        return ps.obterPorCodigo(codigo);
    }

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo) {
        return ps.remover(codigo);
    }

    @PutMapping("/alterar/{codigo}")
    public ResponseEntity<?> alterar(@RequestBody ProdutoModelo pm) {
        return ps.cadastrarAlterar(pm, "alterar");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo pm) {
        return ps.cadastrarAlterar(pm, "cadastrar");
    }

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

    @GetMapping("/listar")
    public Iterable<ProdutoModelo> listar() {
        return ps.listar();
    }

    @GetMapping("/listar-vendas")
    public Iterable<VendaModelo> listarVendas() {
        return ps.listarVendas();
    }

    @GetMapping("/")
    public String rota() {
        return "Sistema Mercadinho funcionando!";
    }

}
