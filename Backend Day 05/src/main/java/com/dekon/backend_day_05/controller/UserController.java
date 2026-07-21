package com.dekon.backend_day_05.controller;

import com.dekon.backend_day_05.dto.response.ApiResponse;
import com.dekon.backend_day_05.dto.user.UpdateProfileRequest;
import com.dekon.backend_day_05.dto.user.UserResponse;
import com.dekon.backend_day_05.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/me")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping
    public ApiResponse<UserResponse> updateProfile(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        return ApiResponse.success(
                "Profile updated successfully",
                userService.updateProfile(jwt.getSubject(), request)
        );
    }
}
