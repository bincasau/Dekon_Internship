package com.dekon.backend_day_05.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dekon.backend_day_05.dto.image.ImageResponse;
import com.dekon.backend_day_05.exception.AppException;
import com.dekon.backend_day_05.exception.ErrorCode;
import com.dekon.backend_day_05.entity.Users;
import com.dekon.backend_day_05.repository.UserRepository;
import com.dekon.backend_day_05.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CloudinaryImageService implements ImageService {

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/png", "image/webp", "image/gif"
    );

    private final Cloudinary cloudinary;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public ImageResponse upload(String userId, MultipartFile file) {
        validate(file);
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", userFolder(userId),
                            "resource_type", "image",
                            "use_filename", true,
                            "unique_filename", true,
                            "overwrite", false
                    )
            );
            ImageResponse image = new ImageResponse(
                    value(result, "public_id"),
                    value(result, "secure_url"),
                    value(result, "format"),
                    number(result, "bytes").longValue(),
                    number(result, "width").intValue(),
                    number(result, "height").intValue()
            );
            user.setAvatarUrl(image.url());
            user.setAvatarPublicId(image.publicId());
            userRepository.save(user);
            return image;
        } catch (IOException | RuntimeException exception) {
            throw new AppException(ErrorCode.IMAGE_UPLOAD_FAILED);
        }
    }

    @Override
    @Transactional
    public void delete(String userId, String publicId) {
        if (!publicId.startsWith(userFolder(userId) + "/")) {
            throw new AppException(ErrorCode.IMAGE_ACCESS_DENIED);
        }
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.asMap(
                    "resource_type", "image",
                    "invalidate", true
            ));
            userRepository.findById(userId).ifPresent(user -> {
                if (publicId.equals(user.getAvatarPublicId())) {
                    user.setAvatarUrl(null);
                    user.setAvatarPublicId(null);
                    userRepository.save(user);
                }
            });
        } catch (IOException | RuntimeException exception) {
            throw new AppException(ErrorCode.IMAGE_DELETE_FAILED);
        }
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new AppException(ErrorCode.EMPTY_FILE);
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new AppException(ErrorCode.INVALID_IMAGE_TYPE);
        }
    }

    private String userFolder(String userId) {
        return "backend-day-05/users/" + userId;
    }

    private String value(Map<?, ?> result, String key) {
        Object value = result.get(key);
        return value == null ? null : value.toString();
    }

    private Number number(Map<?, ?> result, String key) {
        Object value = result.get(key);
        return value instanceof Number number ? number : 0;
    }
}
