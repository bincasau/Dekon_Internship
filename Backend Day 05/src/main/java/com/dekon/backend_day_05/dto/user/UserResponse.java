package com.dekon.backend_day_05.dto.user;

import com.dekon.backend_day_05.entity.AuthProvider;

import java.time.Instant;

public record UserResponse(
        String id,
        String email,
        String displayName,
        String avatarUrl,
        String avatarPublicId,
        String roleTitle,
        String bio,
        AuthProvider provider,
        boolean enabled,
        Instant createdAt
) {
}
