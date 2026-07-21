package com.dekon.backend_day_05.service.impl;

import com.dekon.backend_day_05.dto.user.UpdateProfileRequest;
import com.dekon.backend_day_05.dto.user.UserResponse;
import com.dekon.backend_day_05.entity.Users;
import com.dekon.backend_day_05.exception.AppException;
import com.dekon.backend_day_05.exception.ErrorCode;
import com.dekon.backend_day_05.mapper.UserMapper;
import com.dekon.backend_day_05.repository.UserRepository;
import com.dekon.backend_day_05.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public UserResponse updateProfile(String userId, UpdateProfileRequest request) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setDisplayName(request.displayName().trim());
        user.setRoleTitle(trimToNull(request.roleTitle()));
        user.setBio(trimToNull(request.bio()));
        return userMapper.toResponse(userRepository.save(user));
    }

    private String trimToNull(String value) {
        if (value == null || value.isBlank()) return null;
        return value.trim();
    }
}
