package com.jhipster.generic.web.rest;

import com.jhipster.generic.JhipsterGenericAplicationApp;
import com.jhipster.generic.domain.Generic;
import com.jhipster.generic.repository.GenericRepository;
import com.jhipster.generic.repository.search.GenericSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static com.jhipster.generic.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GenericResource} REST controller.
 */
@SpringBootTest(classes = JhipsterGenericAplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class GenericResourceIT {

    private static final String DEFAULT_FIELD_STRING = "AAAAAAAAAA";
    private static final String UPDATED_FIELD_STRING = "BBBBBBBBBB";

    private static final Integer DEFAULT_FIELD_INTEGER = 1;
    private static final Integer UPDATED_FIELD_INTEGER = 2;

    private static final Long DEFAULT_FIELD_LONG = 1L;
    private static final Long UPDATED_FIELD_LONG = 2L;

    private static final BigDecimal DEFAULT_FIELD_BIG_DECIMAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_FIELD_BIG_DECIMAL = new BigDecimal(2);

    private static final Float DEFAULT_FIELD_FLOAT = 1F;
    private static final Float UPDATED_FIELD_FLOAT = 2F;

    private static final Double DEFAULT_FIELD_DOUBLE = 1D;
    private static final Double UPDATED_FIELD_DOUBLE = 2D;

    private static final Boolean DEFAULT_FIELD_BOOLEAN = false;
    private static final Boolean UPDATED_FIELD_BOOLEAN = true;

    private static final LocalDate DEFAULT_FIELD_LOCAL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FIELD_LOCAL_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final ZonedDateTime DEFAULT_FIELD_ZONED_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FIELD_ZONED_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Duration DEFAULT_FIELD_DURATION = Duration.ofHours(6);
    private static final Duration UPDATED_FIELD_DURATION = Duration.ofHours(12);

    private static final UUID DEFAULT_FIELD_UUID = UUID.randomUUID();
    private static final UUID UPDATED_FIELD_UUID = UUID.randomUUID();

    private static final byte[] DEFAULT_FIELD_BLOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FIELD_BLOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FIELD_BLOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FIELD_BLOB_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_FIELD_ANY_BLOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FIELD_ANY_BLOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FIELD_ANY_BLOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FIELD_ANY_BLOB_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_FIELD_IMAGE_BLOB = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FIELD_IMAGE_BLOB = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FIELD_IMAGE_BLOB_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FIELD_IMAGE_BLOB_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_FIELD_TEXT_BLOB = "AAAAAAAAAA";
    private static final String UPDATED_FIELD_TEXT_BLOB = "BBBBBBBBBB";

    @Autowired
    private GenericRepository genericRepository;

    @Mock
    private GenericRepository genericRepositoryMock;

    /**
     * This repository is mocked in the com.jhipster.generic.repository.search test package.
     *
     * @see com.jhipster.generic.repository.search.GenericSearchRepositoryMockConfiguration
     */
    @Autowired
    private GenericSearchRepository mockGenericSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGenericMockMvc;

    private Generic generic;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Generic createEntity(EntityManager em) {
        Generic generic = new Generic()
            .fieldString(DEFAULT_FIELD_STRING)
            .fieldInteger(DEFAULT_FIELD_INTEGER)
            .fieldLong(DEFAULT_FIELD_LONG)
            .fieldBigDecimal(DEFAULT_FIELD_BIG_DECIMAL)
            .fieldFloat(DEFAULT_FIELD_FLOAT)
            .fieldDouble(DEFAULT_FIELD_DOUBLE)
            .fieldBoolean(DEFAULT_FIELD_BOOLEAN)
            .fieldLocalDate(DEFAULT_FIELD_LOCAL_DATE)
            .fieldZonedDateTime(DEFAULT_FIELD_ZONED_DATE_TIME)
            .fieldDuration(DEFAULT_FIELD_DURATION)
            .fieldUUID(DEFAULT_FIELD_UUID)
            .fieldBlob(DEFAULT_FIELD_BLOB)
            .fieldBlobContentType(DEFAULT_FIELD_BLOB_CONTENT_TYPE)
            .fieldAnyBlob(DEFAULT_FIELD_ANY_BLOB)
            .fieldAnyBlobContentType(DEFAULT_FIELD_ANY_BLOB_CONTENT_TYPE)
            .fieldImageBlob(DEFAULT_FIELD_IMAGE_BLOB)
            .fieldImageBlobContentType(DEFAULT_FIELD_IMAGE_BLOB_CONTENT_TYPE)
            .fieldTextBlob(DEFAULT_FIELD_TEXT_BLOB);
        return generic;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Generic createUpdatedEntity(EntityManager em) {
        Generic generic = new Generic()
            .fieldString(UPDATED_FIELD_STRING)
            .fieldInteger(UPDATED_FIELD_INTEGER)
            .fieldLong(UPDATED_FIELD_LONG)
            .fieldBigDecimal(UPDATED_FIELD_BIG_DECIMAL)
            .fieldFloat(UPDATED_FIELD_FLOAT)
            .fieldDouble(UPDATED_FIELD_DOUBLE)
            .fieldBoolean(UPDATED_FIELD_BOOLEAN)
            .fieldLocalDate(UPDATED_FIELD_LOCAL_DATE)
            .fieldZonedDateTime(UPDATED_FIELD_ZONED_DATE_TIME)
            .fieldDuration(UPDATED_FIELD_DURATION)
            .fieldUUID(UPDATED_FIELD_UUID)
            .fieldBlob(UPDATED_FIELD_BLOB)
            .fieldBlobContentType(UPDATED_FIELD_BLOB_CONTENT_TYPE)
            .fieldAnyBlob(UPDATED_FIELD_ANY_BLOB)
            .fieldAnyBlobContentType(UPDATED_FIELD_ANY_BLOB_CONTENT_TYPE)
            .fieldImageBlob(UPDATED_FIELD_IMAGE_BLOB)
            .fieldImageBlobContentType(UPDATED_FIELD_IMAGE_BLOB_CONTENT_TYPE)
            .fieldTextBlob(UPDATED_FIELD_TEXT_BLOB);
        return generic;
    }

    @BeforeEach
    public void initTest() {
        generic = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeneric() throws Exception {
        int databaseSizeBeforeCreate = genericRepository.findAll().size();
        // Create the Generic
        restGenericMockMvc.perform(post("/api/generics").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(generic)))
            .andExpect(status().isCreated());

        // Validate the Generic in the database
        List<Generic> genericList = genericRepository.findAll();
        assertThat(genericList).hasSize(databaseSizeBeforeCreate + 1);
        Generic testGeneric = genericList.get(genericList.size() - 1);
        assertThat(testGeneric.getFieldString()).isEqualTo(DEFAULT_FIELD_STRING);
        assertThat(testGeneric.getFieldInteger()).isEqualTo(DEFAULT_FIELD_INTEGER);
        assertThat(testGeneric.getFieldLong()).isEqualTo(DEFAULT_FIELD_LONG);
        assertThat(testGeneric.getFieldBigDecimal()).isEqualTo(DEFAULT_FIELD_BIG_DECIMAL);
        assertThat(testGeneric.getFieldFloat()).isEqualTo(DEFAULT_FIELD_FLOAT);
        assertThat(testGeneric.getFieldDouble()).isEqualTo(DEFAULT_FIELD_DOUBLE);
        assertThat(testGeneric.isFieldBoolean()).isEqualTo(DEFAULT_FIELD_BOOLEAN);
        assertThat(testGeneric.getFieldLocalDate()).isEqualTo(DEFAULT_FIELD_LOCAL_DATE);
        assertThat(testGeneric.getFieldZonedDateTime()).isEqualTo(DEFAULT_FIELD_ZONED_DATE_TIME);
        assertThat(testGeneric.getFieldDuration()).isEqualTo(DEFAULT_FIELD_DURATION);
        assertThat(testGeneric.getFieldUUID()).isEqualTo(DEFAULT_FIELD_UUID);
        assertThat(testGeneric.getFieldBlob()).isEqualTo(DEFAULT_FIELD_BLOB);
        assertThat(testGeneric.getFieldBlobContentType()).isEqualTo(DEFAULT_FIELD_BLOB_CONTENT_TYPE);
        assertThat(testGeneric.getFieldAnyBlob()).isEqualTo(DEFAULT_FIELD_ANY_BLOB);
        assertThat(testGeneric.getFieldAnyBlobContentType()).isEqualTo(DEFAULT_FIELD_ANY_BLOB_CONTENT_TYPE);
        assertThat(testGeneric.getFieldImageBlob()).isEqualTo(DEFAULT_FIELD_IMAGE_BLOB);
        assertThat(testGeneric.getFieldImageBlobContentType()).isEqualTo(DEFAULT_FIELD_IMAGE_BLOB_CONTENT_TYPE);
        assertThat(testGeneric.getFieldTextBlob()).isEqualTo(DEFAULT_FIELD_TEXT_BLOB);

        // Validate the Generic in Elasticsearch
        verify(mockGenericSearchRepository, times(1)).save(testGeneric);
    }

    @Test
    @Transactional
    public void createGenericWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = genericRepository.findAll().size();

        // Create the Generic with an existing ID
        generic.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenericMockMvc.perform(post("/api/generics").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(generic)))
            .andExpect(status().isBadRequest());

        // Validate the Generic in the database
        List<Generic> genericList = genericRepository.findAll();
        assertThat(genericList).hasSize(databaseSizeBeforeCreate);

        // Validate the Generic in Elasticsearch
        verify(mockGenericSearchRepository, times(0)).save(generic);
    }


    @Test
    @Transactional
    public void checkFieldStringIsRequired() throws Exception {
        int databaseSizeBeforeTest = genericRepository.findAll().size();
        // set the field null
        generic.setFieldString(null);

        // Create the Generic, which fails.


        restGenericMockMvc.perform(post("/api/generics").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(generic)))
            .andExpect(status().isBadRequest());

        List<Generic> genericList = genericRepository.findAll();
        assertThat(genericList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGenerics() throws Exception {
        // Initialize the database
        genericRepository.saveAndFlush(generic);

        // Get all the genericList
        restGenericMockMvc.perform(get("/api/generics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(generic.getId().intValue())))
            .andExpect(jsonPath("$.[*].fieldString").value(hasItem(DEFAULT_FIELD_STRING)))
            .andExpect(jsonPath("$.[*].fieldInteger").value(hasItem(DEFAULT_FIELD_INTEGER)))
            .andExpect(jsonPath("$.[*].fieldLong").value(hasItem(DEFAULT_FIELD_LONG.intValue())))
            .andExpect(jsonPath("$.[*].fieldBigDecimal").value(hasItem(DEFAULT_FIELD_BIG_DECIMAL.intValue())))
            .andExpect(jsonPath("$.[*].fieldFloat").value(hasItem(DEFAULT_FIELD_FLOAT.doubleValue())))
            .andExpect(jsonPath("$.[*].fieldDouble").value(hasItem(DEFAULT_FIELD_DOUBLE.doubleValue())))
            .andExpect(jsonPath("$.[*].fieldBoolean").value(hasItem(DEFAULT_FIELD_BOOLEAN.booleanValue())))
            .andExpect(jsonPath("$.[*].fieldLocalDate").value(hasItem(DEFAULT_FIELD_LOCAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].fieldZonedDateTime").value(hasItem(sameInstant(DEFAULT_FIELD_ZONED_DATE_TIME))))
            .andExpect(jsonPath("$.[*].fieldDuration").value(hasItem(DEFAULT_FIELD_DURATION.toString())))
            .andExpect(jsonPath("$.[*].fieldUUID").value(hasItem(DEFAULT_FIELD_UUID.toString())))
            .andExpect(jsonPath("$.[*].fieldBlobContentType").value(hasItem(DEFAULT_FIELD_BLOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fieldBlob").value(hasItem(Base64Utils.encodeToString(DEFAULT_FIELD_BLOB))))
            .andExpect(jsonPath("$.[*].fieldAnyBlobContentType").value(hasItem(DEFAULT_FIELD_ANY_BLOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fieldAnyBlob").value(hasItem(Base64Utils.encodeToString(DEFAULT_FIELD_ANY_BLOB))))
            .andExpect(jsonPath("$.[*].fieldImageBlobContentType").value(hasItem(DEFAULT_FIELD_IMAGE_BLOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fieldImageBlob").value(hasItem(Base64Utils.encodeToString(DEFAULT_FIELD_IMAGE_BLOB))))
            .andExpect(jsonPath("$.[*].fieldTextBlob").value(hasItem(DEFAULT_FIELD_TEXT_BLOB.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllGenericsWithEagerRelationshipsIsEnabled() throws Exception {
        when(genericRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restGenericMockMvc.perform(get("/api/generics?eagerload=true"))
            .andExpect(status().isOk());

        verify(genericRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllGenericsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(genericRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restGenericMockMvc.perform(get("/api/generics?eagerload=true"))
            .andExpect(status().isOk());

        verify(genericRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getGeneric() throws Exception {
        // Initialize the database
        genericRepository.saveAndFlush(generic);

        // Get the generic
        restGenericMockMvc.perform(get("/api/generics/{id}", generic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(generic.getId().intValue()))
            .andExpect(jsonPath("$.fieldString").value(DEFAULT_FIELD_STRING))
            .andExpect(jsonPath("$.fieldInteger").value(DEFAULT_FIELD_INTEGER))
            .andExpect(jsonPath("$.fieldLong").value(DEFAULT_FIELD_LONG.intValue()))
            .andExpect(jsonPath("$.fieldBigDecimal").value(DEFAULT_FIELD_BIG_DECIMAL.intValue()))
            .andExpect(jsonPath("$.fieldFloat").value(DEFAULT_FIELD_FLOAT.doubleValue()))
            .andExpect(jsonPath("$.fieldDouble").value(DEFAULT_FIELD_DOUBLE.doubleValue()))
            .andExpect(jsonPath("$.fieldBoolean").value(DEFAULT_FIELD_BOOLEAN.booleanValue()))
            .andExpect(jsonPath("$.fieldLocalDate").value(DEFAULT_FIELD_LOCAL_DATE.toString()))
            .andExpect(jsonPath("$.fieldZonedDateTime").value(sameInstant(DEFAULT_FIELD_ZONED_DATE_TIME)))
            .andExpect(jsonPath("$.fieldDuration").value(DEFAULT_FIELD_DURATION.toString()))
            .andExpect(jsonPath("$.fieldUUID").value(DEFAULT_FIELD_UUID.toString()))
            .andExpect(jsonPath("$.fieldBlobContentType").value(DEFAULT_FIELD_BLOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.fieldBlob").value(Base64Utils.encodeToString(DEFAULT_FIELD_BLOB)))
            .andExpect(jsonPath("$.fieldAnyBlobContentType").value(DEFAULT_FIELD_ANY_BLOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.fieldAnyBlob").value(Base64Utils.encodeToString(DEFAULT_FIELD_ANY_BLOB)))
            .andExpect(jsonPath("$.fieldImageBlobContentType").value(DEFAULT_FIELD_IMAGE_BLOB_CONTENT_TYPE))
            .andExpect(jsonPath("$.fieldImageBlob").value(Base64Utils.encodeToString(DEFAULT_FIELD_IMAGE_BLOB)))
            .andExpect(jsonPath("$.fieldTextBlob").value(DEFAULT_FIELD_TEXT_BLOB.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingGeneric() throws Exception {
        // Get the generic
        restGenericMockMvc.perform(get("/api/generics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeneric() throws Exception {
        // Initialize the database
        genericRepository.saveAndFlush(generic);

        int databaseSizeBeforeUpdate = genericRepository.findAll().size();

        // Update the generic
        Generic updatedGeneric = genericRepository.findById(generic.getId()).get();
        // Disconnect from session so that the updates on updatedGeneric are not directly saved in db
        em.detach(updatedGeneric);
        updatedGeneric
            .fieldString(UPDATED_FIELD_STRING)
            .fieldInteger(UPDATED_FIELD_INTEGER)
            .fieldLong(UPDATED_FIELD_LONG)
            .fieldBigDecimal(UPDATED_FIELD_BIG_DECIMAL)
            .fieldFloat(UPDATED_FIELD_FLOAT)
            .fieldDouble(UPDATED_FIELD_DOUBLE)
            .fieldBoolean(UPDATED_FIELD_BOOLEAN)
            .fieldLocalDate(UPDATED_FIELD_LOCAL_DATE)
            .fieldZonedDateTime(UPDATED_FIELD_ZONED_DATE_TIME)
            .fieldDuration(UPDATED_FIELD_DURATION)
            .fieldUUID(UPDATED_FIELD_UUID)
            .fieldBlob(UPDATED_FIELD_BLOB)
            .fieldBlobContentType(UPDATED_FIELD_BLOB_CONTENT_TYPE)
            .fieldAnyBlob(UPDATED_FIELD_ANY_BLOB)
            .fieldAnyBlobContentType(UPDATED_FIELD_ANY_BLOB_CONTENT_TYPE)
            .fieldImageBlob(UPDATED_FIELD_IMAGE_BLOB)
            .fieldImageBlobContentType(UPDATED_FIELD_IMAGE_BLOB_CONTENT_TYPE)
            .fieldTextBlob(UPDATED_FIELD_TEXT_BLOB);

        restGenericMockMvc.perform(put("/api/generics").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeneric)))
            .andExpect(status().isOk());

        // Validate the Generic in the database
        List<Generic> genericList = genericRepository.findAll();
        assertThat(genericList).hasSize(databaseSizeBeforeUpdate);
        Generic testGeneric = genericList.get(genericList.size() - 1);
        assertThat(testGeneric.getFieldString()).isEqualTo(UPDATED_FIELD_STRING);
        assertThat(testGeneric.getFieldInteger()).isEqualTo(UPDATED_FIELD_INTEGER);
        assertThat(testGeneric.getFieldLong()).isEqualTo(UPDATED_FIELD_LONG);
        assertThat(testGeneric.getFieldBigDecimal()).isEqualTo(UPDATED_FIELD_BIG_DECIMAL);
        assertThat(testGeneric.getFieldFloat()).isEqualTo(UPDATED_FIELD_FLOAT);
        assertThat(testGeneric.getFieldDouble()).isEqualTo(UPDATED_FIELD_DOUBLE);
        assertThat(testGeneric.isFieldBoolean()).isEqualTo(UPDATED_FIELD_BOOLEAN);
        assertThat(testGeneric.getFieldLocalDate()).isEqualTo(UPDATED_FIELD_LOCAL_DATE);
        assertThat(testGeneric.getFieldZonedDateTime()).isEqualTo(UPDATED_FIELD_ZONED_DATE_TIME);
        assertThat(testGeneric.getFieldDuration()).isEqualTo(UPDATED_FIELD_DURATION);
        assertThat(testGeneric.getFieldUUID()).isEqualTo(UPDATED_FIELD_UUID);
        assertThat(testGeneric.getFieldBlob()).isEqualTo(UPDATED_FIELD_BLOB);
        assertThat(testGeneric.getFieldBlobContentType()).isEqualTo(UPDATED_FIELD_BLOB_CONTENT_TYPE);
        assertThat(testGeneric.getFieldAnyBlob()).isEqualTo(UPDATED_FIELD_ANY_BLOB);
        assertThat(testGeneric.getFieldAnyBlobContentType()).isEqualTo(UPDATED_FIELD_ANY_BLOB_CONTENT_TYPE);
        assertThat(testGeneric.getFieldImageBlob()).isEqualTo(UPDATED_FIELD_IMAGE_BLOB);
        assertThat(testGeneric.getFieldImageBlobContentType()).isEqualTo(UPDATED_FIELD_IMAGE_BLOB_CONTENT_TYPE);
        assertThat(testGeneric.getFieldTextBlob()).isEqualTo(UPDATED_FIELD_TEXT_BLOB);

        // Validate the Generic in Elasticsearch
        verify(mockGenericSearchRepository, times(1)).save(testGeneric);
    }

    @Test
    @Transactional
    public void updateNonExistingGeneric() throws Exception {
        int databaseSizeBeforeUpdate = genericRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenericMockMvc.perform(put("/api/generics").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(generic)))
            .andExpect(status().isBadRequest());

        // Validate the Generic in the database
        List<Generic> genericList = genericRepository.findAll();
        assertThat(genericList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Generic in Elasticsearch
        verify(mockGenericSearchRepository, times(0)).save(generic);
    }

    @Test
    @Transactional
    public void deleteGeneric() throws Exception {
        // Initialize the database
        genericRepository.saveAndFlush(generic);

        int databaseSizeBeforeDelete = genericRepository.findAll().size();

        // Delete the generic
        restGenericMockMvc.perform(delete("/api/generics/{id}", generic.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Generic> genericList = genericRepository.findAll();
        assertThat(genericList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Generic in Elasticsearch
        verify(mockGenericSearchRepository, times(1)).deleteById(generic.getId());
    }

    @Test
    @Transactional
    public void searchGeneric() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        genericRepository.saveAndFlush(generic);
        when(mockGenericSearchRepository.search(queryStringQuery("id:" + generic.getId())))
            .thenReturn(Collections.singletonList(generic));

        // Search the generic
        restGenericMockMvc.perform(get("/api/_search/generics?query=id:" + generic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(generic.getId().intValue())))
            .andExpect(jsonPath("$.[*].fieldString").value(hasItem(DEFAULT_FIELD_STRING)))
            .andExpect(jsonPath("$.[*].fieldInteger").value(hasItem(DEFAULT_FIELD_INTEGER)))
            .andExpect(jsonPath("$.[*].fieldLong").value(hasItem(DEFAULT_FIELD_LONG.intValue())))
            .andExpect(jsonPath("$.[*].fieldBigDecimal").value(hasItem(DEFAULT_FIELD_BIG_DECIMAL.intValue())))
            .andExpect(jsonPath("$.[*].fieldFloat").value(hasItem(DEFAULT_FIELD_FLOAT.doubleValue())))
            .andExpect(jsonPath("$.[*].fieldDouble").value(hasItem(DEFAULT_FIELD_DOUBLE.doubleValue())))
            .andExpect(jsonPath("$.[*].fieldBoolean").value(hasItem(DEFAULT_FIELD_BOOLEAN.booleanValue())))
            .andExpect(jsonPath("$.[*].fieldLocalDate").value(hasItem(DEFAULT_FIELD_LOCAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].fieldZonedDateTime").value(hasItem(sameInstant(DEFAULT_FIELD_ZONED_DATE_TIME))))
            .andExpect(jsonPath("$.[*].fieldDuration").value(hasItem(DEFAULT_FIELD_DURATION.toString())))
            .andExpect(jsonPath("$.[*].fieldUUID").value(hasItem(DEFAULT_FIELD_UUID.toString())))
            .andExpect(jsonPath("$.[*].fieldBlobContentType").value(hasItem(DEFAULT_FIELD_BLOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fieldBlob").value(hasItem(Base64Utils.encodeToString(DEFAULT_FIELD_BLOB))))
            .andExpect(jsonPath("$.[*].fieldAnyBlobContentType").value(hasItem(DEFAULT_FIELD_ANY_BLOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fieldAnyBlob").value(hasItem(Base64Utils.encodeToString(DEFAULT_FIELD_ANY_BLOB))))
            .andExpect(jsonPath("$.[*].fieldImageBlobContentType").value(hasItem(DEFAULT_FIELD_IMAGE_BLOB_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fieldImageBlob").value(hasItem(Base64Utils.encodeToString(DEFAULT_FIELD_IMAGE_BLOB))))
            .andExpect(jsonPath("$.[*].fieldTextBlob").value(hasItem(DEFAULT_FIELD_TEXT_BLOB.toString())));
    }
}
