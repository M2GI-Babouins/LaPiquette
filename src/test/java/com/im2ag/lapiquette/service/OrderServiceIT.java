package com.im2ag.lapiquette.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import com.im2ag.lapiquette.IntegrationTest;
import com.im2ag.lapiquette.domain.Order;
import com.im2ag.lapiquette.domain.OrderLine;
import com.im2ag.lapiquette.domain.Product;
import com.im2ag.lapiquette.repository.OrderRepository;
import com.im2ag.lapiquette.repository.ProductRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.auditing.AuditingHandler;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for {@link OrderService}.
 */
@IntegrationTest
@Transactional
public class OrderServiceIT {

    private static final String NAME_1 = "vin 1";
    private static final float PRICE_1 = 5.9f;
    private static final float PROMO_1 = 1f;

    private static final String NAME_2 = "vin 2";
    private static final float PRICE_2 = 10.9f;
    private static final float PROMO_2 = 0.8f;

    private static final boolean BASKET = true;
    private static final float TOT_PRICE = 15f;
    private static final LocalDate LOCAL_DATE = LocalDate.of(2021, 9, 2);

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private AuditingHandler auditingHandler;

    @MockBean
    private DateTimeProvider dateTimeProvider;

    private Product product1, product2;

    private Order order;

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

        Set<OrderLine> orderLines = new TreeSet<OrderLine>();

        order = new Order();
        order.setBasket(BASKET);
        order.setTotalPrice(TOT_PRICE);
        order.setDatePurchase(LOCAL_DATE);
        order.setOrderLines(orderLines);

        when(dateTimeProvider.getNow()).thenReturn(Optional.of(LocalDateTime.now()));
        auditingHandler.setDateTimeProvider(dateTimeProvider);
    }

    @Test
    public void assertProduct() {
        assertThat(product1).isNotNull();
        assertThat(product2).isNotNull();
        assertThat(order).isNotNull();
    }

    @Test
    @Transactional
    public void checkAnOrder() {
        productService.save(product1);
        productService.save(product2);
        orderService.save(order);

        List<Product> productlist = productService.findAll(PageRequest.of(0, 2)).getContent();
        List<Order> orderlist = orderService.findAll(PageRequest.of(0, 1)).getContent();

        assertThat(productlist.isEmpty()).isFalse();
        assertThat(orderlist.isEmpty()).isFalse();

        // Long id_first = orderlist.get(0).getId();

        product1 = productlist.get(0);
        product1.setPrice(20f);
        productService.save(product1);

        Optional<Order> res_order = orderService.checkAnOrder(order);

        assertThat(res_order.isPresent()).isTrue();
    }
}
