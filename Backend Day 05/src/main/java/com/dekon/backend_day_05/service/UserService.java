package com.dekon.backend_day_05.service;

import com.dekon.backend_day_05.dto.user.UpdateProfileRequest;
import com.dekon.backend_day_05.dto.user.UserResponse;

public interface UserService {
    UserResponse updateProfile(String userId, UpdateProfileRequest request);
}
