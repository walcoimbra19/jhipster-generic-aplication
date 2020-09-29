package com.jhipster.generic.repository.search;

import com.jhipster.generic.domain.GenericManyToOne;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link GenericManyToOne} entity.
 */
public interface GenericManyToOneSearchRepository extends ElasticsearchRepository<GenericManyToOne, Long> {
}
