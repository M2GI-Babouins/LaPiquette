package com.im2ag.lapiquette.repository;

import com.im2ag.lapiquette.domain.Product;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select (p.price*p.percentPromo) from #{#entityName} p where p.id=:id") // p.percentPromo
    public Optional<Float> getUnitPrice(@Param("id") Long id);
}
