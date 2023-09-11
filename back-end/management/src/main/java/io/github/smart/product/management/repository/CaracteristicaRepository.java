package io.github.smart.product.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.github.smart.product.management.dto.KeyValueDto;
import io.github.smart.product.management.model.Caracteristica;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Integer> {

    @Query("SELECT new io.github.smart.product.management.dto.KeyValueDto(c.caracteristicaId, c.descricaoEspecifica) FROM Caracteristica c WHERE c.descricao = :descricao")
    List<KeyValueDto> findByTipoCorteCarne(@Param("descricao") String descricao);
    
    @Query("SELECT new io.github.smart.product.management.dto.KeyValueDto(c.caracteristicaId, c.descricaoEspecifica) FROM Caracteristica c WHERE c.descricao = 'TIPO-CARNE'")
    List<KeyValueDto> findByTipoCarne();

}
