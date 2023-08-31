package io.github.smart.product.management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.smart.product.management.dto.ProdutoDTO;
import io.github.smart.product.management.model.Produto;
import io.github.smart.product.management.repository.ProdutoRepository;


@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository repository;
	
	public ProdutoDTO buscaPorProduto(String produto) {
		Produto entity = repository.buscaPorProduto(produto);
		ProdutoDTO dto = new ProdutoDTO(entity);
		return dto;
	}
	
}
