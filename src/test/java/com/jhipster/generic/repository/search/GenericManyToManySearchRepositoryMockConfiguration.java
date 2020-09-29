package com.jhipster.generic.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link GenericManyToManySearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class GenericManyToManySearchRepositoryMockConfiguration {

    @MockBean
    private GenericManyToManySearchRepository mockGenericManyToManySearchRepository;

}
