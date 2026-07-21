package com.dekon.backend_day_05.controller;

import com.dekon.backend_day_05.dto.auth.AuthResponse;
import com.dekon.backend_day_05.dto.auth.LoginRequest;
import com.dekon.backend_day_05.dto.auth.LogoutRequest;
import com.dekon.backend_day_05.dto.auth.RefreshTokenRequest;
import com.dekon.backend_day_05.dto.auth.RegisterRequest;
import com.dekon.backend_day_05.dto.response.ApiResponse;
import com.dekon.backend_day_05.dto.user.UserResponse;
import com.dekon.backend_day_05.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.success("Registration successful", authService.register(request));
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.success("Login successful", authService.login(request));
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        return ApiResponse.success("Token refreshed successfully", authService.refresh(request.refreshToken()));
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@Valid @RequestBody LogoutRequest request) {
        authService.logout(request.refreshToken());
        return ApiResponse.success("Logout successful", null);
    }
}
