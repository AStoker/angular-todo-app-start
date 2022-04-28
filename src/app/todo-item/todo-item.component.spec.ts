import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
    let component: TodoItemComponent;
    let fixture: ComponentFixture<TodoItemComponent>;

    beforeEach(async () => {
        await TestBed
            .configureTestingModule({
                imports: [ FormsModule ],
                declarations: [ TodoItemComponent ],
                providers: [
                    {
                        provide: ComponentFixtureAutoDetect, useValue: true
                    }
                ]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoItemComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set default states', () => {
        expect(component.completed).toBe(false);
        expect(component.text).toBe(''); 
    });

    it('should trigger delete when clicked', () => {
        jest.spyOn(component, 'delete');
        const compiled = fixture.nativeElement.shadowRoot as HTMLElement;

        const deleteButton = compiled.querySelector('button')!;

        deleteButton.click();

        expect(component.delete).toHaveBeenCalled();
    });
});
