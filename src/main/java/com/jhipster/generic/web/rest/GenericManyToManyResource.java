package com.jhipster.generic.web.rest;

import com.jhipster.generic.domain.GenericManyToMany;
import com.jhipster.generic.repository.GenericManyToManyRepository;
import com.jhipster.generic.repository.search.GenericManyToManySearchRepository;
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
 * REST controller for managing {@link com.jhipster.generic.domain.GenericManyToMany}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GenericManyToManyResource {

    private final Logger log = LoggerFactory.getLogger(GenericManyToManyResource.class);

    private static final String ENTITY_NAME = "genericManyToMany";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GenericManyToManyRepository genericManyToManyRepository;

    private final GenericManyToManySearchRepository genericManyToManySearchRepository;

    public GenericManyToManyResource(GenericManyToManyRepository genericManyToManyRepository, GenericManyToManySearchRepository genericManyToManySearchRepository) {
        this.genericManyToManyRepository = genericManyToManyRepository;
        this.genericManyToManySearchRepository = genericManyToManySearchRepository;
    }

    /**
     * {@code POST  /generic-many-to-manies} : Create a new genericManyToMany.
     *
     * @param genericManyToMany the genericManyToMany to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new genericManyToMany, or with status {@code 400 (Bad Request)} if the genericManyToMany has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/generic-many-to-manies")
    public ResponseEntity<GenericManyToMany> createGenericManyToMany(@RequestBody GenericManyToMany genericManyToMany) throws URISyntaxException {
        log.debug("REST request to save GenericManyToMany : {}", genericManyToMany);
        if (genericManyToMany.getId() != null) {
            throw new BadRequestAlertException("A new genericManyToMany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GenericManyToMany result = genericManyToManyRepository.save(genericManyToMany);
        genericManyToManySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/generic-many-to-manies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /generic-many-to-manies} : Updates an existing genericManyToMany.
     *
     * @param genericManyToMany the genericManyToMany to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated genericManyToMany,
     * or with status {@code 400 (Bad Request)} if the genericManyToMany is not valid,
     * or with status {@code 500 (Internal Server Error)} if the genericManyToMany couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/generic-many-to-manies")
    public ResponseEntity<GenericManyToMany> updateGenericManyToMany(@RequestBody GenericManyToMany genericManyToMany) throws URISyntaxException {
        log.debug("REST request to update GenericManyToMany : {}", genericManyToMany);
        if (genericManyToMany.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GenericManyToMany result = genericManyToManyRepository.save(genericManyToMany);
        genericManyToManySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, genericManyToMany.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /generic-many-to-manies} : get all the genericManyToManies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of genericManyToManies in body.
     */
    @GetMapping("/generic-many-to-manies")
    public List<GenericManyToMany> getAllGenericManyToManies() {
        log.debug("REST request to get all GenericManyToManies");
        return genericManyToManyRepository.findAll();
    }

    /**
     * {@code GET  /generic-many-to-manies/:id} : get the "id" genericManyToMany.
     *
     * @param id the id of the genericManyToMany to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the genericManyToMany, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/generic-many-to-manies/{id}")
    public ResponseEntity<GenericManyToMany> getGenericManyToMany(@PathVariable Long id) {
        log.debug("REST request to get GenericManyToMany : {}", id);
        Optional<GenericManyToMany> genericManyToMany = genericManyToManyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(genericManyToMany);
    }

    /**
     * {@code DELETE  /generic-many-to-manies/:id} : delete the "id" genericManyToMany.
     *
     * @param id the id of the genericManyToMany to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/generic-many-to-manies/{id}")
    public ResponseEntity<Void> deleteGenericManyToMany(@PathVariable Long id) {
        log.debug("REST request to delete GenericManyToMany : {}", id);
        genericManyToManyRepository.deleteById(id);
        genericManyToManySearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/generic-many-to-manies?query=:query} : search for the genericManyToMany corresponding
     * to the query.
     *
     * @param query the query of the genericManyToMany search.
     * @return the result of the search.
     */
    @GetMapping("/_search/generic-many-to-manies")
    public List<GenericManyToMany> searchGenericManyToManies(@RequestParam String query) {
        log.debug("REST request to search GenericManyToManies for query {}", query);
        return StreamSupport
            .stream(genericManyToManySearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
