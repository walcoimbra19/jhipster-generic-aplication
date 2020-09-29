package com.jhipster.generic.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.Duration;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * A Generic.
 */
@Entity
@Table(name = "generic")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "generic")
public class Generic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "field_string", nullable = false)
    private String fieldString;

    @Column(name = "field_integer")
    private Integer fieldInteger;

    @Column(name = "field_long")
    private Long fieldLong;

    @Column(name = "field_big_decimal", precision = 21, scale = 2)
    private BigDecimal fieldBigDecimal;

    @Column(name = "field_float")
    private Float fieldFloat;

    @Column(name = "field_double")
    private Double fieldDouble;

    @Column(name = "field_boolean")
    private Boolean fieldBoolean;

    @Column(name = "field_local_date")
    private LocalDate fieldLocalDate;

    @Column(name = "field_zoned_date_time")
    private ZonedDateTime fieldZonedDateTime;

    @Column(name = "field_duration")
    private Duration fieldDuration;

    @Column(name = "field_uuid")
    private UUID fieldUUID;

    @Lob
    @Column(name = "field_blob")
    private byte[] fieldBlob;

    @Column(name = "field_blob_content_type")
    private String fieldBlobContentType;

    @Lob
    @Column(name = "field_any_blob")
    private byte[] fieldAnyBlob;

    @Column(name = "field_any_blob_content_type")
    private String fieldAnyBlobContentType;

    @Lob
    @Column(name = "field_image_blob")
    private byte[] fieldImageBlob;

    @Column(name = "field_image_blob_content_type")
    private String fieldImageBlobContentType;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "field_text_blob")
    private String fieldTextBlob;

    @OneToOne
    @JoinColumn(unique = true)
    private GenericHistory genericHistory;

    @ManyToOne
    @JsonIgnoreProperties(value = "generics", allowSetters = true)
    private GenericManyToOne genericManyToOne;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "generic_generic_many_to_many",
               joinColumns = @JoinColumn(name = "generic_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "generic_many_to_many_id", referencedColumnName = "id"))
    private Set<GenericManyToMany> genericManyToManies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFieldString() {
        return fieldString;
    }

    public Generic fieldString(String fieldString) {
        this.fieldString = fieldString;
        return this;
    }

    public void setFieldString(String fieldString) {
        this.fieldString = fieldString;
    }

    public Integer getFieldInteger() {
        return fieldInteger;
    }

    public Generic fieldInteger(Integer fieldInteger) {
        this.fieldInteger = fieldInteger;
        return this;
    }

    public void setFieldInteger(Integer fieldInteger) {
        this.fieldInteger = fieldInteger;
    }

    public Long getFieldLong() {
        return fieldLong;
    }

    public Generic fieldLong(Long fieldLong) {
        this.fieldLong = fieldLong;
        return this;
    }

    public void setFieldLong(Long fieldLong) {
        this.fieldLong = fieldLong;
    }

    public BigDecimal getFieldBigDecimal() {
        return fieldBigDecimal;
    }

    public Generic fieldBigDecimal(BigDecimal fieldBigDecimal) {
        this.fieldBigDecimal = fieldBigDecimal;
        return this;
    }

    public void setFieldBigDecimal(BigDecimal fieldBigDecimal) {
        this.fieldBigDecimal = fieldBigDecimal;
    }

    public Float getFieldFloat() {
        return fieldFloat;
    }

    public Generic fieldFloat(Float fieldFloat) {
        this.fieldFloat = fieldFloat;
        return this;
    }

    public void setFieldFloat(Float fieldFloat) {
        this.fieldFloat = fieldFloat;
    }

    public Double getFieldDouble() {
        return fieldDouble;
    }

    public Generic fieldDouble(Double fieldDouble) {
        this.fieldDouble = fieldDouble;
        return this;
    }

    public void setFieldDouble(Double fieldDouble) {
        this.fieldDouble = fieldDouble;
    }

    public Boolean isFieldBoolean() {
        return fieldBoolean;
    }

    public Generic fieldBoolean(Boolean fieldBoolean) {
        this.fieldBoolean = fieldBoolean;
        return this;
    }

    public void setFieldBoolean(Boolean fieldBoolean) {
        this.fieldBoolean = fieldBoolean;
    }

    public LocalDate getFieldLocalDate() {
        return fieldLocalDate;
    }

    public Generic fieldLocalDate(LocalDate fieldLocalDate) {
        this.fieldLocalDate = fieldLocalDate;
        return this;
    }

    public void setFieldLocalDate(LocalDate fieldLocalDate) {
        this.fieldLocalDate = fieldLocalDate;
    }

    public ZonedDateTime getFieldZonedDateTime() {
        return fieldZonedDateTime;
    }

    public Generic fieldZonedDateTime(ZonedDateTime fieldZonedDateTime) {
        this.fieldZonedDateTime = fieldZonedDateTime;
        return this;
    }

    public void setFieldZonedDateTime(ZonedDateTime fieldZonedDateTime) {
        this.fieldZonedDateTime = fieldZonedDateTime;
    }

    public Duration getFieldDuration() {
        return fieldDuration;
    }

    public Generic fieldDuration(Duration fieldDuration) {
        this.fieldDuration = fieldDuration;
        return this;
    }

    public void setFieldDuration(Duration fieldDuration) {
        this.fieldDuration = fieldDuration;
    }

    public UUID getFieldUUID() {
        return fieldUUID;
    }

    public Generic fieldUUID(UUID fieldUUID) {
        this.fieldUUID = fieldUUID;
        return this;
    }

    public void setFieldUUID(UUID fieldUUID) {
        this.fieldUUID = fieldUUID;
    }

    public byte[] getFieldBlob() {
        return fieldBlob;
    }

    public Generic fieldBlob(byte[] fieldBlob) {
        this.fieldBlob = fieldBlob;
        return this;
    }

    public void setFieldBlob(byte[] fieldBlob) {
        this.fieldBlob = fieldBlob;
    }

    public String getFieldBlobContentType() {
        return fieldBlobContentType;
    }

    public Generic fieldBlobContentType(String fieldBlobContentType) {
        this.fieldBlobContentType = fieldBlobContentType;
        return this;
    }

    public void setFieldBlobContentType(String fieldBlobContentType) {
        this.fieldBlobContentType = fieldBlobContentType;
    }

    public byte[] getFieldAnyBlob() {
        return fieldAnyBlob;
    }

    public Generic fieldAnyBlob(byte[] fieldAnyBlob) {
        this.fieldAnyBlob = fieldAnyBlob;
        return this;
    }

    public void setFieldAnyBlob(byte[] fieldAnyBlob) {
        this.fieldAnyBlob = fieldAnyBlob;
    }

    public String getFieldAnyBlobContentType() {
        return fieldAnyBlobContentType;
    }

    public Generic fieldAnyBlobContentType(String fieldAnyBlobContentType) {
        this.fieldAnyBlobContentType = fieldAnyBlobContentType;
        return this;
    }

    public void setFieldAnyBlobContentType(String fieldAnyBlobContentType) {
        this.fieldAnyBlobContentType = fieldAnyBlobContentType;
    }

    public byte[] getFieldImageBlob() {
        return fieldImageBlob;
    }

    public Generic fieldImageBlob(byte[] fieldImageBlob) {
        this.fieldImageBlob = fieldImageBlob;
        return this;
    }

    public void setFieldImageBlob(byte[] fieldImageBlob) {
        this.fieldImageBlob = fieldImageBlob;
    }

    public String getFieldImageBlobContentType() {
        return fieldImageBlobContentType;
    }

    public Generic fieldImageBlobContentType(String fieldImageBlobContentType) {
        this.fieldImageBlobContentType = fieldImageBlobContentType;
        return this;
    }

    public void setFieldImageBlobContentType(String fieldImageBlobContentType) {
        this.fieldImageBlobContentType = fieldImageBlobContentType;
    }

    public String getFieldTextBlob() {
        return fieldTextBlob;
    }

    public Generic fieldTextBlob(String fieldTextBlob) {
        this.fieldTextBlob = fieldTextBlob;
        return this;
    }

    public void setFieldTextBlob(String fieldTextBlob) {
        this.fieldTextBlob = fieldTextBlob;
    }

    public GenericHistory getGenericHistory() {
        return genericHistory;
    }

    public Generic genericHistory(GenericHistory genericHistory) {
        this.genericHistory = genericHistory;
        return this;
    }

    public void setGenericHistory(GenericHistory genericHistory) {
        this.genericHistory = genericHistory;
    }

    public GenericManyToOne getGenericManyToOne() {
        return genericManyToOne;
    }

    public Generic genericManyToOne(GenericManyToOne genericManyToOne) {
        this.genericManyToOne = genericManyToOne;
        return this;
    }

    public void setGenericManyToOne(GenericManyToOne genericManyToOne) {
        this.genericManyToOne = genericManyToOne;
    }

    public Set<GenericManyToMany> getGenericManyToManies() {
        return genericManyToManies;
    }

    public Generic genericManyToManies(Set<GenericManyToMany> genericManyToManies) {
        this.genericManyToManies = genericManyToManies;
        return this;
    }

    public Generic addGenericManyToMany(GenericManyToMany genericManyToMany) {
        this.genericManyToManies.add(genericManyToMany);
        genericManyToMany.getGenerics().add(this);
        return this;
    }

    public Generic removeGenericManyToMany(GenericManyToMany genericManyToMany) {
        this.genericManyToManies.remove(genericManyToMany);
        genericManyToMany.getGenerics().remove(this);
        return this;
    }

    public void setGenericManyToManies(Set<GenericManyToMany> genericManyToManies) {
        this.genericManyToManies = genericManyToManies;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Generic)) {
            return false;
        }
        return id != null && id.equals(((Generic) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Generic{" +
            "id=" + getId() +
            ", fieldString='" + getFieldString() + "'" +
            ", fieldInteger=" + getFieldInteger() +
            ", fieldLong=" + getFieldLong() +
            ", fieldBigDecimal=" + getFieldBigDecimal() +
            ", fieldFloat=" + getFieldFloat() +
            ", fieldDouble=" + getFieldDouble() +
            ", fieldBoolean='" + isFieldBoolean() + "'" +
            ", fieldLocalDate='" + getFieldLocalDate() + "'" +
            ", fieldZonedDateTime='" + getFieldZonedDateTime() + "'" +
            ", fieldDuration='" + getFieldDuration() + "'" +
            ", fieldUUID='" + getFieldUUID() + "'" +
            ", fieldBlob='" + getFieldBlob() + "'" +
            ", fieldBlobContentType='" + getFieldBlobContentType() + "'" +
            ", fieldAnyBlob='" + getFieldAnyBlob() + "'" +
            ", fieldAnyBlobContentType='" + getFieldAnyBlobContentType() + "'" +
            ", fieldImageBlob='" + getFieldImageBlob() + "'" +
            ", fieldImageBlobContentType='" + getFieldImageBlobContentType() + "'" +
            ", fieldTextBlob='" + getFieldTextBlob() + "'" +
            "}";
    }
}
