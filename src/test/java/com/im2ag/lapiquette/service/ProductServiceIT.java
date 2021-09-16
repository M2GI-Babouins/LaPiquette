package com.im2ag.lapiquette.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

import com.im2ag.lapiquette.IntegrationTest;
import com.im2ag.lapiquette.domain.Product;
import com.im2ag.lapiquette.repository.ProductRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.auditing.AuditingHandler;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for {@link ProductService}.
 */
@IntegrationTest
@Transactional
public class ProductServiceIT {

    private static final String NAME_1 = "vin 1";
    private static final Long ID_1 = 30L;
    private static final float PRICE_1 = 5.9f;
    private static final float PROMO_1 = 1f;

    private static final String NAME_2 = "vin 2";
    private static final Long ID_2 = 31L;
    private static final float PRICE_2 = 10.9f;
    private static final float PROMO_2 = 0.8f;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private AuditingHandler auditingHandler;

    @MockBean
    private DateTimeProvider dateTimeProvider;

    private Product product1, product2;

    @BeforeEach
    public void init() {
        product1 = new Product();
        product1.setName(NAME_1);
        product1.setId(ID_1);
        product1.setPrice(PRICE_1);
        product1.setPercentPromo(PROMO_1);

        product2 = new Product();
        product2.setName(NAME_2);
        product2.setId(ID_2);
        product2.setPrice(PRICE_2);
        product2.setPercentPromo(PROMO_2);

        System.out.println("before");

        when(dateTimeProvider.getNow()).thenReturn(Optional.of(LocalDateTime.now()));
        auditingHandler.setDateTimeProvider(dateTimeProvider);
    }

    @Test
    public void assertProduct() {
        Long id1 = product1.getId();
        Long id2 = product1.getId();

        System.out.println("testing");

        assertNull(product1);
        assertNull(id1);
        assertNotNull(id1);
        // assertNotNull(id2);

    }

    @Test
    @Transactional
    public void assertUnitPriceRep() {
        productRepository.saveAndFlush(product1);
        productRepository.saveAndFlush(product2);

        float result = productRepository.getUnitPrice(product1.getId());
        float result2 = productRepository.getUnitPrice(product2.getId());

        assertEquals(result, PRICE_1 * PROMO_1);
        assertEquals(result2, PRICE_2 * PROMO_2);

        productRepository.delete(product1);
        productRepository.delete(product2);
    }

    @Test
    @Transactional
    public void assertUnitPrice() {
        productRepository.saveAndFlush(product1);
        productRepository.saveAndFlush(product2);

        float result = productService.getUnitPrice(product1.getId());
        float result2 = productService.getUnitPrice(product2.getId());

        assertEquals(result, PRICE_1 * PROMO_1);
        assertEquals(result2, PRICE_2 * PROMO_2);

        productRepository.delete(product1);
        productRepository.delete(product2);
    }
}
