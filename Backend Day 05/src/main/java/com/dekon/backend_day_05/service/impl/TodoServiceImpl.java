package com.dekon.backend_day_05.service.impl;

import com.dekon.backend_day_05.dto.todo.TodoRequest;
import com.dekon.backend_day_05.dto.todo.TodoResponse;
import com.dekon.backend_day_05.entity.Todo;
import com.dekon.backend_day_05.entity.Users;
import com.dekon.backend_day_05.exception.AppException;
import com.dekon.backend_day_05.exception.ErrorCode;
import com.dekon.backend_day_05.mapper.TodoMapper;
import com.dekon.backend_day_05.repository.TodoRepository;
import com.dekon.backend_day_05.repository.UserRepository;
import com.dekon.backend_day_05.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;
    private final TodoMapper todoMapper;

    @Override
    @Transactional
    public TodoResponse create(String userId, TodoRequest request) {
        Users user = findUser(userId);
        Todo todo = todoMapper.toEntity(request, user);
        return todoMapper.toResponse(todoRepository.save(todo));
    }

    @Override
    public List<TodoResponse> getAll(String userId) {
        findUser(userId);
        return todoRepository.findAllByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(todoMapper::toResponse)
                .toList();
    }

    @Override
    public TodoResponse getById(String userId, String todoId) {
        return todoMapper.toResponse(findTodo(userId, todoId));
    }

    @Override
    @Transactional
    public TodoResponse update(String userId, String todoId, TodoRequest request) {
        Todo todo = findTodo(userId, todoId);
        todoMapper.updateEntity(todo, request);
        return todoMapper.toResponse(todoRepository.save(todo));
    }

    @Override
    @Transactional
    public TodoResponse toggleCompleted(String userId, String todoId) {
        Todo todo = findTodo(userId, todoId);
        todo.setCompleted(!todo.isCompleted());
        return todoMapper.toResponse(todoRepository.save(todo));
    }

    @Override
    @Transactional
    public void delete(String userId, String todoId) {
        todoRepository.delete(findTodo(userId, todoId));
    }

    private Users findUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    private Todo findTodo(String userId, String todoId) {
        return todoRepository.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new AppException(ErrorCode.TODO_NOT_FOUND));
    }
}
