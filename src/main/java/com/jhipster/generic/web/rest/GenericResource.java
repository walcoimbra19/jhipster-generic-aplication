package com.jhipster.generic.web.rest;

import com.jhipster.generic.domain.Generic;
import com.jhipster.generic.repository.GenericRepository;
import com.jhipster.generic.repository.search.GenericSearchRepository;
import com.jhipster.generic.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.jhipster.generic.domain.Generic}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GenericResource {

    private final Logger log = LoggerFactory.getLogger(GenericResource.class);

    private static final String ENTITY_NAME = "generic";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GenericRepository genericRepository;

    private final GenericSearchRepository genericSearchRepository;

    public GenericResource(GenericRepository genericRepository, GenericSearchRepository genericSearchRepository) {
        this.genericRepository = genericRepository;
        this.genericSearchRepository = genericSearchRepository;
    }

    /**
     * {@code POST  /generics} : Create a new generic.
     *
     * @param generic the generic to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new generic, or with status {@code 400 (Bad Request)} if the generic has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/generics")
    public ResponseEntity<Generic> createGeneric(@Valid @RequestBody Generic generic) throws URISyntaxException {
        log.debug("REST request to save Generic : {}", generic);
        if (generic.getId() != null) {
            throw new BadRequestAlertException("A new generic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Generic result = genericRepository.save(generic);
        genericSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/generics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /generics} : Updates an existing generic.
     *
     * @param generic the generic to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated generic,
     * or with status {@code 400 (Bad Request)} if the generic is not valid,
     * or with status {@code 500 (Internal Server Error)} if the generic couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/generics")
    public ResponseEntity<Generic> updateGeneric(@Valid @RequestBody Generic generic) throws URISyntaxException {
        log.debug("REST request to update Generic : {}", generic);
        if (generic.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Generic result = genericRepository.save(generic);
        genericSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, generic.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /generics} : get all the generics.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of generics in body.
     */
    @GetMapping("/generics")
    public List<Generic> getAllGenerics(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Generics");
        return genericRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /generics/:id} : get the "id" generic.
     *
     * @param id the id of the generic to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the generic, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/generics/{id}")
    public ResponseEntity<Generic> getGeneric(@PathVariable Long id) {
        log.debug("REST request to get Generic : {}", id);
        Optional<Generic> generic = genericRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(generic);
    }

    /**
     * {@code DELETE  /generics/:id} : delete the "id" generic.
     *
     * @param id the id of the generic to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/generics/{id}")
    public ResponseEntity<Void> deleteGeneric(@PathVariable Long id) {
        log.debug("REST request to delete Generic : {}", id);
        genericRepository.deleteById(id);
        genericSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/generics?query=:query} : search for the generic corresponding
     * to the query.
     *
     * @param query the query of the generic search.
     * @return the result of the search.
     */
    @GetMapping("/_search/generics")
    public List<Generic> searchGenerics(@RequestParam String query) {
        log.debug("REST request to search Generics for query {}", query);
        return StreamSupport
            .stream(genericSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
