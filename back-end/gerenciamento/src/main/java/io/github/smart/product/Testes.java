package io.github.smart.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.smart.product.domain.entity.params.Estado;

@RestController
@RequestMapping("/teste")
public class Testes {

    @Autowired
    private Repository r;
    
    @GetMapping
    public List<Estado> findAll() {
        return r.findAll();
    }
}
