package com.dekon.backend_day_05.dto.image;

public record ImageResponse(
        String publicId,
        String url,
        String format,
        long bytes,
        int width,
        int height
) {
}
