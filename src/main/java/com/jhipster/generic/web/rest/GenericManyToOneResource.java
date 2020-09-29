package com.jhipster.generic.web.rest;

import com.jhipster.generic.domain.GenericManyToOne;
import com.jhipster.generic.repository.GenericManyToOneRepository;
import com.jhipster.generic.repository.search.GenericManyToOneSearchRepository;
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
 * REST controller for managing {@link com.jhipster.generic.domain.GenericManyToOne}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GenericManyToOneResource {

    private final Logger log = LoggerFactory.getLogger(GenericManyToOneResource.class);

    private static final String ENTITY_NAME = "genericManyToOne";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GenericManyToOneRepository genericManyToOneRepository;

    private final GenericManyToOneSearchRepository genericManyToOneSearchRepository;

    public GenericManyToOneResource(GenericManyToOneRepository genericManyToOneRepository, GenericManyToOneSearchRepository genericManyToOneSearchRepository) {
        this.genericManyToOneRepository = genericManyToOneRepository;
        this.genericManyToOneSearchRepository = genericManyToOneSearchRepository;
    }

    /**
     * {@code POST  /generic-many-to-ones} : Create a new genericManyToOne.
     *
     * @param genericManyToOne the genericManyToOne to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new genericManyToOne, or with status {@code 400 (Bad Request)} if the genericManyToOne has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/generic-many-to-ones")
    public ResponseEntity<GenericManyToOne> createGenericManyToOne(@RequestBody GenericManyToOne genericManyToOne) throws URISyntaxException {
        log.debug("REST request to save GenericManyToOne : {}", genericManyToOne);
        if (genericManyToOne.getId() != null) {
            throw new BadRequestAlertException("A new genericManyToOne cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GenericManyToOne result = genericManyToOneRepository.save(genericManyToOne);
        genericManyToOneSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/generic-many-to-ones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /generic-many-to-ones} : Updates an existing genericManyToOne.
     *
     * @param genericManyToOne the genericManyToOne to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated genericManyToOne,
     * or with status {@code 400 (Bad Request)} if the genericManyToOne is not valid,
     * or with status {@code 500 (Internal Server Error)} if the genericManyToOne couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/generic-many-to-ones")
    public ResponseEntity<GenericManyToOne> updateGenericManyToOne(@RequestBody GenericManyToOne genericManyToOne) throws URISyntaxException {
        log.debug("REST request to update GenericManyToOne : {}", genericManyToOne);
        if (genericManyToOne.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GenericManyToOne result = genericManyToOneRepository.save(genericManyToOne);
        genericManyToOneSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, genericManyToOne.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /generic-many-to-ones} : get all the genericManyToOnes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of genericManyToOnes in body.
     */
    @GetMapping("/generic-many-to-ones")
    public List<GenericManyToOne> getAllGenericManyToOnes() {
        log.debug("REST request to get all GenericManyToOnes");
        return genericManyToOneRepository.findAll();
    }

    /**
     * {@code GET  /generic-many-to-ones/:id} : get the "id" genericManyToOne.
     *
     * @param id the id of the genericManyToOne to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the genericManyToOne, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/generic-many-to-ones/{id}")
    public ResponseEntity<GenericManyToOne> getGenericManyToOne(@PathVariable Long id) {
        log.debug("REST request to get GenericManyToOne : {}", id);
        Optional<GenericManyToOne> genericManyToOne = genericManyToOneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(genericManyToOne);
    }

    /**
     * {@code DELETE  /generic-many-to-ones/:id} : delete the "id" genericManyToOne.
     *
     * @param id the id of the genericManyToOne to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/generic-many-to-ones/{id}")
    public ResponseEntity<Void> deleteGenericManyToOne(@PathVariable Long id) {
        log.debug("REST request to delete GenericManyToOne : {}", id);
        genericManyToOneRepository.deleteById(id);
        genericManyToOneSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/generic-many-to-ones?query=:query} : search for the genericManyToOne corresponding
     * to the query.
     *
     * @param query the query of the genericManyToOne search.
     * @return the result of the search.
     */
    @GetMapping("/_search/generic-many-to-ones")
    public List<GenericManyToOne> searchGenericManyToOnes(@RequestParam String query) {
        log.debug("REST request to search GenericManyToOnes for query {}", query);
        return StreamSupport
            .stream(genericManyToOneSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
