import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Todo } from './todos.model';

@Injectable()
export class TodosService {
  private baseUrl: string;
  private todosEndPoint: string;
  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:3000/api/v1';
    this.todosEndPoint = '/todos';
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get(this.baseUrl + this.todosEndPoint).map(res => res.json() as Todo[]);
  }

  addTodo(newTodo: Todo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + this.todosEndPoint, JSON.stringify(newTodo), { headers: headers }).map(res => res.json());
  }

  updateTodo(todo: Todo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}${this.todosEndPoint}/${todo._id}`, JSON.stringify(todo), { headers: headers })
      .map(res => res.json());
  }
  deleteTodo(id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`${this.baseUrl}${this.todosEndPoint}/${id}`)
      .map(res => res.json());
  }
  

}