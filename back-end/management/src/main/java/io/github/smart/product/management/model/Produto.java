package io.github.smart.product.management.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private Integer produtoId;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "nm_produto")
    @NotEmpty(message = "{campo.nome.produto.obrigatorio}")
    private String nome;

    @OneToOne
    @JoinColumn(name = "id_tipo_corte_carne")
    @NotNull(message = "{campo.tipo.corte.carne.obrigatorio}")
    private Caracteristica tipoCorteCarne;

    @Column(name = "descricao")
    @NotEmpty(message = "{campo.descricao.produto.obrigatorio}")
    private String descricao;

    @Column(name = "peso_peca_kg")
    @NotNull(message = "{campo.peso.peca.kg.obrigatorio}")
    private Double pesoPecaKg;

    @Column(name = "quantidade_pecas")
    @NotNull(message = "{campo.quantidade.peca.obrigatorio}")
    private Integer quantidadePeca;

    @Column(name = "preco_kg")
    @NotNull(message = "{campo.preco.kilo.obrigatorio}")
    private Double precoKg;

    @Column(name = "dt_validade")
    @NotNull(message = "{campo.data.validade.obrigatorio}")
    private LocalDate dataValidade;

    public Integer getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Integer produtoId) {
        this.produtoId = produtoId;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Caracteristica getTipoCorteCarne() {
        return tipoCorteCarne;
    }

    public void setTipoCorteCarne(Caracteristica tipoCorteCarne) {
        this.tipoCorteCarne = tipoCorteCarne;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPesoPecaKg() {
        return pesoPecaKg;
    }

    public void setPesoPecaKg(Double pesoPecaKg) {
        this.pesoPecaKg = pesoPecaKg;
    }

    public Integer getQuantidadePeca() {
        return quantidadePeca;
    }

    public void setQuantidadePeca(Integer quantidadePeca) {
        this.quantidadePeca = quantidadePeca;
    }

    public Double getPrecoKg() {
        return precoKg;
    }

    public void setPrecoKg(Double precoKg) {
        this.precoKg = precoKg;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }
}