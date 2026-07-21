package com.dekon.backend_day_05.service;

import com.dekon.backend_day_05.dto.auth.AuthResponse;
import com.dekon.backend_day_05.dto.auth.LoginRequest;
import com.dekon.backend_day_05.dto.auth.RegisterRequest;
import com.dekon.backend_day_05.dto.user.UserResponse;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface AuthService {
    UserResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refresh(String refreshToken);

    void logout(String refreshToken);

    AuthResponse loginWithOAuth2(OAuth2User oauth2User);
}
