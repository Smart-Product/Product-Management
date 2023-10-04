package io.github.smart.product.management.dto;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.br.CPF;

import io.github.smart.product.management.model.Produto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDto {

    private Integer usuarioId;

    @NotEmpty(message = "{campo.nome.obrigatorio}")
    private String nome;

    @NotEmpty(message = "{campo.cpf.obrigatorio}")
    @CPF(message = "{campo.cpf.invalido}")
    private String cpf;

    @NotEmpty(message = "{campo.email.obrigatorio}")
    @Email(message = "{campo.email.invalido}")
    private String email;

    @NotEmpty(message = "{campo.senha.obrigatorio}")
    private String senha;

    @NotEmpty(message = "{campo.confirmar.senha.obrigatorio}")
    private String confirmarSenha;

    private List<Produto> produtos;

    public String setCPF(String cpf) {
        return this.cpf = cpf.replaceAll("\\D", "");
    }
}