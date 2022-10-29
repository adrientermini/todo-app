import {Component, OnInit} from '@angular/core';
import {TodoManager} from "../../manager/todo.manager";

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit {

  constructor(
    public todoManager: TodoManager
  ) {
    this.todoManager.loadTodos();
  }

  ngOnInit(): void {
  }

}
