package io.github.smart.product.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;

import io.github.smart.product.management.exception.ProductNotFoundException;
import io.github.smart.product.management.model.Produto;
import io.github.smart.product.management.repository.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;

	public List<Produto> buscarTodos(Produto filter) {
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING);
		Example<Produto> example = Example.of(filter, matcher);
		return produtoRepository.findAll(example);
	}

	public Produto obterDadosPorId(Integer produtoId) {
		return produtoRepository.findById(produtoId).orElseThrow(() -> new ProductNotFoundException());
	}

	public void editar(Produto produtoNovo) {
		produtoRepository.findById(produtoNovo.getProdutoId())
				.map((produtoAntigo) -> {
					produtoNovo.setProdutoId(produtoAntigo.getProdutoId());
					return produtoRepository.save(produtoNovo);
				})
				.orElseThrow(() -> new ProductNotFoundException());
	}

	public Produto salvar(Produto produto) {
		return produtoRepository.save(produto);
	}

}
