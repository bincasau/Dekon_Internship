package com.dekon.backend_day_05.dto.todo;

import com.dekon.backend_day_05.entity.Category;
import com.dekon.backend_day_05.entity.Priority;

import java.time.Instant;

public record TodoResponse(
        String id,
        String title,
        String description,
        boolean completed,
        Priority priority,
        Category category,
        Instant dueAt,
        String userId,
        Instant createdAt,
        Instant updatedAt
) {
}
