package com.jhipster.generic.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A GenericManyToMany.
 */
@Entity
@Table(name = "generic_many_to_many")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "genericmanytomany")
public class GenericManyToMany implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "field_many_to_many")
    private String fieldManyToMany;

    @ManyToMany(mappedBy = "genericManyToManies")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Generic> generics = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFieldManyToMany() {
        return fieldManyToMany;
    }

    public GenericManyToMany fieldManyToMany(String fieldManyToMany) {
        this.fieldManyToMany = fieldManyToMany;
        return this;
    }

    public void setFieldManyToMany(String fieldManyToMany) {
        this.fieldManyToMany = fieldManyToMany;
    }

    public Set<Generic> getGenerics() {
        return generics;
    }

    public GenericManyToMany generics(Set<Generic> generics) {
        this.generics = generics;
        return this;
    }

    public GenericManyToMany addGeneric(Generic generic) {
        this.generics.add(generic);
        generic.getGenericManyToManies().add(this);
        return this;
    }

    public GenericManyToMany removeGeneric(Generic generic) {
        this.generics.remove(generic);
        generic.getGenericManyToManies().remove(this);
        return this;
    }

    public void setGenerics(Set<Generic> generics) {
        this.generics = generics;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GenericManyToMany)) {
            return false;
        }
        return id != null && id.equals(((GenericManyToMany) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GenericManyToMany{" +
            "id=" + getId() +
            ", fieldManyToMany='" + getFieldManyToMany() + "'" +
            "}";
    }
}
