package io.github.smart.product.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import io.github.smart.product.management.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

	public Produto buscaPorProduto(String produto);
	
	

}
