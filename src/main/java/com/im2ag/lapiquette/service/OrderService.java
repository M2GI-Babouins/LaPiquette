package com.im2ag.lapiquette.service;

import com.im2ag.lapiquette.domain.Order;
import com.im2ag.lapiquette.domain.OrderLine;
import com.im2ag.lapiquette.domain.Product;
import com.im2ag.lapiquette.repository.OrderRepository;
import com.im2ag.lapiquette.repository.ProductRepository;
import java.time.LocalDate;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import javax.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Order}.
 */
@Service
@Transactional
public class OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    /**
     * Save a order.
     *
     * @param order the entity to save.
     * @return the persisted entity.
     */
    public Order save(Order order) {
        log.debug("Request to save Order : {}", order);
        return orderRepository.save(order);
    }

    /**
     * Partially update a order.
     *
     * @param order the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Order> partialUpdate(Order order) {
        log.debug("Request to partially update Order : {}", order);

        return orderRepository
            .findById(order.getId())
            .map(
                existingOrder -> {
                    if (order.getTotalPrice() != null) {
                        existingOrder.setTotalPrice(order.getTotalPrice());
                    }
                    if (order.getDatePurchase() != null) {
                        existingOrder.setDatePurchase(order.getDatePurchase());
                    }
                    if (order.getBasket() != null) {
                        existingOrder.setBasket(order.getBasket());
                    }

                    return existingOrder;
                }
            )
            .map(orderRepository::save);
    }

    /**
     * Get all the orders.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Order> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        return orderRepository.findAll(pageable);
    }

    /**
     * Get one order by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Order> findOne(Long id) {
        log.debug("Request to get Order : {}", id);
        return orderRepository.findById(id);
    }

    /**
     * Delete the order by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Order : {}", id);
        orderRepository.deleteById(id);
    }

    @Transactional(readOnly = false, rollbackFor = ProductNotAvailable.class)
    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    public Optional<Order> buyAnOrder(Order order) {
        Product product;
        int old_qt, want_qt;
        float tot_price = 0f;

        for (OrderLine ol : order.getOrderLines()) {
            product = ol.getProduct();
            want_qt = ol.getQuantity();
            old_qt = product.getStock();
            if (want_qt > old_qt) {
                throw new ProductNotAvailable("Invalid order : too much quantity");
            }
            product.setStock(old_qt - want_qt);
            tot_price = tot_price + (want_qt * ol.getUnityPrice());
            productRepository.save(product);
        }

        order.setBasket(false);
        order.setTotalPrice(tot_price);
        order.setDatePurchase(LocalDate.now());
        return Optional.ofNullable(orderRepository.save(order));
    }

    @Transactional(readOnly = false)
    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    public Optional<Order> checkAnOrder(Order order) {
        Product product;
        Optional<Float> current_price;

        for (OrderLine ol : order.getOrderLines()) {
            product = ol.getProduct();
            current_price = productRepository.getUnitPrice(product.getId());
            if (current_price.isEmpty()) throw new IdNotFoundException("This product not exists currently id=", product.getId());
            ol.setUnityPrice(current_price.get());
        }
        return Optional.ofNullable(orderRepository.save(order));
    }
}
