package com.dekon.backend_day_05.service.impl;

import com.dekon.backend_day_05.dto.auth.AuthResponse;
import com.dekon.backend_day_05.dto.auth.LoginRequest;
import com.dekon.backend_day_05.dto.auth.RegisterRequest;
import com.dekon.backend_day_05.dto.user.UserResponse;
import com.dekon.backend_day_05.entity.RefreshToken;
import com.dekon.backend_day_05.entity.Users;
import com.dekon.backend_day_05.exception.AppException;
import com.dekon.backend_day_05.exception.ErrorCode;
import com.dekon.backend_day_05.mapper.AuthMapper;
import com.dekon.backend_day_05.mapper.UserMapper;
import com.dekon.backend_day_05.repository.RefreshTokenRepository;
import com.dekon.backend_day_05.repository.UserRepository;
import com.dekon.backend_day_05.security.JwtService;
import com.dekon.backend_day_05.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final AuthMapper authMapper;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    @Override
    public UserResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        Users user = userMapper.toLocalUser(
                request,
                email,
                passwordEncoder.encode(request.password())
        );
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Users user = userRepository.findByEmailIgnoreCase(normalizeEmail(request.email()))
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_CREDENTIALS));

        if (!user.isEnabled()) {
            throw new AppException(ErrorCode.ACCOUNT_DISABLED);
        }
        if (user.getPassword() == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }
        return issueTokens(user);
    }

    @Override
    public AuthResponse refresh(String tokenValue) {
        RefreshToken token = refreshTokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_REFRESH_TOKEN));
        if (!token.isActive()) {
            throw new AppException(token.isExpired()
                    ? ErrorCode.REFRESH_TOKEN_EXPIRED
                    : ErrorCode.INVALID_REFRESH_TOKEN);
        }
        token.setRevoked(true);
        refreshTokenRepository.save(token);
        return issueTokens(token.getUser());
    }

    @Override
    public void logout(String tokenValue) {
        refreshTokenRepository.findByToken(tokenValue).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    @Override
    public AuthResponse loginWithOAuth2(OAuth2User oauth2User) {
        String email = normalizeEmail(oauth2User.getAttribute("email"));
        Users user = userRepository.findByEmailIgnoreCase(email).orElseGet(() -> {
            Users newUser = userMapper.toOAuth2User(
                    email,
                    oauth2User.getAttribute("name"),
                    oauth2User.getAttribute("picture")
            );
            return userRepository.save(newUser);
        });
        if (!user.isEnabled()) {
            throw new AppException(ErrorCode.ACCOUNT_DISABLED);
        }
        return issueTokens(user);
    }

    private AuthResponse issueTokens(Users user) {
        RefreshToken refreshToken = authMapper.toRefreshToken(
                generateRefreshToken(),
                Instant.now().plusSeconds(refreshTokenExpiration),
                user
        );
        refreshTokenRepository.save(refreshToken);

        return authMapper.toAuthResponse(
                jwtService.generateAccessToken(user),
                refreshToken,
                jwtService.getAccessTokenExpiration(),
                user
        );
    }

    private String generateRefreshToken() {
        byte[] bytes = new byte[64];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String normalizeEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new AppException(ErrorCode.INVALID_REQUEST);
        }
        return email.trim().toLowerCase();
    }
}
