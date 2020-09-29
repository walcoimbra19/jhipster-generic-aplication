package com.jhipster.generic.repository.search;

import com.jhipster.generic.domain.Generic;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Generic} entity.
 */
public interface GenericSearchRepository extends ElasticsearchRepository<Generic, Long> {
}
