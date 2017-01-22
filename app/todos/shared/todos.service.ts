import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Todo } from './todos.model';

@Injectable()
export class TodosService {
	private baseUrl:string;
	private todosEndPoint:string;
	constructor(private http: Http) {
		this.baseUrl = "http://localhost:3000/api/v1"
		this.todosEndPoint = "/todos"
	 }

	getTodos(): Observable<Todo[]> {
		return this.http.get(this.baseUrl + this.todosEndPoint).map(res => res.json() as Todo[]);
	}

	newTodo(todoText:string){
		return this.http.post(this.baseUrl + this.todosEndPoint, {text:todoText}).map(res => res.json());
	}
}