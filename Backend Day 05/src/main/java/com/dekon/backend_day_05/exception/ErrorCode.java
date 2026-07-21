package com.dekon.backend_day_05.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_REQUEST(1001, "Request is invalid", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1002, "User not found", HttpStatus.NOT_FOUND),
    TODO_NOT_FOUND(1003, "Todo not found", HttpStatus.NOT_FOUND),
    EMAIL_ALREADY_EXISTS(1004, "Email already exists", HttpStatus.CONFLICT),
    INVALID_CREDENTIALS(1005, "Email or password is incorrect", HttpStatus.UNAUTHORIZED),
    INVALID_REFRESH_TOKEN(1006, "Refresh token is invalid", HttpStatus.UNAUTHORIZED),
    REFRESH_TOKEN_EXPIRED(1007, "Refresh token has expired", HttpStatus.UNAUTHORIZED),
    ACCOUNT_DISABLED(1008, "User account is disabled", HttpStatus.FORBIDDEN),
    EMPTY_FILE(1009, "Image file is required", HttpStatus.BAD_REQUEST),
    INVALID_IMAGE_TYPE(1010, "Only JPEG, PNG, WEBP and GIF images are allowed", HttpStatus.BAD_REQUEST),
    IMAGE_UPLOAD_FAILED(1011, "Could not upload image", HttpStatus.INTERNAL_SERVER_ERROR),
    IMAGE_DELETE_FAILED(1012, "Could not delete image", HttpStatus.INTERNAL_SERVER_ERROR),
    IMAGE_ACCESS_DENIED(1013, "You cannot delete this image", HttpStatus.FORBIDDEN),
    FILE_TOO_LARGE(1014, "Image must not exceed 5 MB", HttpStatus.PAYLOAD_TOO_LARGE);

    private final int code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
