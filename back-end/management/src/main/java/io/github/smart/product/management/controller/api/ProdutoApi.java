package io.github.smart.product.management.controller.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.smart.product.management.model.Produto;
import io.github.smart.product.management.repository.ProdutoRepository;
import io.github.smart.product.management.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoApi {

    @Autowired
    private ProdutoRepository produtoRepository;
    
    @Autowired
    private ProdutoService service;

    @PostMapping
    public ResponseEntity<Produto> cadastrar(@RequestBody @Valid Produto produto) {
        /*
         * todo: fazer o jwt pra pegar o usuario logado
         * produto.setUsuario(jwt.getUsuario);
         */
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoRepository.save(produto));
    }
    
    @GetMapping
	public List<Produto> buscarTodos(Produto filter) {
		return service.buscarTodos(filter);
	}
    
    
}
