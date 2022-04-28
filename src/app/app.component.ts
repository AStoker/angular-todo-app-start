import { Component, ViewEncapsulation } from '@angular/core';

interface Todo {
    text: string;
    completed: boolean;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
    readonly todos: Todo[] = [];
    todo: string = '';

    newTodo(text: string): void {
        this.todos.unshift({text, completed: false});
        this.todo = '';
    }

    deleteTodo(index: number): void {
        this.todos.splice(index, 1);
    }
}
