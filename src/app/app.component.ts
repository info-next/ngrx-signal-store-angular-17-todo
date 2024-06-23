import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoFilter, TodosStore } from './store/todos.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngrx-signal-store';

  store = inject(TodosStore)

  ngOnInit() {
    this.loadTodos();
  }

async loadTodos(){
  await this.store.loadAll()
}

async addTodo(value:string){
  await this.store.addTodo(value);
}

switchFilter(filter:TodoFilter){
  this.store.updateFilter(filter)
}

}

