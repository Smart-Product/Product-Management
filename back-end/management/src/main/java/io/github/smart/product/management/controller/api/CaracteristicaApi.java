package io.github.smart.product.management.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.smart.product.management.dto.KeyValueDto;
import io.github.smart.product.management.service.CaracteristicaService;

@RestController
@RequestMapping("/api/caracteristica")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CaracteristicaApi {

    @Autowired
    private CaracteristicaService caracteristicaService;

    @GetMapping
    public List<KeyValueDto> findAll() {
        return caracteristicaService.findAll();
    }

    @GetMapping("/descricao/{descricao}")
    public List<KeyValueDto> findByTipoCorteCarne(@PathVariable String descricao) {
        return caracteristicaService.findByTipoCorteCarne(descricao);
    }

}
