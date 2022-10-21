package com.train.todoapp.mapper;

import com.train.todoapp.dto.TodoDTO;
import com.train.todoapp.model.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TodoMapper {

    TodoMapper INSTANCE = Mappers.getMapper(TodoMapper.class);

    TodoDTO toDto(Todo entity);

    Todo toEntity(TodoDTO dto);
}
