package com.jhipster.generic.repository.search;

import com.jhipster.generic.domain.GenericManyToMany;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link GenericManyToMany} entity.
 */
public interface GenericManyToManySearchRepository extends ElasticsearchRepository<GenericManyToMany, Long> {
}
