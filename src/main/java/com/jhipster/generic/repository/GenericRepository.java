package com.jhipster.generic.repository;

import com.jhipster.generic.domain.Generic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Generic entity.
 */
@Repository
public interface GenericRepository extends JpaRepository<Generic, Long> {

    @Query(value = "select distinct generic from Generic generic left join fetch generic.genericManyToManies",
        countQuery = "select count(distinct generic) from Generic generic")
    Page<Generic> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct generic from Generic generic left join fetch generic.genericManyToManies")
    List<Generic> findAllWithEagerRelationships();

    @Query("select generic from Generic generic left join fetch generic.genericManyToManies where generic.id =:id")
    Optional<Generic> findOneWithEagerRelationships(@Param("id") Long id);
}
