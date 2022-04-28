import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class TodoItemComponent {

    @Input() completed: boolean = false;
    @Input() text: string = '';
    @Output() deleted: EventEmitter<any> = new EventEmitter();


    public delete(): void {
        this.deleted.emit(true);
    }
}
