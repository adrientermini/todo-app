package com.train.todoapp.mapper;

import com.train.todoapp.dto.TodoDTO;
import com.train.todoapp.model.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TodoMapper {
    TodoDTO toDto(Todo entity);

    Todo toEntity(TodoDTO dto);
}
