package com.jhipster.generic.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A GenericOneToMany.
 */
@Entity
@Table(name = "generic_one_to_many")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "genericonetomany")
public class GenericOneToMany implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "field_one_to_many")
    private String fieldOneToMany;

    @ManyToOne
    @JsonIgnoreProperties(value = "genericOneToManies", allowSetters = true)
    private GenericManyToOne genericManyToOne;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFieldOneToMany() {
        return fieldOneToMany;
    }

    public GenericOneToMany fieldOneToMany(String fieldOneToMany) {
        this.fieldOneToMany = fieldOneToMany;
        return this;
    }

    public void setFieldOneToMany(String fieldOneToMany) {
        this.fieldOneToMany = fieldOneToMany;
    }

    public GenericManyToOne getGenericManyToOne() {
        return genericManyToOne;
    }

    public GenericOneToMany genericManyToOne(GenericManyToOne genericManyToOne) {
        this.genericManyToOne = genericManyToOne;
        return this;
    }

    public void setGenericManyToOne(GenericManyToOne genericManyToOne) {
        this.genericManyToOne = genericManyToOne;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GenericOneToMany)) {
            return false;
        }
        return id != null && id.equals(((GenericOneToMany) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GenericOneToMany{" +
            "id=" + getId() +
            ", fieldOneToMany='" + getFieldOneToMany() + "'" +
            "}";
    }
}
