package com.dekon.backend_day_05.service;

import com.dekon.backend_day_05.dto.todo.TodoRequest;
import com.dekon.backend_day_05.dto.todo.TodoResponse;

import java.util.List;

public interface TodoService {
    TodoResponse create(String userId, TodoRequest request);

    List<TodoResponse> getAll(String userId);

    TodoResponse getById(String userId, String todoId);

    TodoResponse update(String userId, String todoId, TodoRequest request);

    TodoResponse toggleCompleted(String userId, String todoId);

    void delete(String userId, String todoId);
}
