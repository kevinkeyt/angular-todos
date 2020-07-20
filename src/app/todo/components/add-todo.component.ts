import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  inputText: string = '';
  @Output() todoText: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  handleSubmit(event): void {
    event.preventDefault();
    this.todoText.emit(this.inputText);
    this.inputText = '';
  }

  handleInputChange(text: string): void {
    this.inputText = text;
  }
}
