import { Component, OnInit } from "@angular/core";
import { Todo } from "../todo";
import { TodoService } from '../todo.service';

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  newTodo: string;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.refreshTodos();
  }

  private refreshTodos() {
    this.todoService.findTodos().subscribe(
      (todos: Todo[]) => this.todos = todos
    )
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  addTodo() {
    const newTodo: Todo = {
      task: this.newTodo,
      isDone: false
    }
    this.todoService.addTodo(newTodo).subscribe((todo: Todo) => {
      this.todos.push(todo)
    })
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe(
      () => {
        this.todos = this.todos.filter(t => t.id !== todo.id)
      }
    )
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe()
  }
}
