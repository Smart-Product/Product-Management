package io.github.smart.product.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.smart.product.management.dto.KeyValueDto;
import io.github.smart.product.management.model.Caracteristica;
import io.github.smart.product.management.repository.CaracteristicaRepository;

@Service
public class CaracteristicaService {
    
    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    public List<KeyValueDto> findAll() {
        return caracteristicaRepository.findByTipoCarne();
    }

    public List<KeyValueDto> findByTipoCorteCarne(String descricao) {
        return caracteristicaRepository.findByTipoCorteCarne(descricao);
    }
}
