package com.jhipster.generic.repository.search;

import com.jhipster.generic.domain.GenericOneToMany;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link GenericOneToMany} entity.
 */
public interface GenericOneToManySearchRepository extends ElasticsearchRepository<GenericOneToMany, Long> {
}
