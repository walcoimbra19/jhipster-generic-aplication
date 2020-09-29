package com.jhipster.generic.web.rest;

import com.jhipster.generic.JhipsterGenericAplicationApp;
import com.jhipster.generic.domain.GenericOneToMany;
import com.jhipster.generic.repository.GenericOneToManyRepository;
import com.jhipster.generic.repository.search.GenericOneToManySearchRepository;

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
 * Integration tests for the {@link GenericOneToManyResource} REST controller.
 */
@SpringBootTest(classes = JhipsterGenericAplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class GenericOneToManyResourceIT {

    private static final String DEFAULT_FIELD_ONE_TO_MANY = "AAAAAAAAAA";
    private static final String UPDATED_FIELD_ONE_TO_MANY = "BBBBBBBBBB";

    @Autowired
    private GenericOneToManyRepository genericOneToManyRepository;

    /**
     * This repository is mocked in the com.jhipster.generic.repository.search test package.
     *
     * @see com.jhipster.generic.repository.search.GenericOneToManySearchRepositoryMockConfiguration
     */
    @Autowired
    private GenericOneToManySearchRepository mockGenericOneToManySearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGenericOneToManyMockMvc;

    private GenericOneToMany genericOneToMany;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GenericOneToMany createEntity(EntityManager em) {
        GenericOneToMany genericOneToMany = new GenericOneToMany()
            .fieldOneToMany(DEFAULT_FIELD_ONE_TO_MANY);
        return genericOneToMany;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GenericOneToMany createUpdatedEntity(EntityManager em) {
        GenericOneToMany genericOneToMany = new GenericOneToMany()
            .fieldOneToMany(UPDATED_FIELD_ONE_TO_MANY);
        return genericOneToMany;
    }

    @BeforeEach
    public void initTest() {
        genericOneToMany = createEntity(em);
    }

    @Test
    @Transactional
    public void createGenericOneToMany() throws Exception {
        int databaseSizeBeforeCreate = genericOneToManyRepository.findAll().size();
        // Create the GenericOneToMany
        restGenericOneToManyMockMvc.perform(post("/api/generic-one-to-manies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericOneToMany)))
            .andExpect(status().isCreated());

        // Validate the GenericOneToMany in the database
        List<GenericOneToMany> genericOneToManyList = genericOneToManyRepository.findAll();
        assertThat(genericOneToManyList).hasSize(databaseSizeBeforeCreate + 1);
        GenericOneToMany testGenericOneToMany = genericOneToManyList.get(genericOneToManyList.size() - 1);
        assertThat(testGenericOneToMany.getFieldOneToMany()).isEqualTo(DEFAULT_FIELD_ONE_TO_MANY);

        // Validate the GenericOneToMany in Elasticsearch
        verify(mockGenericOneToManySearchRepository, times(1)).save(testGenericOneToMany);
    }

    @Test
    @Transactional
    public void createGenericOneToManyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = genericOneToManyRepository.findAll().size();

        // Create the GenericOneToMany with an existing ID
        genericOneToMany.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenericOneToManyMockMvc.perform(post("/api/generic-one-to-manies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericOneToMany)))
            .andExpect(status().isBadRequest());

        // Validate the GenericOneToMany in the database
        List<GenericOneToMany> genericOneToManyList = genericOneToManyRepository.findAll();
        assertThat(genericOneToManyList).hasSize(databaseSizeBeforeCreate);

        // Validate the GenericOneToMany in Elasticsearch
        verify(mockGenericOneToManySearchRepository, times(0)).save(genericOneToMany);
    }


    @Test
    @Transactional
    public void getAllGenericOneToManies() throws Exception {
        // Initialize the database
        genericOneToManyRepository.saveAndFlush(genericOneToMany);

        // Get all the genericOneToManyList
        restGenericOneToManyMockMvc.perform(get("/api/generic-one-to-manies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genericOneToMany.getId().intValue())))
            .andExpect(jsonPath("$.[*].fieldOneToMany").value(hasItem(DEFAULT_FIELD_ONE_TO_MANY)));
    }
    
    @Test
    @Transactional
    public void getGenericOneToMany() throws Exception {
        // Initialize the database
        genericOneToManyRepository.saveAndFlush(genericOneToMany);

        // Get the genericOneToMany
        restGenericOneToManyMockMvc.perform(get("/api/generic-one-to-manies/{id}", genericOneToMany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(genericOneToMany.getId().intValue()))
            .andExpect(jsonPath("$.fieldOneToMany").value(DEFAULT_FIELD_ONE_TO_MANY));
    }
    @Test
    @Transactional
    public void getNonExistingGenericOneToMany() throws Exception {
        // Get the genericOneToMany
        restGenericOneToManyMockMvc.perform(get("/api/generic-one-to-manies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGenericOneToMany() throws Exception {
        // Initialize the database
        genericOneToManyRepository.saveAndFlush(genericOneToMany);

        int databaseSizeBeforeUpdate = genericOneToManyRepository.findAll().size();

        // Update the genericOneToMany
        GenericOneToMany updatedGenericOneToMany = genericOneToManyRepository.findById(genericOneToMany.getId()).get();
        // Disconnect from session so that the updates on updatedGenericOneToMany are not directly saved in db
        em.detach(updatedGenericOneToMany);
        updatedGenericOneToMany
            .fieldOneToMany(UPDATED_FIELD_ONE_TO_MANY);

        restGenericOneToManyMockMvc.perform(put("/api/generic-one-to-manies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGenericOneToMany)))
            .andExpect(status().isOk());

        // Validate the GenericOneToMany in the database
        List<GenericOneToMany> genericOneToManyList = genericOneToManyRepository.findAll();
        assertThat(genericOneToManyList).hasSize(databaseSizeBeforeUpdate);
        GenericOneToMany testGenericOneToMany = genericOneToManyList.get(genericOneToManyList.size() - 1);
        assertThat(testGenericOneToMany.getFieldOneToMany()).isEqualTo(UPDATED_FIELD_ONE_TO_MANY);

        // Validate the GenericOneToMany in Elasticsearch
        verify(mockGenericOneToManySearchRepository, times(1)).save(testGenericOneToMany);
    }

    @Test
    @Transactional
    public void updateNonExistingGenericOneToMany() throws Exception {
        int databaseSizeBeforeUpdate = genericOneToManyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenericOneToManyMockMvc.perform(put("/api/generic-one-to-manies").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericOneToMany)))
            .andExpect(status().isBadRequest());

        // Validate the GenericOneToMany in the database
        List<GenericOneToMany> genericOneToManyList = genericOneToManyRepository.findAll();
        assertThat(genericOneToManyList).hasSize(databaseSizeBeforeUpdate);

        // Validate the GenericOneToMany in Elasticsearch
        verify(mockGenericOneToManySearchRepository, times(0)).save(genericOneToMany);
    }

    @Test
    @Transactional
    public void deleteGenericOneToMany() throws Exception {
        // Initialize the database
        genericOneToManyRepository.saveAndFlush(genericOneToMany);

        int databaseSizeBeforeDelete = genericOneToManyRepository.findAll().size();

        // Delete the genericOneToMany
        restGenericOneToManyMockMvc.perform(delete("/api/generic-one-to-manies/{id}", genericOneToMany.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GenericOneToMany> genericOneToManyList = genericOneToManyRepository.findAll();
        assertThat(genericOneToManyList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the GenericOneToMany in Elasticsearch
        verify(mockGenericOneToManySearchRepository, times(1)).deleteById(genericOneToMany.getId());
    }

    @Test
    @Transactional
    public void searchGenericOneToMany() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        genericOneToManyRepository.saveAndFlush(genericOneToMany);
        when(mockGenericOneToManySearchRepository.search(queryStringQuery("id:" + genericOneToMany.getId())))
            .thenReturn(Collections.singletonList(genericOneToMany));

        // Search the genericOneToMany
        restGenericOneToManyMockMvc.perform(get("/api/_search/generic-one-to-manies?query=id:" + genericOneToMany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genericOneToMany.getId().intValue())))
            .andExpect(jsonPath("$.[*].fieldOneToMany").value(hasItem(DEFAULT_FIELD_ONE_TO_MANY)));
    }
}
