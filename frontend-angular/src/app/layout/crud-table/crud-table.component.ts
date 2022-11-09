import {Component, OnInit} from '@angular/core';
import {TodoManager} from "../../manager/todo.manager";
import {Todo} from "../../model/todo.model";
import {DialogService} from "primeng/dynamicdialog";
import {DialogDisplayComponent} from "../dialog-display/dialog-display.component";

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
  providers: [DialogService]
})
export class CrudTableComponent implements OnInit {

  public todos: Todo[] = [];

  constructor(
    public todoManager: TodoManager,
    private readonly dialogService: DialogService
  ) {
    this.todoManager.loadTodos();
    this.todoManager.todos$.subscribe(
      todos => this.todos = todos
    )
  }

  ngOnInit(): void {
  }

  public showDialog(todo: Todo = null): void{
    let header = 'Nouveau Todo'

    if(todo !== null){
      header = 'Modifier';
    }

    this.dialogService.open(DialogDisplayComponent, {
      header: header,
      width: '30vw',
      closable: true,
      data: todo
    });
  }

  deleteTodo(todo: Todo) {
    this.todoManager.deleteTodo(todo).subscribe();
  }
}
