package io.github.smart.product.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.smart.product.management.context.AppProviders;
import io.github.smart.product.management.exception.ProductNotFoundException;
import io.github.smart.product.management.model.Produto;
import io.github.smart.product.management.repository.ProdutoRepository;
import io.github.smart.product.management.repository.UsuarioRepository;
import io.github.smart.product.management.security.jwt.JwtClaims;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	public List<Produto> buscarTodos(Produto filter) {
		JwtClaims claims = AppProviders.JWT_CLAIMS.get();
		filter.setUsuario(usuarioRepository.findById(claims.getUsuarioId()).get());
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING);
		Example<Produto> example = Example.of(filter, matcher);
		return produtoRepository.findAll(example);
	}

	public Produto obterDadosPorId(Integer produtoId) {
		return produtoRepository.findById(produtoId).orElseThrow(() -> new ProductNotFoundException());
	}

	@Transactional
	public void editar(Produto produtoNovo) {
		produtoRepository.findById(produtoNovo.getProdutoId())
				.map((produtoAntigo) -> {
					produtoNovo.setProdutoId(produtoAntigo.getProdutoId());
					JwtClaims claims = AppProviders.JWT_CLAIMS.get();
					produtoNovo.setUsuario(usuarioRepository.findById(claims.getUsuarioId()).get());
					return produtoRepository.save(produtoNovo);
				})
				.orElseThrow(() -> new ProductNotFoundException());
	}

	@Transactional
	public Produto salvar(Produto produto) {
		JwtClaims claims = AppProviders.JWT_CLAIMS.get();
		produto.setUsuario(usuarioRepository.findById(claims.getUsuarioId()).get());
		return produtoRepository.save(produto);
	}

	@Transactional
	public void deletar(Integer produtoId) {
		produtoRepository.findById(produtoId).map((produto) -> {
			produtoRepository.deleteById(produto.getProdutoId());
			return produto;
		}).orElseThrow(() -> new ProductNotFoundException());

	}
}
