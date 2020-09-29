package com.jhipster.generic.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.jhipster.generic.web.rest.TestUtil;

public class GenericHistoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GenericHistory.class);
        GenericHistory genericHistory1 = new GenericHistory();
        genericHistory1.setId(1L);
        GenericHistory genericHistory2 = new GenericHistory();
        genericHistory2.setId(genericHistory1.getId());
        assertThat(genericHistory1).isEqualTo(genericHistory2);
        genericHistory2.setId(2L);
        assertThat(genericHistory1).isNotEqualTo(genericHistory2);
        genericHistory1.setId(null);
        assertThat(genericHistory1).isNotEqualTo(genericHistory2);
    }
}
