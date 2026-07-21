package com.dekon.backend_day_05.repository;

import com.dekon.backend_day_05.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, String> {
    List<Todo> findAllByUserIdOrderByCreatedAtDesc(String userId);

    Optional<Todo> findByIdAndUserId(String id, String userId);
}
