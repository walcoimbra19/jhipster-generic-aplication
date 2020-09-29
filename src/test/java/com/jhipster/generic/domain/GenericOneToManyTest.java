package com.jhipster.generic.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.generic.web.rest.TestUtil;

public class GenericOneToManyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GenericOneToMany.class);
        GenericOneToMany genericOneToMany1 = new GenericOneToMany();
        genericOneToMany1.setId(1L);
        GenericOneToMany genericOneToMany2 = new GenericOneToMany();
        genericOneToMany2.setId(genericOneToMany1.getId());
        assertThat(genericOneToMany1).isEqualTo(genericOneToMany2);
        genericOneToMany2.setId(2L);
        assertThat(genericOneToMany1).isNotEqualTo(genericOneToMany2);
        genericOneToMany1.setId(null);
        assertThat(genericOneToMany1).isNotEqualTo(genericOneToMany2);
    }
}
