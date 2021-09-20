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
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
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

    private Order order, order2;

    @BeforeEach
    public void init() {
        product1 = new Product();
        product1.setName(NAME_1);
        product1.setPrice(PRICE_1);
        product1.setPercentPromo(PROMO_1);
        product1.setStock(STOCK_1);

        product2 = new Product();
        product2.setName(NAME_2);
        product2.setPrice(PRICE_2);
        product2.setPercentPromo(PROMO_2);
        product2.setStock(STOCK_2);

        Set<OrderLine> orderLines = new HashSet<OrderLine>();

        OrderLine ol_new = new OrderLine();
        ol_new.setProduct(product1);
        ol_new.setQuantity(QTE_1);
        ol_new.setUnityPrice(PRICE_2);

        OrderLine ol_new_2 = new OrderLine();
        ol_new_2.setProduct(product2);
        ol_new_2.setQuantity(QTE_2);
        ol_new_2.setUnityPrice(0f);

        orderLines.add(ol_new);
        orderLines.add(ol_new_2);

        order = new Order();
        order.setBasket(BASKET);
        order.setTotalPrice(TOT_PRICE);
        order.setDatePurchase(LOCAL_DATE);
        order.setOrderLines(orderLines);

        order2 =
            new Order()
                .basket(BASKET)
                .datePurchase(LOCAL_DATE)
                .addOrderLine(new OrderLine().product(product2).quantity(QTE_1).unityPrice(PRICE_2));

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
    public void testCompleteSave() {
        Order bd_order = orderService.completeSave(order);

        assertThat(bd_order.getId()).isEqualTo(order.getId());
        assertThat(bd_order.getOrderLines().size()).isEqualTo(order.getOrderLines().size());

        for (OrderLine ol : bd_order.getOrderLines()) {
            assertThat(ol).isNotNull();
            assertThat(ol.getQuantity()).isNotNull();
            assertThat(ol.getUnityPrice()).isNotNull();
        }
    }

    @Test
    public void testFindById() {
        Order o = orderService.completeSave(order);

        Optional<Order> op_order = orderRepository.findById(o.getId());

        assertThat(op_order.isPresent()).isTrue();
        Order bd_order = op_order.get();

        assertThat(bd_order.getId()).isEqualTo(order.getId());
        assertThat(bd_order.getOrderLines().size()).isEqualTo(order.getOrderLines().size());

        for (OrderLine ol : bd_order.getOrderLines()) {
            assertThat(ol).isNotNull();
            assertThat(ol.getQuantity()).isNotNull();
            assertThat(ol.getUnityPrice()).isNotNull();
        }
    }

    // @Test
    @Transactional
    public void checkAnOrder() {
        Order bd_order = orderService.completeSave(order);

        for (OrderLine ol : order.getOrderLines()) {
            assertThat(ol).isNotNull();
            assertThat(ol.getProduct()).isNotNull();
        }

        for (OrderLine ol : bd_order.getOrderLines()) {
            assertThat(ol).isNotNull();
            assertThat(ol.getProduct()).isNotNull();
        }

        List<Product> productlist = productService.findAll(PageRequest.of(0, 2)).getContent();
        assertThat(productlist.isEmpty()).isFalse();

        product1 = productlist.get(0);
        product1.setPrice(20f);
        productService.save(product1);

        float total_price = 0f;

        for (OrderLine ol : bd_order.getOrderLines()) {
            Optional<Float> res = productService.getUnitPrice(ol.getProduct().getId());
            assertThat(res.isPresent()).isTrue();
            total_price += ol.getQuantity() * res.get();
        }

        assertThat(total_price).isNotEqualTo(0f);

        Long id = bd_order.getId();

        Optional<Order> res_order = orderService.checkAnOrder(bd_order);

        res_order = orderRepository.findById(id);
        assertThat(res_order).isNotNull();

        // res_order = orderService.findOne(id);
        // assertThat(res_order).isNotNull();
        assertThat(res_order.get().getOrderLines().size()).isEqualTo(2);

        productlist = productService.findAll(PageRequest.of(0, 2)).getContent();

        Long p;
        int i = 0;

        for (OrderLine ol : res_order.get().getOrderLines()) {
            assertThat(ol).isNotNull();

            p = productlist.get(i).getId();
            assertThat(ol.getUnityPrice()).isEqualTo(productService.getUnitPrice(p));
            i++;
            //replace by getUnitPrice by ProductService
        }

        assertThat(res_order.get().getTotalPrice()).isEqualTo(total_price);
    }

    @Test
    @Transactional
    public void buyAnOrder() {
        product1 = productService.save(product1);
        product2 = productService.save(product2);
        Order bd_order = orderService.save(order);

        for (OrderLine ol : order.getOrderLines()) {
            assertThat(ol).isNotNull();
            assertThat(ol.getProduct()).isNotNull();
        }

        for (OrderLine ol : bd_order.getOrderLines()) {
            assertThat(ol).isNotNull();
            assertThat(ol.getProduct()).isNotNull();
        }

        Optional<Order> res_order = orderService.buyAnOrder(order);

        assertThat(res_order.isPresent()).isTrue();

        assertThat(res_order.get().getBasket()).isFalse();

        assertThat(res_order.get().getDatePurchase()).isToday();

        List<Product> productlist = productService.findAll(PageRequest.of(0, 2)).getContent();

        for (Product p : productlist) {
            assertThat(p).isNotNull();
            if (p.getStock() > 5) {
                assertThat(p.getStock()).isEqualTo(STOCK_1 - QTE_1);
            } else {
                assertThat(p.getStock()).isEqualTo(STOCK_2 - QTE_2);
            }
        }
    }

    @Test
    @Transactional
    public void buyAnOrder_concurrency() {
        order = orderService.completeSave(order);
        order2 = orderService.save(order2);

        final ExecutorService executor = Executors.newFixedThreadPool(2);

        Future<Optional<Order>> res_order = executor.submit(
            () -> {
                return orderService.buyAnOrder(order);
            }
        );
        Future<Optional<Order>> res_order2 = executor.submit(
            () -> {
                return orderService.buyAnOrder(order2);
            }
        );

        executor.shutdown();

        try {
            executor.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e1) {
            assertThat(false).isTrue();
        }

        //product minus order_1_qte
        Product product = null;
        List<Product> productlist = productService.findAll(PageRequest.of(0, 2)).getContent();
        for (Product p : productlist) {
            if (p.getName().equals(NAME_2)) {
                product = p;
            }
        }
        assertThat(product).isNotNull();
        assertThat(product.getStock()).isIn(STOCK_2 - QTE_1, STOCK_2 - QTE_2);

        int order_pass = 0;

        if (product.getStock() == STOCK_2 - QTE_1) {
            order_pass = 2;
        }

        if (product.getStock() == STOCK_2 - QTE_2) {
            order_pass = 1;
        }

        assertThat(order_pass).isIn(1, 2);

        Optional<Order> pass_o;
        Optional<Order> fail_o;

        if (order_pass == 1) {
            pass_o = orderService.findOne(order.getId());
            fail_o = orderService.findOne(order2.getId());
        } else {
            pass_o = orderService.findOne(order2.getId());
            fail_o = orderService.findOne(order.getId());
        }

        assertThat(pass_o.isPresent()).isTrue();
        assertThat(pass_o.get().getBasket()).isFalse();
        assertThat(pass_o.get().getDatePurchase()).isToday();

        assertThat(fail_o.isPresent()).isTrue();
        assertThat(fail_o.get().getBasket()).isTrue();
        assertThat(fail_o.get().getDatePurchase()).isEqualTo(LOCAL_DATE);

        try {
            Optional<Order> rs = res_order.get();
            if (order_pass == 1) assertThat(rs.isPresent()).isTrue();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            if (order_pass == 1) assertThat(false).isTrue();
            if (order_pass == 2) assertThat(e.getCause()).isInstanceOf(ProductNotAvailable.class);
        }

        try {
            Optional<Order> rs2 = res_order2.get();
            if (order_pass == 2) assertThat(rs2.isPresent()).isTrue();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            if (order_pass == 2) assertThat(false).isTrue();
            if (order_pass == 1) assertThat(e.getCause()).isInstanceOf(ProductNotAvailable.class);
        }
    }
}
