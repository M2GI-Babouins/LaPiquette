package com.im2ag.lapiquette.service;

import com.im2ag.lapiquette.domain.Product;
import com.im2ag.lapiquette.repository.ProductRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Product}.
 */
@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Save a product.
     *
     * @param product the entity to save.
     * @return the persisted entity.
     */
    public Product save(Product product) {
        log.debug("Request to save Product : {}", product);
        return productRepository.save(product);
    }

    /**
     * Partially update a product.
     *
     * @param product the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Product> partialUpdate(Product product) {
        log.debug("Request to partially update Product : {}", product);

        return productRepository
            .findById(product.getId())
            .map(
                existingProduct -> {
                    if (product.getName() != null) {
                        existingProduct.setName(product.getName());
                    }
                    if (product.getYear() != null) {
                        existingProduct.setYear(product.getYear());
                    }
                    if (product.getRegion() != null) {
                        existingProduct.setRegion(product.getRegion());
                    }
                    if (product.getType() != null) {
                        existingProduct.setType(product.getType());
                    }
                    if (product.getPrice() != null) {
                        existingProduct.setPrice(product.getPrice());
                    }
                    if (product.getDescription() != null) {
                        existingProduct.setDescription(product.getDescription());
                    }
                    if (product.getAlcoholPer() != null) {
                        existingProduct.setAlcoholPer(product.getAlcoholPer());
                    }
                    if (product.getRecommandation() != null) {
                        existingProduct.setRecommandation(product.getRecommandation());
                    }
                    if (product.getAgeLimit() != null) {
                        existingProduct.setAgeLimit(product.getAgeLimit());
                    }
                    if (product.getTemperature() != null) {
                        existingProduct.setTemperature(product.getTemperature());
                    }
                    if (product.getPercentPromo() != null) {
                        existingProduct.setPercentPromo(product.getPercentPromo());
                    }
                    if (product.getStock() != null) {
                        existingProduct.setStock(product.getStock());
                    }
                    if (product.getImage() != null) {
                        existingProduct.setImage(product.getImage());
                    }
                    if (product.getImageContentType() != null) {
                        existingProduct.setImageContentType(product.getImageContentType());
                    }

                    return existingProduct;
                }
            )
            .map(productRepository::save);
    }

    /**
     * Get all the products.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Product> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAll(pageable);
    }

    /**
     *  Get all the products where OrderLine is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Product> findAllWhereOrderLineIsNull() {
        log.debug("Request to get all products where OrderLine is null");
        return StreamSupport
            .stream(productRepository.findAll().spliterator(), false)
            .filter(product -> product.getOrderLine() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one product by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Product> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findById(id);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Float> getUnitPrice(Long id) {
        log.debug("Request to get last price of Product : {}", id);
        Optional<Product> pres = productRepository.findById(id);
        Optional<Float> res = Optional.ofNullable(null);
        if (pres.isPresent()) {
            Product product = pres.get();
            float result = product.getPercentPromo() * product.getPrice();
            res = Optional.of(result);
        }
        return res;
    }
}
