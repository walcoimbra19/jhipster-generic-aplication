package com.jhipster.generic.repository.search;

import com.jhipster.generic.domain.GenericHistory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link GenericHistory} entity.
 */
public interface GenericHistorySearchRepository extends ElasticsearchRepository<GenericHistory, Long> {
}
