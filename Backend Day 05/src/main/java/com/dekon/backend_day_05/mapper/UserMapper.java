package com.dekon.backend_day_05.mapper;

import com.dekon.backend_day_05.dto.auth.RegisterRequest;
import com.dekon.backend_day_05.dto.user.UserResponse;
import com.dekon.backend_day_05.entity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "email", source = "email")
    @Mapping(target = "password", source = "encodedPassword")
    @Mapping(target = "displayName", source = "request.displayName", qualifiedByName = "trim")
    @Mapping(target = "provider", constant = "LOCAL")
    @Mapping(target = "enabled", constant = "true")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "todos", ignore = true)
    @Mapping(target = "refreshTokens", ignore = true)
    Users toLocalUser(RegisterRequest request, String email, String encodedPassword);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "email", source = "email")
    @Mapping(target = "displayName", source = "displayName")
    @Mapping(target = "avatarUrl", source = "avatarUrl")
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "provider", constant = "GOOGLE")
    @Mapping(target = "enabled", constant = "true")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "todos", ignore = true)
    @Mapping(target = "refreshTokens", ignore = true)
    Users toOAuth2User(String email, String displayName, String avatarUrl);

    UserResponse toResponse(Users user);

    @Named("trim")
    default String trim(String value) {
        return value == null ? null : value.trim();
    }
}
