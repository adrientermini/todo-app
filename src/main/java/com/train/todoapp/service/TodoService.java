package com.train.todoapp.service;

import com.train.todoapp.dto.TodoDTO;
import com.train.todoapp.mapper.TodoMapper;
import com.train.todoapp.model.Todo;
import com.train.todoapp.repository.TodoRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

@Getter
@Slf4j
@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    private final TodoMapper todoMapper;

    public TodoDTO getTodoById(final Long id) {
        Optional<Todo> todo = this.getTodoRepository().findById(id);
        log.debug(MessageFormat.format("Find TODO by ID : {0}", id));

        return todo.map(todoMapper::toDto).orElse(null);
    }

    public List<TodoDTO> getAllTodo() {
        Iterable<Todo> iterable = this.getTodoRepository().findAll();
        List<TodoDTO> result = StreamSupport
                .stream(iterable.spliterator(), false)
                .map(todoMapper::toDto)
                .toList();
        log.debug("Find all TODOs");

        return result;
    }

    public TodoDTO deleteTodoById(final Long id) {
        Optional<Todo> todo = this.getTodoRepository().findById(id);
        todo.ifPresent(t -> this.getTodoRepository().deleteById(t.getId()));
        log.debug(MessageFormat.format("Delete TODO by ID : {0}", id));

        return todo.map(todoMapper::toDto).orElse(null);
    }

    public TodoDTO saveTodo(TodoDTO todoDTO) {
        Todo todo = todoMapper.toEntity(todoDTO);
        todo = this.getTodoRepository().save(todo);
        log.debug(MessageFormat.format("New TODO saved with id : {0}", todo.getId()));

        return todoMapper.toDto(todo);
    }
}
