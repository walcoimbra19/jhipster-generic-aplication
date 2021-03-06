package com.jhipster.generic.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link GenericManyToOneSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class GenericManyToOneSearchRepositoryMockConfiguration {

    @MockBean
    private GenericManyToOneSearchRepository mockGenericManyToOneSearchRepository;

}
