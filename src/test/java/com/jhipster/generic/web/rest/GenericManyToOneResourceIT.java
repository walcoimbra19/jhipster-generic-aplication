package com.jhipster.generic.web.rest;

import com.jhipster.generic.JhipsterGenericAplicationApp;
import com.jhipster.generic.domain.GenericManyToOne;
import com.jhipster.generic.repository.GenericManyToOneRepository;
import com.jhipster.generic.repository.search.GenericManyToOneSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GenericManyToOneResource} REST controller.
 */
@SpringBootTest(classes = JhipsterGenericAplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class GenericManyToOneResourceIT {

    private static final String DEFAULT_FIELD_MANY_TO_ONE = "AAAAAAAAAA";
    private static final String UPDATED_FIELD_MANY_TO_ONE = "BBBBBBBBBB";

    @Autowired
    private GenericManyToOneRepository genericManyToOneRepository;

    /**
     * This repository is mocked in the com.jhipster.generic.repository.search test package.
     *
     * @see com.jhipster.generic.repository.search.GenericManyToOneSearchRepositoryMockConfiguration
     */
    @Autowired
    private GenericManyToOneSearchRepository mockGenericManyToOneSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGenericManyToOneMockMvc;

    private GenericManyToOne genericManyToOne;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GenericManyToOne createEntity(EntityManager em) {
        GenericManyToOne genericManyToOne = new GenericManyToOne()
            .fieldManyToOne(DEFAULT_FIELD_MANY_TO_ONE);
        return genericManyToOne;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GenericManyToOne createUpdatedEntity(EntityManager em) {
        GenericManyToOne genericManyToOne = new GenericManyToOne()
            .fieldManyToOne(UPDATED_FIELD_MANY_TO_ONE);
        return genericManyToOne;
    }

    @BeforeEach
    public void initTest() {
        genericManyToOne = createEntity(em);
    }

    @Test
    @Transactional
    public void createGenericManyToOne() throws Exception {
        int databaseSizeBeforeCreate = genericManyToOneRepository.findAll().size();
        // Create the GenericManyToOne
        restGenericManyToOneMockMvc.perform(post("/api/generic-many-to-ones").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericManyToOne)))
            .andExpect(status().isCreated());

        // Validate the GenericManyToOne in the database
        List<GenericManyToOne> genericManyToOneList = genericManyToOneRepository.findAll();
        assertThat(genericManyToOneList).hasSize(databaseSizeBeforeCreate + 1);
        GenericManyToOne testGenericManyToOne = genericManyToOneList.get(genericManyToOneList.size() - 1);
        assertThat(testGenericManyToOne.getFieldManyToOne()).isEqualTo(DEFAULT_FIELD_MANY_TO_ONE);

        // Validate the GenericManyToOne in Elasticsearch
        verify(mockGenericManyToOneSearchRepository, times(1)).save(testGenericManyToOne);
    }

    @Test
    @Transactional
    public void createGenericManyToOneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = genericManyToOneRepository.findAll().size();

        // Create the GenericManyToOne with an existing ID
        genericManyToOne.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenericManyToOneMockMvc.perform(post("/api/generic-many-to-ones").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericManyToOne)))
            .andExpect(status().isBadRequest());

        // Validate the GenericManyToOne in the database
        List<GenericManyToOne> genericManyToOneList = genericManyToOneRepository.findAll();
        assertThat(genericManyToOneList).hasSize(databaseSizeBeforeCreate);

        // Validate the GenericManyToOne in Elasticsearch
        verify(mockGenericManyToOneSearchRepository, times(0)).save(genericManyToOne);
    }


    @Test
    @Transactional
    public void getAllGenericManyToOnes() throws Exception {
        // Initialize the database
        genericManyToOneRepository.saveAndFlush(genericManyToOne);

        // Get all the genericManyToOneList
        restGenericManyToOneMockMvc.perform(get("/api/generic-many-to-ones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genericManyToOne.getId().intValue())))
            .andExpect(jsonPath("$.[*].fieldManyToOne").value(hasItem(DEFAULT_FIELD_MANY_TO_ONE)));
    }
    
    @Test
    @Transactional
    public void getGenericManyToOne() throws Exception {
        // Initialize the database
        genericManyToOneRepository.saveAndFlush(genericManyToOne);

        // Get the genericManyToOne
        restGenericManyToOneMockMvc.perform(get("/api/generic-many-to-ones/{id}", genericManyToOne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(genericManyToOne.getId().intValue()))
            .andExpect(jsonPath("$.fieldManyToOne").value(DEFAULT_FIELD_MANY_TO_ONE));
    }
    @Test
    @Transactional
    public void getNonExistingGenericManyToOne() throws Exception {
        // Get the genericManyToOne
        restGenericManyToOneMockMvc.perform(get("/api/generic-many-to-ones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGenericManyToOne() throws Exception {
        // Initialize the database
        genericManyToOneRepository.saveAndFlush(genericManyToOne);

        int databaseSizeBeforeUpdate = genericManyToOneRepository.findAll().size();

        // Update the genericManyToOne
        GenericManyToOne updatedGenericManyToOne = genericManyToOneRepository.findById(genericManyToOne.getId()).get();
        // Disconnect from session so that the updates on updatedGenericManyToOne are not directly saved in db
        em.detach(updatedGenericManyToOne);
        updatedGenericManyToOne
            .fieldManyToOne(UPDATED_FIELD_MANY_TO_ONE);

        restGenericManyToOneMockMvc.perform(put("/api/generic-many-to-ones").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGenericManyToOne)))
            .andExpect(status().isOk());

        // Validate the GenericManyToOne in the database
        List<GenericManyToOne> genericManyToOneList = genericManyToOneRepository.findAll();
        assertThat(genericManyToOneList).hasSize(databaseSizeBeforeUpdate);
        GenericManyToOne testGenericManyToOne = genericManyToOneList.get(genericManyToOneList.size() - 1);
        assertThat(testGenericManyToOne.getFieldManyToOne()).isEqualTo(UPDATED_FIELD_MANY_TO_ONE);

        // Validate the GenericManyToOne in Elasticsearch
        verify(mockGenericManyToOneSearchRepository, times(1)).save(testGenericManyToOne);
    }

    @Test
    @Transactional
    public void updateNonExistingGenericManyToOne() throws Exception {
        int databaseSizeBeforeUpdate = genericManyToOneRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenericManyToOneMockMvc.perform(put("/api/generic-many-to-ones").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericManyToOne)))
            .andExpect(status().isBadRequest());

        // Validate the GenericManyToOne in the database
        List<GenericManyToOne> genericManyToOneList = genericManyToOneRepository.findAll();
        assertThat(genericManyToOneList).hasSize(databaseSizeBeforeUpdate);

        // Validate the GenericManyToOne in Elasticsearch
        verify(mockGenericManyToOneSearchRepository, times(0)).save(genericManyToOne);
    }

    @Test
    @Transactional
    public void deleteGenericManyToOne() throws Exception {
        // Initialize the database
        genericManyToOneRepository.saveAndFlush(genericManyToOne);

        int databaseSizeBeforeDelete = genericManyToOneRepository.findAll().size();

        // Delete the genericManyToOne
        restGenericManyToOneMockMvc.perform(delete("/api/generic-many-to-ones/{id}", genericManyToOne.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GenericManyToOne> genericManyToOneList = genericManyToOneRepository.findAll();
        assertThat(genericManyToOneList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the GenericManyToOne in Elasticsearch
        verify(mockGenericManyToOneSearchRepository, times(1)).deleteById(genericManyToOne.getId());
    }

    @Test
    @Transactional
    public void searchGenericManyToOne() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        genericManyToOneRepository.saveAndFlush(genericManyToOne);
        when(mockGenericManyToOneSearchRepository.search(queryStringQuery("id:" + genericManyToOne.getId())))
            .thenReturn(Collections.singletonList(genericManyToOne));

        // Search the genericManyToOne
        restGenericManyToOneMockMvc.perform(get("/api/_search/generic-many-to-ones?query=id:" + genericManyToOne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genericManyToOne.getId().intValue())))
            .andExpect(jsonPath("$.[*].fieldManyToOne").value(hasItem(DEFAULT_FIELD_MANY_TO_ONE)));
    }
}
