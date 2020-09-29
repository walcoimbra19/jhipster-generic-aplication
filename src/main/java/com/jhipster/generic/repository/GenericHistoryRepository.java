package com.jhipster.generic.repository;

import com.jhipster.generic.domain.GenericHistory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GenericHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GenericHistoryRepository extends JpaRepository<GenericHistory, Long> {
}
