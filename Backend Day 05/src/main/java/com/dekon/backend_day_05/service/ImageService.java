package com.dekon.backend_day_05.service;

import com.dekon.backend_day_05.dto.image.ImageResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    ImageResponse upload(String userId, MultipartFile file);

    void delete(String userId, String publicId);
}
