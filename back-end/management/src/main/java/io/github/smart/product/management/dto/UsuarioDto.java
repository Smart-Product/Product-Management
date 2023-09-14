package io.github.smart.product.management.dto;

import java.util.List;

import io.github.smart.product.management.model.Produto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDto {
    private Integer usuarioId;
    private String nome;
    private String cpf;
    private String email;
    private List<Produto> produtos;
}