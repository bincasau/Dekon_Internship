package com.dekon.backend_day_05.dto.todo;

import com.dekon.backend_day_05.entity.Category;
import com.dekon.backend_day_05.entity.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record TodoRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 255, message = "Title must not exceed 255 characters")
        String title,

        String description,

        Priority priority,
        Category category,
        Instant dueAt
) {
}
