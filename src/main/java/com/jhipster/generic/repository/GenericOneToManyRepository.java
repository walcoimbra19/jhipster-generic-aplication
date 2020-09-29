package com.jhipster.generic.repository;

import com.jhipster.generic.domain.GenericOneToMany;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GenericOneToMany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GenericOneToManyRepository extends JpaRepository<GenericOneToMany, Long> {
}
