package io.github.smart.product.management.controller.api;

import java.time.LocalDate;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.smart.product.management.model.Produto;
import io.github.smart.product.management.repository.ProdutoRepository;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProdutoApi {

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping
    public ResponseEntity<Produto> cadastrar(@RequestBody @Valid Produto produto) {
        /*
         * todo: fazer o jwt pra pegar o usuario logado
         * produto.setUsuario(jwt.getUsuario);
         */
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoRepository.save(produto));
    }
}
