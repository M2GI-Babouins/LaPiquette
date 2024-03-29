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
    Optional<Float> getUnitPrice(@Param("id") Long id);

    @Query(
        "select p from #{#entityName} p where" +
        " (:type is null or p.type=:type) and " +
        " (:year is null or p.year <= :year) and " +
        " (:price is null or p.price <= :price) and " +
        " (:region is null or p.region=:region) and " +
        " (:reco is null or p.recommandation like %:reco%) and " +
        " (:search is null or lower(p.name) like lower(concat('%',:search,'%'))) "
    )
    Page<Product> findSome(
        Pageable pageable,
        @Param("type") String type,
        @Param("year") Integer year,
        @Param("price") Float price,
        @Param("region") String region,
        @Param("reco") String reco,
        @Param("search") String search
    );
}
