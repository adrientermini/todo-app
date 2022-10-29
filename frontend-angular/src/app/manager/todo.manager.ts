import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Todo} from "../model/todo.model";
import {TodoService} from "../service/todo.service";

@Injectable()
export class TodoManager {
  private todoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  public todos$: Observable<Todo[]> = this.todoSubject.asObservable();

  constructor(
    private readonly todoService: TodoService
  ) {
  }

  public loadTodos() {
    this.todoService.findAllTodos().pipe(
      tap(todo => this.todoSubject.next(todo))
    ).subscribe();
  }

  public saveTodo(todo: Todo): Observable<Todo> {
    return this.todoService.saveTodo(todo).pipe(
      tap(() => this.loadTodos())
    );
  }

  public deleteTodo(todo: Todo): Observable<Todo> {
    return this.todoService.deleteTodo(todo).pipe(
      tap(() => this.loadTodos())
    );
  }
}
