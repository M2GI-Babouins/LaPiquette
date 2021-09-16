package com.im2ag.lapiquette.repository;

import com.im2ag.lapiquette.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select price, percentPromo from Product where id = ?1")
    public float getUnitPrice(Long id);
}
