package io.github.smart.product.management.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtClaims {

    private Integer usuarioId;
    private String nome;
    private String cpf;
    private String email;
}
