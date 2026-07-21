package com.dekon.backend_day_05.controller;

import com.dekon.backend_day_05.dto.image.DeleteImageRequest;
import com.dekon.backend_day_05.dto.image.ImageResponse;
import com.dekon.backend_day_05.dto.response.ApiResponse;
import com.dekon.backend_day_05.service.ImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public ApiResponse<ImageResponse> upload(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam("file") MultipartFile file
    ) {
        return ApiResponse.success(
                "Image uploaded successfully",
                imageService.upload(jwt.getSubject(), file)
        );
    }

    @DeleteMapping
    public ApiResponse<Void> delete(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody DeleteImageRequest request
    ) {
        imageService.delete(jwt.getSubject(), request.publicId());
        return ApiResponse.success("Image deleted successfully", null);
    }
}
