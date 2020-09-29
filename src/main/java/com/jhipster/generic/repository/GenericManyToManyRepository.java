package com.jhipster.generic.repository;

import com.jhipster.generic.domain.GenericManyToMany;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GenericManyToMany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GenericManyToManyRepository extends JpaRepository<GenericManyToMany, Long> {
}
