package com.dekon.backend_day_05.exception;

import java.time.Instant;
import java.util.Map;

public record ApiError(
        Instant timestamp,
        int code,
        int status,
        String error,
        String message,
        String path,
        Map<String, String> fieldErrors
) {
}
