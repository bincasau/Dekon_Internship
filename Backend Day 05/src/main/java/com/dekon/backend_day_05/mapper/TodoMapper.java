package com.dekon.backend_day_05.mapper;

import com.dekon.backend_day_05.dto.todo.TodoRequest;
import com.dekon.backend_day_05.dto.todo.TodoResponse;
import com.dekon.backend_day_05.entity.Todo;
import com.dekon.backend_day_05.entity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TodoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "title", source = "request.title", qualifiedByName = "trim")
    @Mapping(target = "description", source = "request.description")
    @Mapping(target = "priority", source = "request.priority", defaultValue = "MEDIUM")
    @Mapping(target = "category", source = "request.category", defaultValue = "OTHER")
    @Mapping(target = "dueAt", source = "request.dueAt")
    @Mapping(target = "completed", constant = "false")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Todo toEntity(TodoRequest request, Users user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "completed", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "title", source = "title", qualifiedByName = "trim")
    @Mapping(target = "priority", source = "priority", defaultValue = "MEDIUM")
    @Mapping(target = "category", source = "category", defaultValue = "OTHER")
    void updateEntity(@MappingTarget Todo todo, TodoRequest request);

    @Mapping(target = "userId", source = "user.id")
    TodoResponse toResponse(Todo todo);

    @Named("trim")
    default String trim(String value) {
        return value == null ? null : value.trim();
    }
}
