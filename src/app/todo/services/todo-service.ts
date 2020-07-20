import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, tap, map } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { Todo } from '../models/todo-interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  private apiUrl: string = `${environment.apiServer}todos`;
  private todos: Todo[] = [];
  private subs = new SubSink();
  protected todosSubject$ = new BehaviorSubject<Todo[]>([]);
  constructor(private readonly httpClient: HttpClient) {
    this.subs.sink = this.loadTodos().subscribe();
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject$.asObservable();
  }

  saveTodo(todo: Todo): void {
    if (todo.id) {
      this.subs.sink = this.httpClient
        .put<Todo>(this.apiUrl + '/' + todo.id, todo)
        .pipe(
          tap((todo) => console.log('Updated Todo:', todo)),
          map((todo) => {
            this.todos = this.todos.map((x) => (x.id === todo.id ? todo : x));
            this.todosSubject$.next(this.todos);
          })
        )
        .subscribe();
    } else {
      this.subs.sink = this.httpClient
        .post<Todo>(this.apiUrl, todo)
        .pipe(
          tap((todo) => console.log('New Todo:', todo)),
          map((todo) => {
            this.todos = [...this.todos, todo];
            this.todosSubject$.next(this.todos);
          })
        )
        .subscribe();
    }
  }

  deleteTodo(id: number): void {
    this.subs.sink = this.httpClient
      .delete(this.apiUrl + '/' + id)
      .pipe(
        tap((todo) => console.log('Updated Todo:', todo)),
        map((_) => {
          this.todos = this.todos.filter((x) => x.id !== id);
          this.todosSubject$.next(this.todos);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private loadTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.apiUrl).pipe(
      map((todos) => {
        this.todos = todos;
        this.todosSubject$.next(this.todos);
        return todos;
      }),
      tap((todos) => console.log('Todos from API:', todos)),
      shareReplay(1)
    );
  }
}
