package com.jhipster.generic.web.rest;

import com.jhipster.generic.domain.GenericOneToMany;
import com.jhipster.generic.repository.GenericOneToManyRepository;
import com.jhipster.generic.repository.search.GenericOneToManySearchRepository;
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
 * REST controller for managing {@link com.jhipster.generic.domain.GenericOneToMany}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GenericOneToManyResource {

    private final Logger log = LoggerFactory.getLogger(GenericOneToManyResource.class);

    private static final String ENTITY_NAME = "genericOneToMany";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GenericOneToManyRepository genericOneToManyRepository;

    private final GenericOneToManySearchRepository genericOneToManySearchRepository;

    public GenericOneToManyResource(GenericOneToManyRepository genericOneToManyRepository, GenericOneToManySearchRepository genericOneToManySearchRepository) {
        this.genericOneToManyRepository = genericOneToManyRepository;
        this.genericOneToManySearchRepository = genericOneToManySearchRepository;
    }

    /**
     * {@code POST  /generic-one-to-manies} : Create a new genericOneToMany.
     *
     * @param genericOneToMany the genericOneToMany to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new genericOneToMany, or with status {@code 400 (Bad Request)} if the genericOneToMany has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/generic-one-to-manies")
    public ResponseEntity<GenericOneToMany> createGenericOneToMany(@RequestBody GenericOneToMany genericOneToMany) throws URISyntaxException {
        log.debug("REST request to save GenericOneToMany : {}", genericOneToMany);
        if (genericOneToMany.getId() != null) {
            throw new BadRequestAlertException("A new genericOneToMany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GenericOneToMany result = genericOneToManyRepository.save(genericOneToMany);
        genericOneToManySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/generic-one-to-manies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /generic-one-to-manies} : Updates an existing genericOneToMany.
     *
     * @param genericOneToMany the genericOneToMany to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated genericOneToMany,
     * or with status {@code 400 (Bad Request)} if the genericOneToMany is not valid,
     * or with status {@code 500 (Internal Server Error)} if the genericOneToMany couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/generic-one-to-manies")
    public ResponseEntity<GenericOneToMany> updateGenericOneToMany(@RequestBody GenericOneToMany genericOneToMany) throws URISyntaxException {
        log.debug("REST request to update GenericOneToMany : {}", genericOneToMany);
        if (genericOneToMany.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GenericOneToMany result = genericOneToManyRepository.save(genericOneToMany);
        genericOneToManySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, genericOneToMany.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /generic-one-to-manies} : get all the genericOneToManies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of genericOneToManies in body.
     */
    @GetMapping("/generic-one-to-manies")
    public List<GenericOneToMany> getAllGenericOneToManies() {
        log.debug("REST request to get all GenericOneToManies");
        return genericOneToManyRepository.findAll();
    }

    /**
     * {@code GET  /generic-one-to-manies/:id} : get the "id" genericOneToMany.
     *
     * @param id the id of the genericOneToMany to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the genericOneToMany, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/generic-one-to-manies/{id}")
    public ResponseEntity<GenericOneToMany> getGenericOneToMany(@PathVariable Long id) {
        log.debug("REST request to get GenericOneToMany : {}", id);
        Optional<GenericOneToMany> genericOneToMany = genericOneToManyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(genericOneToMany);
    }

    /**
     * {@code DELETE  /generic-one-to-manies/:id} : delete the "id" genericOneToMany.
     *
     * @param id the id of the genericOneToMany to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/generic-one-to-manies/{id}")
    public ResponseEntity<Void> deleteGenericOneToMany(@PathVariable Long id) {
        log.debug("REST request to delete GenericOneToMany : {}", id);
        genericOneToManyRepository.deleteById(id);
        genericOneToManySearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/generic-one-to-manies?query=:query} : search for the genericOneToMany corresponding
     * to the query.
     *
     * @param query the query of the genericOneToMany search.
     * @return the result of the search.
     */
    @GetMapping("/_search/generic-one-to-manies")
    public List<GenericOneToMany> searchGenericOneToManies(@RequestParam String query) {
        log.debug("REST request to search GenericOneToManies for query {}", query);
        return StreamSupport
            .stream(genericOneToManySearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
