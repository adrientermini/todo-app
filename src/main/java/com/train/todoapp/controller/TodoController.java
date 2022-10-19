package com.train.todoapp.controller;

import com.train.todoapp.dto.TodoDTO;
import com.train.todoapp.service.TodoService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter
@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping("{id}")
    public TodoDTO findById(@PathVariable final Long id){
        return this.getTodoService().getTodoById(id);
    }

    @GetMapping
    public List<TodoDTO> findAll(){
        return this.getTodoService().getAllTodo();
    }

    @DeleteMapping("{id}")
    public TodoDTO deleteById(@PathVariable final Long id){
        return this.getTodoService().deleteTodoById(id);
    }

    @PostMapping
    public TodoDTO save(@RequestBody final TodoDTO todoDTO){
        return this.getTodoService().saveTodo(todoDTO);
    }

    @PutMapping("{id}")
    public TodoDTO update(@PathVariable final Long id, @RequestBody final TodoDTO todoDTO){
        TodoDTO currentToDo = this.getTodoService().getTodoById(id);

        if(currentToDo != null){
            String title = todoDTO.getTitle();
            if(title != null){
                currentToDo.setTitle(title);
            }

            String description = todoDTO.getDescription();
            if(description != null){
                currentToDo.setDescription(description);
            }
            return this.getTodoService().saveTodo(currentToDo);
        }
        return null;
    }
}
