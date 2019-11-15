import { Component, OnInit } from "@angular/core";
import { Todo } from "../todo";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  newTodo: string;

  constructor() { }

  ngOnInit() {
    this.refreshTodos();
  }

  private refreshTodos() {
    const todos = localStorage.getItem('todos')
    this.todos = todos ? JSON.parse(todos) : []
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  addTodo() {
    this.todos.push({
      id: this.todos.reduce((acc, t) => acc <= t.id ? t.id + 1 : acc, 1),
      task: this.newTodo,
      isDone: false
    })
    this.saveTodos()
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id)
    this.saveTodos()
  }
}
