package com.dekon.backend_day_05.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
        @NotBlank @Size(max = 100) String displayName,
        @Size(max = 100) String roleTitle,
        @Size(max = 500) String bio
) {
}
