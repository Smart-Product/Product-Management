package io.github.smart.product.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_caracteristica")
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_caracteristica")
    private Integer caracteristicaId;

    @Column(name = "ds_caracteristica")
    private String descricao;

    @Column(name = "ds_especifico")
    private String descricaoEspecifica;

    public Caracteristica() {
    }

    public Integer getCaracteristicaId() {
        return caracteristicaId;
    }

    public void setCaracteristicaId(Integer caracteristicaId) {
        this.caracteristicaId = caracteristicaId;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricaoEspecifica() {
        return descricaoEspecifica;
    }

    public void setDescricaoEspecifica(String descricaoEspecifica) {
        this.descricaoEspecifica = descricaoEspecifica;
    }

}
