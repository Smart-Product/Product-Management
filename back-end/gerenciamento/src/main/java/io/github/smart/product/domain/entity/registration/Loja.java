package io.github.smart.product.domain.entity.registration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_loja")
public class Loja {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_loja")
	private Integer lojaId;
	
	@Column(name = "id_caracteristica")
	private Integer caracteristicaId;
	
	@Column(name = "nm_loja")
	private String nome;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "nr_cnpj")
	private Integer cnpj;
	
	@Column(name = "nr_contato")
	private Integer contato;
	
	@Column(name = "inscricao_estadual")
	private Integer inscricaoEstadual;

	@Column(name = "fl_ativa")
	private Boolean ativo;

	public Integer getLojaId() {
		return lojaId;
	}

	public void setLojaId(Integer lojaId) {
		this.lojaId = lojaId;
	}

	public Integer getCaracteristicaId() {
		return caracteristicaId;
	}

	public void setCaracteristicaId(Integer caracteristicaId) {
		this.caracteristicaId = caracteristicaId;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getCnpj() {
		return cnpj;
	}

	public void setCnpj(Integer cnpj) {
		this.cnpj = cnpj;
	}

	public Integer getContato() {
		return contato;
	}

	public void setContato(Integer contato) {
		this.contato = contato;
	}

	public Integer getInscricaoEstadual() {
		return inscricaoEstadual;
	}

	public void setInscricaoEstadual(Integer inscricaoEstadual) {
		this.inscricaoEstadual = inscricaoEstadual;
	}
	
	public Boolean getAtivo() {
		return ativo;
	}
	
	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}
}
