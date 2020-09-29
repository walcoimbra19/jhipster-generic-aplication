package com.jhipster.generic.web.rest;

import com.jhipster.generic.JhipsterGenericAplicationApp;
import com.jhipster.generic.domain.GenericHistory;
import com.jhipster.generic.repository.GenericHistoryRepository;
import com.jhipster.generic.repository.search.GenericHistorySearchRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jhipster.generic.domain.enumeration.Language;
/**
 * Integration tests for the {@link GenericHistoryResource} REST controller.
 */
@SpringBootTest(classes = JhipsterGenericAplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class GenericHistoryResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Language DEFAULT_LANGUAGE = Language.FRENCH;
    private static final Language UPDATED_LANGUAGE = Language.ENGLISH;

    @Autowired
    private GenericHistoryRepository genericHistoryRepository;

    /**
     * This repository is mocked in the com.jhipster.generic.repository.search test package.
     *
     * @see com.jhipster.generic.repository.search.GenericHistorySearchRepositoryMockConfiguration
     */
    @Autowired
    private GenericHistorySearchRepository mockGenericHistorySearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGenericHistoryMockMvc;

    private GenericHistory genericHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GenericHistory createEntity(EntityManager em) {
        GenericHistory genericHistory = new GenericHistory()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .language(DEFAULT_LANGUAGE);
        return genericHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GenericHistory createUpdatedEntity(EntityManager em) {
        GenericHistory genericHistory = new GenericHistory()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .language(UPDATED_LANGUAGE);
        return genericHistory;
    }

    @BeforeEach
    public void initTest() {
        genericHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createGenericHistory() throws Exception {
        int databaseSizeBeforeCreate = genericHistoryRepository.findAll().size();
        // Create the GenericHistory
        restGenericHistoryMockMvc.perform(post("/api/generic-histories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericHistory)))
            .andExpect(status().isCreated());

        // Validate the GenericHistory in the database
        List<GenericHistory> genericHistoryList = genericHistoryRepository.findAll();
        assertThat(genericHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        GenericHistory testGenericHistory = genericHistoryList.get(genericHistoryList.size() - 1);
        assertThat(testGenericHistory.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testGenericHistory.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testGenericHistory.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);

        // Validate the GenericHistory in Elasticsearch
        verify(mockGenericHistorySearchRepository, times(1)).save(testGenericHistory);
    }

    @Test
    @Transactional
    public void createGenericHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = genericHistoryRepository.findAll().size();

        // Create the GenericHistory with an existing ID
        genericHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenericHistoryMockMvc.perform(post("/api/generic-histories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericHistory)))
            .andExpect(status().isBadRequest());

        // Validate the GenericHistory in the database
        List<GenericHistory> genericHistoryList = genericHistoryRepository.findAll();
        assertThat(genericHistoryList).hasSize(databaseSizeBeforeCreate);

        // Validate the GenericHistory in Elasticsearch
        verify(mockGenericHistorySearchRepository, times(0)).save(genericHistory);
    }


    @Test
    @Transactional
    public void getAllGenericHistories() throws Exception {
        // Initialize the database
        genericHistoryRepository.saveAndFlush(genericHistory);

        // Get all the genericHistoryList
        restGenericHistoryMockMvc.perform(get("/api/generic-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genericHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getGenericHistory() throws Exception {
        // Initialize the database
        genericHistoryRepository.saveAndFlush(genericHistory);

        // Get the genericHistory
        restGenericHistoryMockMvc.perform(get("/api/generic-histories/{id}", genericHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(genericHistory.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingGenericHistory() throws Exception {
        // Get the genericHistory
        restGenericHistoryMockMvc.perform(get("/api/generic-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGenericHistory() throws Exception {
        // Initialize the database
        genericHistoryRepository.saveAndFlush(genericHistory);

        int databaseSizeBeforeUpdate = genericHistoryRepository.findAll().size();

        // Update the genericHistory
        GenericHistory updatedGenericHistory = genericHistoryRepository.findById(genericHistory.getId()).get();
        // Disconnect from session so that the updates on updatedGenericHistory are not directly saved in db
        em.detach(updatedGenericHistory);
        updatedGenericHistory
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .language(UPDATED_LANGUAGE);

        restGenericHistoryMockMvc.perform(put("/api/generic-histories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGenericHistory)))
            .andExpect(status().isOk());

        // Validate the GenericHistory in the database
        List<GenericHistory> genericHistoryList = genericHistoryRepository.findAll();
        assertThat(genericHistoryList).hasSize(databaseSizeBeforeUpdate);
        GenericHistory testGenericHistory = genericHistoryList.get(genericHistoryList.size() - 1);
        assertThat(testGenericHistory.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testGenericHistory.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testGenericHistory.getLanguage()).isEqualTo(UPDATED_LANGUAGE);

        // Validate the GenericHistory in Elasticsearch
        verify(mockGenericHistorySearchRepository, times(1)).save(testGenericHistory);
    }

    @Test
    @Transactional
    public void updateNonExistingGenericHistory() throws Exception {
        int databaseSizeBeforeUpdate = genericHistoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenericHistoryMockMvc.perform(put("/api/generic-histories").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(genericHistory)))
            .andExpect(status().isBadRequest());

        // Validate the GenericHistory in the database
        List<GenericHistory> genericHistoryList = genericHistoryRepository.findAll();
        assertThat(genericHistoryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the GenericHistory in Elasticsearch
        verify(mockGenericHistorySearchRepository, times(0)).save(genericHistory);
    }

    @Test
    @Transactional
    public void deleteGenericHistory() throws Exception {
        // Initialize the database
        genericHistoryRepository.saveAndFlush(genericHistory);

        int databaseSizeBeforeDelete = genericHistoryRepository.findAll().size();

        // Delete the genericHistory
        restGenericHistoryMockMvc.perform(delete("/api/generic-histories/{id}", genericHistory.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GenericHistory> genericHistoryList = genericHistoryRepository.findAll();
        assertThat(genericHistoryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the GenericHistory in Elasticsearch
        verify(mockGenericHistorySearchRepository, times(1)).deleteById(genericHistory.getId());
    }

    @Test
    @Transactional
    public void searchGenericHistory() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        genericHistoryRepository.saveAndFlush(genericHistory);
        when(mockGenericHistorySearchRepository.search(queryStringQuery("id:" + genericHistory.getId())))
            .thenReturn(Collections.singletonList(genericHistory));

        // Search the genericHistory
        restGenericHistoryMockMvc.perform(get("/api/_search/generic-histories?query=id:" + genericHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(genericHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
}
