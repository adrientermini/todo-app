import {Component, OnInit} from '@angular/core';
import {TodoManager} from "../../manager/todo.manager";
import {Todo} from "../../model/todo.model";
import {DialogService} from "primeng/dynamicdialog";
import {DialogDisplayComponent} from "../dialog-display/dialog-display.component";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class CrudTableComponent implements OnInit {

  public todos: Todo[] = [];

  constructor(
    public todoManager: TodoManager,
    private readonly dialogService: DialogService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {
    this.todoManager.loadTodos();
    this.todoManager.todos$.subscribe(
      todos => this.todos = todos
    );
  }

  ngOnInit(): void {
  }

  public showDialog(todo: Todo = null): void{
    this.dialogService.open(DialogDisplayComponent, {
      header: (todo !== null) ? `Éditer Todo : ${todo.title}` : 'Nouveau Todo',
      width: '30vw',
      closable: true,
      data: todo
    });
  }

  deleteTodo(event: Event, todo: Todo): void {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Êtes-vous sûr de vouloir supprimer ce Todo?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.todoManager.deleteTodo(todo).subscribe(
          () => this.messageService.add({
            severity:'success',
            summary:'Supprimé',
            detail:'Ce Todo a correctement été supprimé.',
            icon: 'pi pi-trash'
          })
        );
      }
    });
  }
}
