package com.train.todoapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.train.todoapp.model.Todo;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long> {
}
