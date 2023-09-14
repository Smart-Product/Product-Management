package io.github.smart.product.management.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.br.CPF;

import io.github.smart.product.management.dto.UsuarioDto;

@Entity
@Table(name = "tb_usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer usuarioId;

    @NotEmpty(message = "{campo.nome.obrigatorio}")
    @Column(name = "nome")
    private String nome;

    @NotEmpty(message = "{campo.cpf.obrigatorio}")
    @Column(name = "cpf")
    @CPF(message = "{campo.cpf.invalido}")
    private String cpf;

    @NotEmpty(message = "{campo.email.obrigatorio}")
    @Column(name = "email")
    @Email(message = "{campo.email.invalido}")
    private String email;

    @NotEmpty(message = "{campo.senha.obrigatorio}")
    @Column(name = "senha")
    private String senha;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    private List<Produto> produtos;

    public Usuario() {
    }

    public Usuario(Integer usuarioId, String nome, String cpf, String email, String senha) {
        this.usuarioId = usuarioId;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }

    public UsuarioDto convertDto() {
        return new UsuarioDto(usuarioId, nome, cpf, email, produtos);
    }

    public String setCPF(String cpf) {
        return this.cpf = cpf.replaceAll("\\D", "");
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}
