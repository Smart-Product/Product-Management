package io.github.smart.product.domain.entity.registration;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_produto")
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_produto")
	private Integer produtoId;
		
	@Column(name = "id_loja")
	private Integer lojaId;
	
	@Column(name = "id_endereco")
	private Integer enderecoId;
	
	@Column(name = "nm_produto")
	private String nome;
	
	@Column(name = "descricao")
	private String descricao;
	
	@Column(name = "tamanho")
	private String tamanho;
	
	@Column(name = "preco")
	private Double  preco;
	
	@Column(name = "quantidade")
	private Integer quantidade;
	
	@Column(name = "dt_validade")
	private LocalDate validade;
	
	@Column(name = "fl_excluido")
	private Boolean excluido;

	public Integer getProdutoId() {
		return produtoId;
	}

	public void setProdutoId(Integer produtoId) {
		this.produtoId = produtoId;
	}

	public Integer getLojaId() {
		return lojaId;
	}

	public void setLojaId(Integer lojaId) {
		this.lojaId = lojaId;
	}

	public Integer getEnderecoId() {
		return enderecoId;
	}

	public void setEnderecoId(Integer enderecoId) {
		this.enderecoId = enderecoId;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getTamanho() {
		return tamanho;
	}

	public void setTamanho(String tamanho) {
		this.tamanho = tamanho;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public LocalDate getValidade() {
		return validade;
	}

	public void setValidade(LocalDate validade) {
		this.validade = validade;
	}
	
	public Boolean getExcluido() {
		return excluido;
	}
	
	public void setExcluido(Boolean excluido) {
		this.excluido = excluido;
	}
}
