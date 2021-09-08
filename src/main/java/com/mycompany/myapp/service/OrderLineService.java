package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.OrderLine;
import com.mycompany.myapp.repository.OrderLineRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link OrderLine}.
 */
@Service
@Transactional
public class OrderLineService {

    private final Logger log = LoggerFactory.getLogger(OrderLineService.class);

    private final OrderLineRepository orderLineRepository;

    public OrderLineService(OrderLineRepository orderLineRepository) {
        this.orderLineRepository = orderLineRepository;
    }

    /**
     * Save a orderLine.
     *
     * @param orderLine the entity to save.
     * @return the persisted entity.
     */
    public OrderLine save(OrderLine orderLine) {
        log.debug("Request to save OrderLine : {}", orderLine);
        return orderLineRepository.save(orderLine);
    }

    /**
     * Partially update a orderLine.
     *
     * @param orderLine the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<OrderLine> partialUpdate(OrderLine orderLine) {
        log.debug("Request to partially update OrderLine : {}", orderLine);

        return orderLineRepository
            .findById(orderLine.getId())
            .map(
                existingOrderLine -> {
                    if (orderLine.getQuantity() != null) {
                        existingOrderLine.setQuantity(orderLine.getQuantity());
                    }
                    if (orderLine.getUnityPrice() != null) {
                        existingOrderLine.setUnityPrice(orderLine.getUnityPrice());
                    }
                    if (orderLine.getTotalPrice() != null) {
                        existingOrderLine.setTotalPrice(orderLine.getTotalPrice());
                    }

                    return existingOrderLine;
                }
            )
            .map(orderLineRepository::save);
    }

    /**
     * Get all the orderLines.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<OrderLine> findAll(Pageable pageable) {
        log.debug("Request to get all OrderLines");
        return orderLineRepository.findAll(pageable);
    }

    /**
     * Get one orderLine by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<OrderLine> findOne(Long id) {
        log.debug("Request to get OrderLine : {}", id);
        return orderLineRepository.findById(id);
    }

    /**
     * Delete the orderLine by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete OrderLine : {}", id);
        orderLineRepository.deleteById(id);
    }
}
