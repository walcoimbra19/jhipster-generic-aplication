package com.jhipster.generic.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.generic.web.rest.TestUtil;

public class GenericTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Generic.class);
        Generic generic1 = new Generic();
        generic1.setId(1L);
        Generic generic2 = new Generic();
        generic2.setId(generic1.getId());
        assertThat(generic1).isEqualTo(generic2);
        generic2.setId(2L);
        assertThat(generic1).isNotEqualTo(generic2);
        generic1.setId(null);
        assertThat(generic1).isNotEqualTo(generic2);
    }
}
