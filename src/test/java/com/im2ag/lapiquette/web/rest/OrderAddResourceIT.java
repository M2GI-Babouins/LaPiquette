package com.im2ag.lapiquette.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.im2ag.lapiquette.IntegrationTest;
import com.im2ag.lapiquette.domain.Order;
import com.im2ag.lapiquette.domain.OrderLine;
import com.im2ag.lapiquette.domain.Product;
import com.im2ag.lapiquette.repository.OrderRepository;
import com.im2ag.lapiquette.repository.ProductRepository;
import com.im2ag.lapiquette.service.OrderService;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link OrderResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
public class OrderAddResourceIT {

    private static final String NAME_1 = "vin 1";
    private static final float PRICE_1 = 5.9f;
    private static final float PROMO_1 = 1f;
    private static final int QTE_1 = 2;
    private static final int STOCK_1 = 10;

    private static final String NAME_2 = "vin 2";
    private static final float PRICE_2 = 10.9f;
    private static final float PROMO_2 = 0.5f;
    private static final int QTE_2 = 3;
    private static final int STOCK_2 = 4;

    private static final boolean BASKET = true;
    private static final float TOT_PRICE = 15f;
    private static final LocalDate LOCAL_DATE = LocalDate.of(2021, 9, 2);

    private static final String ENTITY_API_URL = "/api/orders";
    // private static final String ENTITY_API_URL_CK = ENTITY_API_URL + "/{id}/check";
    private static final String ENTITY_API_URL_BL = ENTITY_API_URL + "/{id}/bill";

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrderMockMvc;

    private Order order;

    public static Order createEntity() {
        Set<OrderLine> orderLines = new HashSet<OrderLine>();

        Product product1 = new Product().name(NAME_1).price(PRICE_1).percentPromo(PROMO_1).stock(STOCK_1);
        Product product2 = new Product().name(NAME_2).price(PRICE_2).percentPromo(PROMO_2).stock(STOCK_2);

        orderLines.add(new OrderLine().product(product1).quantity(QTE_1).unityPrice(PRICE_2));
        orderLines.add(new OrderLine().product(product2).quantity(QTE_2).unityPrice(PRICE_1));

        return new Order().totalPrice(TOT_PRICE).datePurchase(LOCAL_DATE).basket(BASKET).orderLines(orderLines);
    }

    @BeforeEach
    public void initTest() {
        order = createEntity();
    }

    @Test
    public void testInit() {
        orderService.completeSave(order);

        List<Product> products = productRepository.findAll(PageRequest.of(0, 2)).getContent();
        assertThat(products).isNotNull();
        assertThat(products.size()).isEqualTo(2);
        for (Product p : products) {
            assertThat(p).isNotNull();
        }
    }

    @Test
    public void testOrder() {
        assertThat(order).isNotNull();
        assertThat(order.getOrderLines()).isNotNull();
        assertThat(order.getOrderLines().size()).isEqualTo(2);
        for (OrderLine ol : order.getOrderLines()) {
            assertThat(ol).isNotNull();
            assertThat(ol.getProduct()).isNotNull();
        }
    }

    @Test
    @Transactional
    public void buyAnOrder() throws Exception {
        orderService.completeSave(order);

        int databaseSizeBeforeUpdate = orderRepository.findAll().size();

        float tot_price = 0f;
        Map<Long, Integer> map_pqt = new TreeMap<Long, Integer>();
        for (OrderLine ol : order.getOrderLines()) {
            tot_price += ol.getQuantity() * ol.getUnityPrice();
            map_pqt.put(ol.getProduct().getId(), ol.getProduct().getStock() - ol.getQuantity());
        }

        restOrderMockMvc
            .perform(
                patch(ENTITY_API_URL_BL, order.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(order))
            )
            .andExpect(status().isOk());

        List<Order> orderList = orderRepository.findAll();
        assertThat(orderList).hasSize(databaseSizeBeforeUpdate);

        Order testOrder = orderList.get(orderList.size() - 1);
        assertThat(testOrder.getTotalPrice()).isEqualTo(tot_price);
        assertThat(testOrder.getDatePurchase()).isToday();
        assertThat(testOrder.getBasket()).isFalse();

        // stock des deux produits qui ont baisser
        List<Product> products = productRepository.findAll(PageRequest.of(0, 2)).getContent();
        for (Product p : products) {
            assertThat(p.getStock()).isEqualTo(map_pqt.get(p.getId()));
        }
    }

    // @Test
    @Transactional
    void checkAnOrder() throws Exception {
        // Product p1 = new Product();
        // Product p2 = new Product();
        // p1.setName("vin 1");
        // p2.setName("vin 2");
        // p1.setPrice(3.5f);
        // p2.setPrice(7.3f);
        // p1.setPercentPromo(1f);
        // p2.setPercentPromo(0.5f);

        // Set<OrderLine> orderLines = new TreeSet<OrderLine>();

        // Order order = new Order();
        // order.setBasket(true);
        // order.setTotalPrice(15f);
        // order.setOrderLines(orderLines);

        // productRepository.saveAndFlush(p1);
        // productRepository.saveAndFlush(p2);
        // orderRepository.saveAndFlush(order);

        // List<Product> productlist = productRepository.findAll();
        // List<Order> orderlist = orderRepository.findAll();

        // Long id_first = orderlist.get(0).getId();

        // p1 = productlist.get(0);
        // p1.setPrice(20f);
        // productRepository.saveAndFlush(p1);

        // restOrderMockMvc.perform(patch(ENTITY_API_URL_ID + "/check", id_first)).andExpect(status().isOk());
        // .andExpect(content().contentType("application/merge-patch+json"))
        // .andExpect(jsonPath("$.totalPrice")..value(DEFAULT_TOTAL_PRICE.doubleValue()))
        // .andExpect(jsonPath("$.datePurchase").value(DEFAULT_DATE_PURCHASE.toString()))
        // .andExpect(jsonPath("$.basket").value(DEFAULT_BASKET.booleanValue()));

    }
}
