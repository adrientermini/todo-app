import {Component, OnInit} from '@angular/core';
import {TodoManager} from "../../manager/todo.manager";
import {Todo} from "../../model/todo.model";

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit {

  public todos: Todo[] = [];

  constructor(
    public todoManager: TodoManager
  ) {
    this.todoManager.loadTodos();
    this.todoManager.todos$.subscribe(
      todos => this.todos = todos
    )
  }

  ngOnInit(): void {
  }

  deleteTodo(todo: Todo) {
    this.todoManager.deleteTodo(todo).subscribe();
  }
}
