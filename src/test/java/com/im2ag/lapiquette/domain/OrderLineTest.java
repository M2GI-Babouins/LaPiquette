package com.im2ag.lapiquette.domain;

import com.im2ag.lapiquette.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OrderLineTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderLine.class);
    }
}
