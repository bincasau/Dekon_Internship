package com.dekon.backend_day_05.controller;

import com.dekon.backend_day_05.dto.todo.TodoRequest;
import com.dekon.backend_day_05.dto.todo.TodoResponse;
import com.dekon.backend_day_05.dto.response.ApiResponse;
import com.dekon.backend_day_05.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<ApiResponse<TodoResponse>> create(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody TodoRequest request
    ) {
        TodoResponse todo = todoService.create(jwt.getSubject(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Todo created successfully", todo));
    }

    @GetMapping
    public ApiResponse<List<TodoResponse>> getAll(@AuthenticationPrincipal Jwt jwt) {
        return ApiResponse.success(todoService.getAll(jwt.getSubject()));
    }

    @GetMapping("/{todoId}")
    public ApiResponse<TodoResponse> getById(@AuthenticationPrincipal Jwt jwt, @PathVariable String todoId) {
        return ApiResponse.success(todoService.getById(jwt.getSubject(), todoId));
    }

    @PutMapping("/{todoId}")
    public ApiResponse<TodoResponse> update(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String todoId,
            @Valid @RequestBody TodoRequest request
    ) {
        return ApiResponse.success(
                "Todo updated successfully",
                todoService.update(jwt.getSubject(), todoId, request)
        );
    }

    @PatchMapping("/{todoId}/toggle")
    public ApiResponse<TodoResponse> toggleCompleted(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String todoId
    ) {
        return ApiResponse.success(
                "Todo status updated successfully",
                todoService.toggleCompleted(jwt.getSubject(), todoId)
        );
    }

    @DeleteMapping("/{todoId}")
    public ApiResponse<Void> delete(@AuthenticationPrincipal Jwt jwt, @PathVariable String todoId) {
        todoService.delete(jwt.getSubject(), todoId);
        return ApiResponse.success("Todo deleted successfully", null);
    }
}
