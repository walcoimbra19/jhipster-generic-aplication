package com.jhipster.generic.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link GenericSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class GenericSearchRepositoryMockConfiguration {

    @MockBean
    private GenericSearchRepository mockGenericSearchRepository;

}
