package com.jhipster.generic.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A GenericManyToOne.
 */
@Entity
@Table(name = "generic_many_to_one")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "genericmanytoone")
public class GenericManyToOne implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "field_many_to_one")
    private String fieldManyToOne;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFieldManyToOne() {
        return fieldManyToOne;
    }

    public GenericManyToOne fieldManyToOne(String fieldManyToOne) {
        this.fieldManyToOne = fieldManyToOne;
        return this;
    }

    public void setFieldManyToOne(String fieldManyToOne) {
        this.fieldManyToOne = fieldManyToOne;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GenericManyToOne)) {
            return false;
        }
        return id != null && id.equals(((GenericManyToOne) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GenericManyToOne{" +
            "id=" + getId() +
            ", fieldManyToOne='" + getFieldManyToOne() + "'" +
            "}";
    }
}
