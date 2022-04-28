import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    beforeEach(async () => {
        await TestBed
            .configureTestingModule({
                imports: [
                    FormsModule
                ],
                declarations: [
                    AppComponent
                ],
                providers: [
                    {
                        provide: ComponentFixtureAutoDetect, useValue: true
                    }
                ]
            })
            .compileComponents();
            
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect(app).toBeTruthy();
    });

    it('should render title', () => {
        const compiled = fixture.nativeElement.shadowRoot as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('My Todo\'s');
    });

    describe('adding todos', () => {
        it('should create a new todo', () => {
            expect(app.todos.length).toBe(0);

            app.newTodo('Buy milk');

            expect(app.todos.length).toBe(1);
            expect(app.todos[0].text).toBe('Buy milk');
            expect(app.todos[0].completed).toBe(false);
        });

        it('should put new todos first', () => {
            app.newTodo('Buy milk');
            app.newTodo('Buy bread');

            expect(app.todos[0].text).toBe('Buy bread');
            expect(app.todos[1].text).toBe('Buy milk');
        });

        it('should create a new todo from an input', () => {
            const compiled = fixture.nativeElement.shadowRoot as HTMLElement;
            const input = compiled.querySelector('input');
            input!.value = 'Buy milk';

            const form = compiled.querySelector('form');
            form!.requestSubmit();

            expect(app.todos.length).toBe(1);
        });

        it('should clear the input after adding the todo', () => {
            const compiled = fixture.nativeElement.shadowRoot as HTMLElement;

            expect(app.todo).toBe('');

            const input: HTMLInputElement = compiled.querySelector('input')!;
            input.value = 'Buy milk';
            input.dispatchEvent(new Event('input'));

            expect(app.todo).toBe('Buy milk');

            const form: HTMLFormElement = compiled.querySelector('form')!;
            form.requestSubmit();

            expect(app.todo).toBe('');
            expect(input.value).toBe('');
        });
    });

    describe('deleting todos', () => {

        it('should delete a todo', () => {
            app.newTodo('Buy milk');
            app.newTodo('Buy bread');

            expect(app.todos.length).toBe(2);

            app.deleteTodo(0);

            expect(app.todos.length).toBe(1);
            expect(app.todos[0].text).toBe('Buy milk');
        });
    });

});
