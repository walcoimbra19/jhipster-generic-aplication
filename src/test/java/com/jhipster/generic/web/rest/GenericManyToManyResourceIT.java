package com.jhipster.generic.web.rest;

import com.jhipster.generic.JhipsterGenericAplicationApp;
import com.jhipster.generic.domain.GenericManyToMany;
import com.jhipster.generic.repository.GenericManyToManyRepository;
import com.jhipster.generic.repository.search.GenericManyToManySearchRepository;

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
 * Integration tests for the {@link GenericManyToManyResource} REST controller.
 */
@SpringBootTest(classes = JhipsterGenericAplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class GenericManyToManyResourceIT {

    private static final String DEFAULT_FIELD_MANY_TO_MANY = "AAAAAAAAAA";
    private static final String UPDATED_FIELD_MANY_TO_MANY = "BBBBBBBBBB";

    @Autowired
    private GenericManyToManyRepository genericManyToManyRepository;

    /**
     * This repository is mocked in the com.jhipster.generic.repository.search test package.
     *
     * @see com.jhipster.generic.repository.search.GenericManyToManySearchRepositoryMockConfiguration
     */
    @Autowired
    private GenericManyToManySearchRepository mockGenericManyToManySearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGenericManyToManyMockMvc;

    private GenericManyToMany genericManyToMany;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GenericManyToMany createEntity(EntityManager em) {
        GenericManyToMany genericManyToMany = new GenericManyToMany()
            .fieldManyToMany(DEFAULT_FIELD_MANY_TO_MANY);
        return genericManyToMany;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GenericManyToMany createUpdatedEntity(EntityManager em) {
        GenericManyToMany genericManyToMany = new GenericManyToMany()
            .fieldManyToMany(UPDATED_FIELD_MANY_TO_MANY);
        return genericManyToMany;
    }

    @BeforeEach
    public void initTest() {
        genericManyToMany = createEntity(em);
    }

    @Test
    @Transactional
    public void createGenericManyToMany() throws Exception {
        int databaseSizeBeforeCreate = genericManyToManyRepository.findAll().size();
        // Create the GenericManyToMany
        restGenericManyToManyMockMvc.perform(post("/api/generic-many-to-manies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericManyToMany)))
            .andExpect(status().isCreated());

        // Validate the GenericManyToMany in the database
        List<GenericManyToMany> genericManyToManyList = genericManyToManyRepository.findAll();
        assertThat(genericManyToManyList).hasSize(databaseSizeBeforeCreate + 1);
        GenericManyToMany testGenericManyToMany = genericManyToManyList.get(genericManyToManyList.size() - 1);
        assertThat(testGenericManyToMany.getFieldManyToMany()).isEqualTo(DEFAULT_FIELD_MANY_TO_MANY);

        // Validate the GenericManyToMany in Elasticsearch
        verify(mockGenericManyToManySearchRepository, times(1)).save(testGenericManyToMany);
    }

    @Test
    @Transactional
    public void createGenericManyToManyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = genericManyToManyRepository.findAll().size();

        // Create the GenericManyToMany with an existing ID
        genericManyToMany.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenericManyToManyMockMvc.perform(post("/api/generic-many-to-manies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericManyToMany)))
            .andExpect(status().isBadRequest());

        // Validate the GenericManyToMany in the database
        List<GenericManyToMany> genericManyToManyList = genericManyToManyRepository.findAll();
        assertThat(genericManyToManyList).hasSize(databaseSizeBeforeCreate);

        // Validate the GenericManyToMany in Elasticsearch
        verify(mockGenericManyToManySearchRepository, times(0)).save(genericManyToMany);
    }


    @Test
    @Transactional
    public void getAllGenericManyToManies() throws Exception {
        // Initialize the database
        genericManyToManyRepository.saveAndFlush(genericManyToMany);

        // Get all the genericManyToManyList
        restGenericManyToManyMockMvc.perform(get("/api/generic-many-to-manies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genericManyToMany.getId().intValue())))
            .andExpect(jsonPath("$.[*].fieldManyToMany").value(hasItem(DEFAULT_FIELD_MANY_TO_MANY)));
    }
    
    @Test
    @Transactional
    public void getGenericManyToMany() throws Exception {
        // Initialize the database
        genericManyToManyRepository.saveAndFlush(genericManyToMany);

        // Get the genericManyToMany
        restGenericManyToManyMockMvc.perform(get("/api/generic-many-to-manies/{id}", genericManyToMany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(genericManyToMany.getId().intValue()))
            .andExpect(jsonPath("$.fieldManyToMany").value(DEFAULT_FIELD_MANY_TO_MANY));
    }
    @Test
    @Transactional
    public void getNonExistingGenericManyToMany() throws Exception {
        // Get the genericManyToMany
        restGenericManyToManyMockMvc.perform(get("/api/generic-many-to-manies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGenericManyToMany() throws Exception {
        // Initialize the database
        genericManyToManyRepository.saveAndFlush(genericManyToMany);

        int databaseSizeBeforeUpdate = genericManyToManyRepository.findAll().size();

        // Update the genericManyToMany
        GenericManyToMany updatedGenericManyToMany = genericManyToManyRepository.findById(genericManyToMany.getId()).get();
        // Disconnect from session so that the updates on updatedGenericManyToMany are not directly saved in db
        em.detach(updatedGenericManyToMany);
        updatedGenericManyToMany
            .fieldManyToMany(UPDATED_FIELD_MANY_TO_MANY);

        restGenericManyToManyMockMvc.perform(put("/api/generic-many-to-manies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGenericManyToMany)))
            .andExpect(status().isOk());

        // Validate the GenericManyToMany in the database
        List<GenericManyToMany> genericManyToManyList = genericManyToManyRepository.findAll();
        assertThat(genericManyToManyList).hasSize(databaseSizeBeforeUpdate);
        GenericManyToMany testGenericManyToMany = genericManyToManyList.get(genericManyToManyList.size() - 1);
        assertThat(testGenericManyToMany.getFieldManyToMany()).isEqualTo(UPDATED_FIELD_MANY_TO_MANY);

        // Validate the GenericManyToMany in Elasticsearch
        verify(mockGenericManyToManySearchRepository, times(1)).save(testGenericManyToMany);
    }

    @Test
    @Transactional
    public void updateNonExistingGenericManyToMany() throws Exception {
        int databaseSizeBeforeUpdate = genericManyToManyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenericManyToManyMockMvc.perform(put("/api/generic-many-to-manies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericManyToMany)))
            .andExpect(status().isBadRequest());

        // Validate the GenericManyToMany in the database
        List<GenericManyToMany> genericManyToManyList = genericManyToManyRepository.findAll();
        assertThat(genericManyToManyList).hasSize(databaseSizeBeforeUpdate);

        // Validate the GenericManyToMany in Elasticsearch
        verify(mockGenericManyToManySearchRepository, times(0)).save(genericManyToMany);
    }

    @Test
    @Transactional
    public void deleteGenericManyToMany() throws Exception {
        // Initialize the database
        genericManyToManyRepository.saveAndFlush(genericManyToMany);

        int databaseSizeBeforeDelete = genericManyToManyRepository.findAll().size();

        // Delete the genericManyToMany
        restGenericManyToManyMockMvc.perform(delete("/api/generic-many-to-manies/{id}", genericManyToMany.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GenericManyToMany> genericManyToManyList = genericManyToManyRepository.findAll();
        assertThat(genericManyToManyList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the GenericManyToMany in Elasticsearch
        verify(mockGenericManyToManySearchRepository, times(1)).deleteById(genericManyToMany.getId());
    }

    @Test
    @Transactional
    public void searchGenericManyToMany() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        genericManyToManyRepository.saveAndFlush(genericManyToMany);
        when(mockGenericManyToManySearchRepository.search(queryStringQuery("id:" + genericManyToMany.getId())))
            .thenReturn(Collections.singletonList(genericManyToMany));

        // Search the genericManyToMany
        restGenericManyToManyMockMvc.perform(get("/api/_search/generic-many-to-manies?query=id:" + genericManyToMany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genericManyToMany.getId().intValue())))
            .andExpect(jsonPath("$.[*].fieldManyToMany").value(hasItem(DEFAULT_FIELD_MANY_TO_MANY)));
    }
}
