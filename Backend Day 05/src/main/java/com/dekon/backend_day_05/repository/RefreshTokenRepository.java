package com.dekon.backend_day_05.repository;

import com.dekon.backend_day_05.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);

    void deleteAllByUserId(String userId);
}
