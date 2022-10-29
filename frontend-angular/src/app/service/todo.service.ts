import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "../model/todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly urlBase: string = 'http://localhost:8080/todo';

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public saveTodo(todo: Todo): Observable<Todo> {
    if (todo.id) {
      return this.httpClient.put<Todo>(this.urlBase + "/" + todo.id, todo);
    } else {
      return this.httpClient.post<Todo>(this.urlBase, todo);
    }
  }

  public findAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.urlBase);
  }

  public deleteTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.delete<Todo>(this.urlBase + "/" + todo.id);
  }

}
