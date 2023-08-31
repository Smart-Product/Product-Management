package io.github.smart.product.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.smart.product.management.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

}
