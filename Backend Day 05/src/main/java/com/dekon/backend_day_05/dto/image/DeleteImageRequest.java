package com.dekon.backend_day_05.dto.image;

import jakarta.validation.constraints.NotBlank;

public record DeleteImageRequest(@NotBlank String publicId) {
}
