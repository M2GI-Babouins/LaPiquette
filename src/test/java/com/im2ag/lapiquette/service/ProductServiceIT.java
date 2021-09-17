package com.im2ag.lapiquette.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import com.im2ag.lapiquette.IntegrationTest;
import com.im2ag.lapiquette.domain.Product;
import com.im2ag.lapiquette.repository.ProductRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.auditing.AuditingHandler;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for {@link ProductService}.
 */
@IntegrationTest
@Transactional
public class ProductServiceIT {

    private static final String NAME_1 = "vin 1";
    private static final float PRICE_1 = 5.9f;
    private static final float PROMO_1 = 1f;

    private static final String NAME_2 = "vin 2";
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
        product1.setPrice(PRICE_1);
        product1.setPercentPromo(PROMO_1);

        product2 = new Product();
        product2.setName(NAME_2);
        product2.setPrice(PRICE_2);
        product2.setPercentPromo(PROMO_2);

        when(dateTimeProvider.getNow()).thenReturn(Optional.of(LocalDateTime.now()));
        auditingHandler.setDateTimeProvider(dateTimeProvider);
    }

    @Test
    public void assertProduct() {
        assertThat(product1).isNotNull();
        assertThat(product2).isNotNull();
    }

    @Test
    @Transactional
    public void assertUnitPriceRep() {
        productRepository.saveAndFlush(product1);
        productRepository.saveAndFlush(product2);

        List<Product> listproduct = productRepository.findAll();

        assertThat(listproduct.isEmpty()).isFalse();

        Optional<Product> db_product;
        Optional<Float> result;

        for (Product p : listproduct) {
            // System.out.println("Product p + "+p.getId() + " - " + p.getName());
            db_product = productRepository.findById(p.getId());
            assertThat(db_product).isNotNull();
            assertThat(db_product.isPresent()).isTrue();
            result = productRepository.getUnitPrice(product1.getId());
            assertThat(result).isNotNull();
            assertThat(result).isIn(Optional.of(PRICE_1 * PROMO_1), Optional.of(PRICE_2 * PROMO_2));
        }

        productRepository.delete(product1);
        productRepository.delete(product2);
    }

    @Test
    @Transactional
    public void assertUnitPrice() {
        productRepository.saveAndFlush(product1);
        productRepository.saveAndFlush(product2);

        Page<Product> pageproduct = productService.findAll(PageRequest.of(0, 2));
        List<Product> listproduct = pageproduct.getContent();

        assertThat(listproduct.isEmpty()).isFalse();

        Optional<Float> result;

        for (Product p : listproduct) {
            result = productService.getUnitPrice(p.getId());
            assertThat(result).isNotNull();
            assertThat(result.isPresent()).isTrue();
            assertThat(result.get()).isIn(PRICE_1 * PROMO_1, PRICE_2 * PROMO_2);
        }

        productRepository.delete(product1);
        productRepository.delete(product2);
    }
}
