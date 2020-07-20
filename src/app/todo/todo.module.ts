import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoContainerComponent } from './containers/todo-container.component';
import { AddTodoComponent } from './components/add-todo.component';
import { TodoListComponent } from './components/todo-list.component';

@NgModule({
  declarations: [TodoContainerComponent, AddTodoComponent, TodoListComponent],
  imports: [CommonModule],
  exports: [TodoContainerComponent, AddTodoComponent, TodoListComponent],
})
export class TodoModule {}
