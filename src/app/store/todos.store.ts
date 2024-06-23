import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { Todo } from "../model/model";
import { TodoService } from "../services/todo.service";

export type TodoFilter = 'all' | 'pending' | 'completed';

type TodoState ={
    todos: Todo[];
    loading: boolean;
    filter: TodoFilter;
}

const initialState: TodoState ={
    todos: [],
    loading: false,
    filter: "all"
}

export const TodosStore = signalStore(
    {providedIn:'root'},
    withState(initialState),
    withMethods(
        (store, todosService = inject(TodoService))=>({
             async loadAll(){
                patchState(store, {
                    loading: true
                });

                const todos = await todosService.getTodos();

                patchState(store, {
                    todos,
                    loading: false
                })
             },

             async addTodo(title:string){
              const todo = await todosService.addTodo({title, completed: false});

              patchState(store,(state)=>({
                todos: [...state.todos, todo]
              }))
        },

        async deleteTodo(id:string){
          await todosService.deleteTodo(id);
          patchState(store,(state)=>({
              todos: state.todos.filter(todo => todo.id !== id)
          }))

        },

        async updateTodo(id:string, completed:boolean){
          await todosService.updateTodo(id, completed);
          patchState(store,(state)=>({
              todos: state.todos.map(todo => todo.id === id ? {...todo, completed} : todo)
          }))
        },

        updateFilter(filter:TodoFilter){
            patchState(store, {filter});
        }

        })
    ),
    withComputed((state)=>({
        filteredTodos: computed(()=>{
            const todos = state.todos();

            switch(state.filter()){
                case 'all':
                    return todos;
                case 'pending':
                    return todos.filter(todo => !todo.completed);
                case "completed":
                    return todos.filter(todo => todo.completed);
            }
        })
    }))
);