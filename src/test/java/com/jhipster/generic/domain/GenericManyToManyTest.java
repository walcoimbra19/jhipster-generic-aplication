package com.jhipster.generic.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.generic.web.rest.TestUtil;

public class GenericManyToManyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GenericManyToMany.class);
        GenericManyToMany genericManyToMany1 = new GenericManyToMany();
        genericManyToMany1.setId(1L);
        GenericManyToMany genericManyToMany2 = new GenericManyToMany();
        genericManyToMany2.setId(genericManyToMany1.getId());
        assertThat(genericManyToMany1).isEqualTo(genericManyToMany2);
        genericManyToMany2.setId(2L);
        assertThat(genericManyToMany1).isNotEqualTo(genericManyToMany2);
        genericManyToMany1.setId(null);
        assertThat(genericManyToMany1).isNotEqualTo(genericManyToMany2);
    }
}
