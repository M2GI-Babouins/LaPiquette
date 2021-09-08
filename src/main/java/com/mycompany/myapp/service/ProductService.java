package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.repository.ProductRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
                    if (product.getUrlImage() != null) {
                        existingProduct.setUrlImage(product.getUrlImage());
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
}
