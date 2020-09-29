package com.jhipster.generic.repository;

import com.jhipster.generic.domain.GenericManyToOne;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GenericManyToOne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GenericManyToOneRepository extends JpaRepository<GenericManyToOne, Long> {
}
