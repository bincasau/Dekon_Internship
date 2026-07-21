package com.dekon.backend_day_05.dto.auth;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long expiresIn,
        String userId,
        String email,
        String displayName,
        String avatarUrl,
        String avatarPublicId,
        String roleTitle,
        String bio
) {
}
