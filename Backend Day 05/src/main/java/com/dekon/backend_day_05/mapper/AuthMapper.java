package com.dekon.backend_day_05.mapper;

import com.dekon.backend_day_05.dto.auth.AuthResponse;
import com.dekon.backend_day_05.entity.RefreshToken;
import com.dekon.backend_day_05.entity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.time.Instant;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "token", source = "tokenValue")
    @Mapping(target = "expiresAt", source = "expiresAt")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "revoked", constant = "false")
    @Mapping(target = "createdAt", ignore = true)
    RefreshToken toRefreshToken(String tokenValue, Instant expiresAt, Users user);

    @Mapping(target = "accessToken", source = "accessToken")
    @Mapping(target = "refreshToken", source = "refreshToken.token")
    @Mapping(target = "tokenType", constant = "Bearer")
    @Mapping(target = "expiresIn", source = "expiresIn")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "displayName", source = "user.displayName")
    @Mapping(target = "avatarUrl", source = "user.avatarUrl")
    @Mapping(target = "avatarPublicId", source = "user.avatarPublicId")
    @Mapping(target = "roleTitle", source = "user.roleTitle")
    @Mapping(target = "bio", source = "user.bio")
    AuthResponse toAuthResponse(
            String accessToken,
            RefreshToken refreshToken,
            long expiresIn,
            Users user
    );
}
