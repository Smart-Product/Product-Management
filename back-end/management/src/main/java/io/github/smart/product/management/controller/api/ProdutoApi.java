package io.github.smart.product.management.controller.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.smart.product.management.annotations.TokenRequired;
import io.github.smart.product.management.model.Produto;
import io.github.smart.product.management.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProdutoApi {

    @Autowired
    private ProdutoService service;

    @PostMapping
    public ResponseEntity<Produto> cadastrar(@RequestBody @Valid Produto produto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(produto));
    }

    @TokenRequired
    @GetMapping
    public ResponseEntity<List<Produto>> buscarTodos(Produto filter) {
        return ResponseEntity.status(HttpStatus.FOUND).body(service.buscarTodos(filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> obterDadosPorId(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.FOUND).body(service.obterDadosPorId(id));
    }

    @PutMapping
    public ResponseEntity editar(@Valid @RequestBody Produto produto) {
        service.editar(produto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

}
