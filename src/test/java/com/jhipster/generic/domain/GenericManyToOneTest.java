package com.jhipster.generic.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.generic.web.rest.TestUtil;

public class GenericManyToOneTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GenericManyToOne.class);
        GenericManyToOne genericManyToOne1 = new GenericManyToOne();
        genericManyToOne1.setId(1L);
        GenericManyToOne genericManyToOne2 = new GenericManyToOne();
        genericManyToOne2.setId(genericManyToOne1.getId());
        assertThat(genericManyToOne1).isEqualTo(genericManyToOne2);
        genericManyToOne2.setId(2L);
        assertThat(genericManyToOne1).isNotEqualTo(genericManyToOne2);
        genericManyToOne1.setId(null);
        assertThat(genericManyToOne1).isNotEqualTo(genericManyToOne2);
    }
}
