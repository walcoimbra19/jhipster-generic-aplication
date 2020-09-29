package com.jhipster.generic.web.rest;

import com.jhipster.generic.domain.GenericHistory;
import com.jhipster.generic.repository.GenericHistoryRepository;
import com.jhipster.generic.repository.search.GenericHistorySearchRepository;
import com.jhipster.generic.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.jhipster.generic.domain.GenericHistory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GenericHistoryResource {

    private final Logger log = LoggerFactory.getLogger(GenericHistoryResource.class);

    private static final String ENTITY_NAME = "genericHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GenericHistoryRepository genericHistoryRepository;

    private final GenericHistorySearchRepository genericHistorySearchRepository;

    public GenericHistoryResource(GenericHistoryRepository genericHistoryRepository, GenericHistorySearchRepository genericHistorySearchRepository) {
        this.genericHistoryRepository = genericHistoryRepository;
        this.genericHistorySearchRepository = genericHistorySearchRepository;
    }

    /**
     * {@code POST  /generic-histories} : Create a new genericHistory.
     *
     * @param genericHistory the genericHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new genericHistory, or with status {@code 400 (Bad Request)} if the genericHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/generic-histories")
    public ResponseEntity<GenericHistory> createGenericHistory(@RequestBody GenericHistory genericHistory) throws URISyntaxException {
        log.debug("REST request to save GenericHistory : {}", genericHistory);
        if (genericHistory.getId() != null) {
            throw new BadRequestAlertException("A new genericHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GenericHistory result = genericHistoryRepository.save(genericHistory);
        genericHistorySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/generic-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /generic-histories} : Updates an existing genericHistory.
     *
     * @param genericHistory the genericHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated genericHistory,
     * or with status {@code 400 (Bad Request)} if the genericHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the genericHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/generic-histories")
    public ResponseEntity<GenericHistory> updateGenericHistory(@RequestBody GenericHistory genericHistory) throws URISyntaxException {
        log.debug("REST request to update GenericHistory : {}", genericHistory);
        if (genericHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GenericHistory result = genericHistoryRepository.save(genericHistory);
        genericHistorySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, genericHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /generic-histories} : get all the genericHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of genericHistories in body.
     */
    @GetMapping("/generic-histories")
    public List<GenericHistory> getAllGenericHistories() {
        log.debug("REST request to get all GenericHistories");
        return genericHistoryRepository.findAll();
    }

    /**
     * {@code GET  /generic-histories/:id} : get the "id" genericHistory.
     *
     * @param id the id of the genericHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the genericHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/generic-histories/{id}")
    public ResponseEntity<GenericHistory> getGenericHistory(@PathVariable Long id) {
        log.debug("REST request to get GenericHistory : {}", id);
        Optional<GenericHistory> genericHistory = genericHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(genericHistory);
    }

    /**
     * {@code DELETE  /generic-histories/:id} : delete the "id" genericHistory.
     *
     * @param id the id of the genericHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/generic-histories/{id}")
    public ResponseEntity<Void> deleteGenericHistory(@PathVariable Long id) {
        log.debug("REST request to delete GenericHistory : {}", id);
        genericHistoryRepository.deleteById(id);
        genericHistorySearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/generic-histories?query=:query} : search for the genericHistory corresponding
     * to the query.
     *
     * @param query the query of the genericHistory search.
     * @return the result of the search.
     */
    @GetMapping("/_search/generic-histories")
    public List<GenericHistory> searchGenericHistories(@RequestParam String query) {
        log.debug("REST request to search GenericHistories for query {}", query);
        return StreamSupport
            .stream(genericHistorySearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
