package io.github.smart.product.management.controller.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.github.smart.product.management.annotations.TokenRequired;
import io.github.smart.product.management.model.Produto;
import io.github.smart.product.management.repository.ProdutoRepository;
import io.github.smart.product.management.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProdutoApi {

    @Autowired
    private ProdutoService service;

    @PostMapping
    @TokenRequired
    public Produto cadastrar(@RequestBody @Valid Produto produto) {
        return service.salvar(produto);
    }

    @GetMapping
    @TokenRequired
    public List<Produto> buscarTodos(Produto filter) {
        return service.buscarTodos(filter);
    }

    @GetMapping("/{id}")
    @TokenRequired
    public Produto obterDadosPorId(@PathVariable Integer id) {
        return service.obterDadosPorId(id);
    }

    @PutMapping
    @TokenRequired
    public void editar(@Valid @RequestBody Produto produto) {
        service.editar(produto);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{produtoId}")
    @TokenRequired
    public void deletar(@PathVariable Integer produtoId) {
        service.deletar(produtoId);
    }

}
