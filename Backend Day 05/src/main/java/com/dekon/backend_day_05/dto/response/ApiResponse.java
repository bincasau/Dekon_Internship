package com.dekon.backend_day_05.dto.response;

import java.time.Instant;

public record ApiResponse<T>(
        Instant timestamp,
        int code,
        String message,
        T result
) {
    private static final int SUCCESS_CODE = 1000;

    public static <T> ApiResponse<T> success(T result) {
        return success("Success", result);
    }

    public static <T> ApiResponse<T> success(String message, T result) {
        return new ApiResponse<>(Instant.now(), SUCCESS_CODE, message, result);
    }
}
