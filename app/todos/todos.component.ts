import { Component, OnInit } from '@angular/core';

import { Todo } from './shared/todos.model';
import { TodosService } from './shared/todos.service';

@Component({
  moduleId: module.id,
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

  addTodo(event: any, todoText: any) {
    let result: any;
    let newTodo: Todo = {
      text: todoText.value,
      is_completed: false
    };
    result = this.todosService.addTodo(newTodo);
    result.subscribe((res: Todo) => {
      this.todos.push(res);
      todoText.value = '';
    });

  }

  setEditState(todo: Todo, state: boolean) {
    if (state) {
      todo.isEditMode = state;
    }
    else {
      delete todo.isEditMode;
    }
  }

  updateStatus(todo: Todo) {
    let updatedTodo = todo;
    updatedTodo.is_completed = !todo.is_completed;
    this.todosService.updateTodo(updatedTodo)
      .subscribe(data => { todo.is_completed = updatedTodo.is_completed; });
  };

  updateTodoText(event: any, todo: Todo) {
    // keypress enter
    if (event.which === 13) {
      let updatedTodo = todo;
      updatedTodo.text = event.target.value;
      this.todosService.updateTodo(updatedTodo)
        .subscribe(data => {
          todo.text = updatedTodo.text;
          this.setEditState(todo, false);
        });
    }
  }

  deleteTodo(todo: Todo) {
    // keypress enter
    let updatedTodoList = this.todos;

    this.todosService.deleteTodo(todo._id)
      .subscribe((data: any) => {
        let idx = updatedTodoList.indexOf(todo);

        console.log(`deleted index ${idx}, obj:${todo._id}, data:${data._id}`);
        console.log(todo);
        console.log(data);
        if (idx !== -1) {
          updatedTodoList.splice(idx, 1); // The second parameter is the number of elements to remove.
          this.todos = updatedTodoList;
        }
        this.setEditState(todo, false);
      });


  }


}