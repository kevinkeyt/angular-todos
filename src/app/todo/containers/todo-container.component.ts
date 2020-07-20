import { Component, OnInit } from '@angular/core';

import { TodoService } from '../services/todo-service';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo-interface';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss'],
})
export class TodoContainerComponent implements OnInit {
  todos$: Observable<Todo[]>;
  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }

  markCompleted(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.saveTodo(todo);
  }

  addTodo(title: string): void {
    this.todoService.saveTodo({
      title,
      completed: false,
    });
  }
}
