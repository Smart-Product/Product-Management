package io.github.smart.product.management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
		// JwtClaims claims = AppProviders.JWT_CLAIMS.get();
		// produto.setUsuario(usuarioRepository.findById(claims.getUsuarioId()).get());
		return produtoRepository.save(produto);
	}
	
	public void deletar(Integer produtoId){
		Optional<Produto> produto = produtoRepository.findById(produtoId);

        if(produto.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        produtoRepository.deleteById(produtoId);
	}
}
