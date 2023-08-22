package io.github.smart.product;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.smart.product.domain.entity.params.Estado;

public interface Repository extends JpaRepository<Estado, Integer> {
    
}
