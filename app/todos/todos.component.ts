import { Component, OnInit } from '@angular/core';

import { Todo } from './shared/todos.model';
import { TodosService } from './shared/todos.service';

@Component({
	moduleId:module.id,
	selector: 'todos',
	templateUrl: 'todos.component.html'
})

export class TodosComponent implements OnInit {
	todos: Todo[] = [];

	constructor(private todosService: TodosService) { }

	ngOnInit() {
		this.todosService.getTodos().subscribe((res) => {
			
			this.todos = res;
			console.log(res);
		});
	}

	createTodo(){
		this.todosService.newTodo(this.todoText)

	}
}