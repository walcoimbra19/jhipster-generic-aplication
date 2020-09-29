package com.jhipster.generic.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link GenericOneToManySearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class GenericOneToManySearchRepositoryMockConfiguration {

    @MockBean
    private GenericOneToManySearchRepository mockGenericOneToManySearchRepository;

}
