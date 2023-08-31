package io.github.smart.product.management.dto;

import io.github.smart.product.management.model.Produto;

public class ProdutoDTO {

	private String nome;
	private String descricao;
	private Double precoKg;
	private int quantidadePeca;
	
	
	public ProdutoDTO(Produto produto) {
		nome = produto.getNome();
		descricao = produto.getDescricao();
		precoKg = produto.getPrecoKg();
		quantidadePeca = produto.getQuantidadePeca();
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


	public Double getPrecoKg() {
		return precoKg;
	}


	public void setPrecoKg(Double precoKg) {
		this.precoKg = precoKg;
	}


	public int getQuantidadePeca() {
		return quantidadePeca;
	}


	public void setQuantidadePeca(int quantidadePeca) {
		this.quantidadePeca = quantidadePeca;
	}
	
	
}
