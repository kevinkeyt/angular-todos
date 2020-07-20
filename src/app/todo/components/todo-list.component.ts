import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo-interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() todos$: Observable<Todo[]>;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() complete: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit(): void {}

  handleDelete(id) {
    this.delete.emit(id);
  }

  handleComplete(todo) {
    this.complete.emit(todo);
  }
}
