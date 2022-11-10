package com.train.todoapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.train.todoapp.dto.TodoDTO;
import com.train.todoapp.service.TodoService;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TodoControllerTest {

    private static final String urlBase = "/todo";
    private static TodoDTO todo = new TodoDTO();
    private static Long currentId;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private TodoService todoService;

    @Test
    public void saveTodoTest() throws Exception {
        todo.setTitle("Test");
        todo.setDescription("Ceci est un test");

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(todo);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders
                        .post(urlBase)
                        .content(json)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(todo.getTitle()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(todo.getDescription()))
                .andReturn();

        String jsonResult = result.getResponse().getContentAsString();
        JSONObject jsObject = new JSONObject(jsonResult);
        currentId = jsObject.getLong("id");
    }

    @Test
    public void findAllTodosTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get(urlBase)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void updateTodoTest() throws Exception {
        todo = todoService.getTodoById(currentId);
        todo.setTitle("Test modifié");
        todo.setDescription("Ceci est un test modifié");

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(todo);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(urlBase + "/{id}", currentId)
                        .content(json)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(currentId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(todo.getTitle()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(todo.getDescription()));
    }

    @Test
    public void findTodoByIdTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get(urlBase + "/{id}", currentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(currentId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(todo.getTitle()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(todo.getDescription()));
    }

    @Test
    public void deleteTodoTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete(urlBase + "/{id}", currentId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(currentId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(todo.getTitle()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(todo.getDescription()));
    }
}
