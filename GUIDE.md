- [Create A Todo App With Test Driven Development](#create-a-todo-app-with-test-driven-development)
  - [Prerequisites](#prerequisites)
    - [Required Tools](#required-tools)
    - [Recommended Extensions](#recommended-extensions)
    - [Recommended Reading](#recommended-reading)
  - [Setup](#setup)
  - [Open the Project](#open-the-project)
    - [Starting the Application](#starting-the-application)
  - [Creating Our First Test](#creating-our-first-test)
    - [Test the Title](#test-the-title)
  - [Creating TODO's](#creating-todos)
    - [Writing Tests To Add Todos](#writing-tests-to-add-todos)
    - [Implementing the Code To Add Todos](#implementing-the-code-to-add-todos)
    - [Writing The Rest Of The "Add" Tests](#writing-the-rest-of-the-add-tests)
    - [Implementing the rest of the "Add" Code](#implementing-the-rest-of-the-add-code)
  - [Deleting TODO's](#deleting-todos)
    - [Writing Tests To Delete Todos](#writing-tests-to-delete-todos)
    - [Writing The Code To Delete Todos](#writing-the-code-to-delete-todos)
  - [Creating A Todo Item Component](#creating-a-todo-item-component)
    - [Creating Tests For The Todo-Item Component](#creating-tests-for-the-todo-item-component)
    - [Defining The Todo-Item Component](#defining-the-todo-item-component)
    - [Deleting Todo Items](#deleting-todo-items)
  - [Celebrate](#celebrate)

# Create A Todo App With Test Driven Development

In this tutorial we will be creating a Todo app with test driven development (also known as TDD).

If you would like to see the finished project, check out the repo here: <https://github.com/AStoker/angular-todo-app-finished>.

## Prerequisites

You **need** to have a few things installed before you can start this tutorial.

### Required Tools

-   [Node.js](https://nodejs.org/en/), version **16.14.2** or higher
-   [Yarn](https://yarnpkg.com/getting-started/install#nodejs-1610)
-   [Angular CLI](https://angular.io/cli#installing-angular-cli)

### Recommended Extensions

We will be using [Visual Studio Code](https://code.visualstudio.com) for this tutorial. There are also a few extensions that we will be using, but if you prefer to use the command line, you may. The recommended extensions are:

-   [Jest for Visual Studio](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

### Recommended Reading

We will be using Jest as a testing framework. The concepts we learn about testing with Jest are very similar to other testing frameworks.

-   [Jest](https://jestjs.io/docs/en/getting-started)

## Setup

1. Download the starter project from [here](https://github.com/AStoker/angular-todo-app-start).
2. Install the dependencies using Yarn.

    1. Open the project folder and run the following command inside a terminal/powershell window:

        ```bash
        yarn
        ```

You now have a project that is ready to be used.

## Open the Project

Go ahead and open the application inside Visual Studio Code (or any editor you prefer).  
If you're using Visual Studio Code, and you've installed the Jest extension, you should see in the left panel a tab that looks like a test beaker. Clicking on that shows you the test results. We'll be using this to rerun and verify tests.

### Starting the Application

To start the application, use the Angular CLI with the following command (inside the project folder):

```bash
ng serve --open
```

You'll see a window open with our blank application. This command will watch for file changes and automatically recompile and reload the application in the browser, so it's best to just leave it running while we do our work.

## Creating Our First Test

We will start off by creating a very simple test to assert that the title of our application is what we expect it to be.

### Test the Title

The idea behind test driven development is that you write your tests first, and then you write your code. This gives you a "specification" (hence the extension "spec.ts") that you can use to test your code. Writing your tests first also enable you to create properly testable code.

Our first task will be to evaluate the application's title and ensure that it matches what we expect.

1. Open the `src/app/app.component.spec.ts` file.
    1. We have organized our test file to `describe` a test suite (the 'AppComponent'). Inside a test suite we use the `it` function to describe a single test.
2. At the bottom of the `describe` we'll create a new test.

    1. We'll use the `it` function to describe our test.
    2. We'll get the compiled output of our application by referencing the fixture and getting the element.
    3. We'll use the `expect` function to test the application title's text content.
    4. We'll use the `toContain` function to assert the expected title.

    ```typescript
    it("should render title", () => {
        const compiled = fixture.nativeElement.shadowRoot as HTMLElement;
        expect(compiled.querySelector("h1")?.textContent).toContain(
            "My Todo's"
        );
    });
    ```

3. If you're using the VS Code Jest extension, you should see a green checkmark next to the test (both in the file and in the left panel containing all the tests).

    1. If you are not using the Jest extension, to run the test, you can run the following command:

        ```bash
        yarn run test
        ```

        You can optionally run the `watch` command to watch for changes and automatically rerun the tests.

        ```bash
        yarn run test:watch
        ```

## Creating TODO's

Our Todo app obviously needs to be able to create and maintain a list of Todos, and your first instinct will likely to be to dive into the code start creating the required structure. But this is not the right approach.  
The first step in Test Driven Development is to create a test that will assert what we want.

### Writing Tests To Add Todos

1. We'll start by creating a new test suite to describe everything around creating and adding todos.

    1. We'll use the `describe` function to describe our test suite.

        ```typescript
        describe("adding todos", () => {});
        ```

    2. Next we'll create a new test that asserts that

        - An array of todos is empty
        - When a new todo is added our array of todos has one more item
        - That the new todo has a text property and a completed property

        ```typescript
        it("should create a new todo", () => {
            expect(app.todos.length).toBe(0);

            app.newTodo("Buy milk");

            expect(app.todos.length).toBe(1);
            expect(app.todos[0].text).toBe("Buy milk");
            expect(app.todos[0].completed).toBe(false);
        });
        ```

You'll see after we save the file that we have a failing test. That's to be expected! We've created a specification on how to create a new todo, but we haven't actually implemented the code to create the todo.  
Let's fix that now.

### Implementing the Code To Add Todos

1. The first thing we need to do is ensure we have an array that contains our todos. We'll create a new property on our application called `todos` and assign it an empty array.

    1. Open the `src/app/app.component.ts` file.
    2. We know we're going to need the properties `text` and `completed` for out Todos, so let's create an interface that will represent our Todo at the top of the file, but after the initial imports.

        ```typescript
        interface Todo {
            text: string;
            completed: boolean;
        }
        ```

    3. Next we'll create a new property called `todos` and assign it an empty array that holds our Todos. Add this property to the top of the `AppComponent` class.

        ```typescript
        todos: Todo[] = [];
        ```

2. We also need to add a function that allows us to add a new todo. Keeping in mind our test required us to pass a string as a parameter. Add this function to the `AppComponent` class.

    ```typescript
    newTodo(text: string): void {
        this.todos.push({
            text,
            completed: false,
        });
    }
    ```

    - You can see that whenever we add a new Todo we're giving it a `text` property and a completed property that defaults to `false`.

You'll notice now that our tests are all passing. Great work!

### Writing The Rest Of The "Add" Tests

Obviously we need to add more tests to define the rest of the expected behavior of our Todo app.

1. Put the newest Todo first in the array of todos.

    ```typescript
    it("should put new todos first", () => {
        app.newTodo("Buy milk");
        app.newTodo("Buy bread");

        expect(app.todos[0].text).toBe("Buy bread");
        expect(app.todos[1].text).toBe("Buy milk");
    });
    ```

2. We should be able to add new Todos from an input

    ```typescript
    it("should create a new todo from an input", () => {
        const compiled = fixture.nativeElement.shadowRoot as HTMLElement;
        const input = compiled.querySelector("input");
        input!.value = "Buy milk";

        const form = compiled.querySelector("form");
        form!.requestSubmit();

        expect(app.todos.length).toBe(1);
    });
    ```

3. We should clear the input when we add a new Todo

    ```typescript
    it("should clear the input after adding the todo", () => {
        const compiled = fixture.nativeElement.shadowRoot as HTMLElement;

        expect(app.todo).toBe("");

        const input: HTMLInputElement = compiled.querySelector("input")!;
        input.value = "Buy milk";
        input.dispatchEvent(new Event("input"));

        expect(app.todo).toBe("Buy milk");

        const form: HTMLFormElement = compiled.querySelector("form")!;
        form.requestSubmit();

        expect(app.todo).toBe("");
        expect(input.value).toBe("");
    });
    ```

That's a handful of tests that are all failing right now. Let's fix that.

### Implementing the rest of the "Add" Code

1. Before we go farther, if you look at the failing tests, you'll notice they're specifically failing because of missing property called `todo`. This is the string that we'll be using to add a new todo. However, because we're using Typescript, we're getting this error a bit early. Let's resolve it for now and come back to implementing the feature in a couple steps.

    1. Add a new property called `todo` to the `AppComponent` class.

        ```typescript
        todo: string = "";
        ```

    2. Now that we've added that, our tests can appropriately run (and appropriately fail). Let's handle the rest now.

2. The next test that we added was regarding the order of new todos. If you look at the failing test `AppComponent › adding todos › should put new todos first`, you'll see that we're expecting to get the value `Buy bread`, but instead we received the value `Buy milk`. This is because we're using `push` to put new items on our `todos` array. If we simply change that to `unshift`, we'll put the newest todo items first.

    1. Your `newTodo` function should now look like this

        ```typescript
        newTodo(text: string) {
            this.todos.unshift({
                text,
                completed: false,
            });
        }
        ```

3. The next failing test revolves around creating a new todo from an input. So far we've only modified the Typescript files, but now let's focus on the `src/app/app.component.html` file.

    1. Open the `src/app/app.component.html` file and add the following code below the `<h1>` tag

        ```html
        <div class="todo">
            <form action="#" (submit)="newTodo(todo)">
                <div class="todo__compose">
                    <input
                        type="text"
                        name="todo-text"
                        class="todo-compose__input"
                        placeholder="What needs to be done?"
                        [(ngModel)]="todo"
                    />
                </div>
            </form>

            <div class="todo__items">
                <div *ngFor="let todo of todos; index as i">
                    {{ todo.text }}
                </div>
            </div>
        </div>
        ```

    2. Viola, passing test!

4. The last test ensures that whenever a new Todo is added, we appropriately clear out the input so we're ready to add another Todo.

    1. In this case, we already have a function that is called when we add a new Todo, and we have a property that's bound to the input. So all we need to do is clear that property whenever we add a new Todo. Modify the `newTodo` function toe clear out the value, it should now look like this.

        ```typescript
            newTodo(text: string) {
            this.todos.unshift({
                text,
                completed: false,
            });
            this.todo = '';
        }
        ```

That should be all the tests that handle creating Todos. Go ahead and give the app a try! If you left the `ng serve --open` task running, then you should still see the app running in your browser. Type in a value in the input and then hit enter. You'll see that the entry is cleared out, just like we asserted. You'll also see a pretty little un-styled Todo item.

## Deleting TODO's

Being able to add Todos don't do us any good if we can't remove them too. Accidents happen, and sometimes the cat jumps on the keyboard just at the right moment. Let's follow our TDD practice and start by writing tests for deleting Todos.

### Writing Tests To Delete Todos

Since we're testing different functionality than our last test suite (which focused on adding todos), let's create a new test suite that describes deleting todos.

1. Open the `src/app/app.component.spec.ts` file, add a new test suite called `deleting todos`.
2. Inside the test suite create a test that adds two todos.
3. After you've added two todos, make an assertion that the todos array length is 2. Doing this provides us with a test that asserts our initial state is correct. This provides us with a more robust test that checks both the initial state and final state. If something were to go wrong, we'd have a better clue as to where the problem is.
4. Call the function `deleteTodo` and pass in an index of 0 (we're going to test deleting the first item).
5. Make an assertion that the todos array length is 1.
6. Make an assertion that the todo at index 0 has the text we initially added for the second todo.

You should have a test suite that looks something like this

```typescript
describe("deleting todos", () => {
    it("should delete a todo", () => {
        app.newTodo("Buy milk");
        app.newTodo("Buy bread");

        expect(app.todos.length).toBe(2);

        app.deleteTodo(0);

        expect(app.todos.length).toBe(1);
        expect(app.todos[0].text).toBe("Buy milk");
    });
});
```

Right now, we can see the test is failing because we don't have a function called `deleteTodo`. Let's go ahead and add that next.

### Writing The Code To Delete Todos

Since our todos are stored in an array, we can use the `splice` method to remove items from the array. Go ahead and create a function called `deleteTodo` that takes in an index and removes the item at that index. It should look something like this:

```typescript
deleteTodo(index: number): void {
    this.todos.splice(index, 1);
}
```

Bada-bing, we're done with deleting todos! All this works great in the code, but we're still missing some core Todo functionality, namely, being able to mark todos as complete. To do (see what I did there) that, we are going to create a new component called `todo-item`. Let's do that now.

## Creating A Todo Item Component

We're going to use Angular's CLI to generate a new component called `todo-item`. We'll use the `ng generate component` command.

1. Run the following command in your terminal:

    ```bash
    ng generate component todo-item
    ```

    This will generate a new component called `todo-item` in the `src/app/todo-item/todo-item.component.ts` file. Let's go ahead and hook this component up to our app, even though we haven't added any functionality yet.

2. In the `src/app/app.component.html` file, modify the `<div>` that is used for each todo item and replace it with the `<todo-item>` component. You should have something that looks like this:

    ```html
    <div class="todo__items">
        <todo-item *ngFor="let todo of todos; index as i"> </todo-item>
    </div>
    ```

    If you try to add new todos, you'll see that the new `<todo-item>` component is now being used, and with it the default text of "todo-item works!" is shown for each todo.

3. Replace the contents of the `src/app/todo-item.component.scss` file with the following:

    ```scss
    .todo-item {
        align-items: center;
        border-bottom: 1px solid #ededed;
        display: grid;
        grid-template-columns: 50px 450px 50px;
        word-wrap: break-word;

        &.completed {
            color: #d9d9dd;
            text-decoration: line-through;
        }

        input[type="checkbox"] {
            height: 25px;
            margin-left: 15px;
            width: 25px;
        }

        p {
            box-shadow: none;
            font-size: 18px;
            outline: none;
            padding: 18px 0;

            &:focus {
                font-weight: bold;
            }
        }

        &:hover {
            button {
                visibility: visible;
            }
        }
        button {
            color: red;
            cursor: pointer;
            font-size: 24px;
            justify-self: end;
            visibility: hidden;
            border: none;
            background-color: inherit;
        }
    }
    ```

Now that we have a `todo-item` component, we can start our TDD process again.

### Creating Tests For The Todo-Item Component

If you open the `src/app/todo-item/todo-item.component.spec.ts` file, you'll see that Angular's generate command has created a basic test suite for us. There's one thing missing in this test suite (besides tests) that Angular doesn't put in automatically. Because we're using inputs and binding values, we need to use the FormsModule to tell Angular how to correctly communicate between the component and the input. That's already taken care of in our `src/app.module.ts` file, but we need to use it in this test file as well when we're configuring the `TestBed`.

> Note: The `beforeEach` callback in tests provides us with an opportunity to configure our environment before each test, and ultimately allow us to have a clean slate for each test, limiting testing pollution.

1. Open the `src/app/todo-item/todo-item.component.spec.ts` file and add the following code to the top of the file:

    ```typescript
    import { FormsModule } from "@angular/forms";
    ```

2. Now, in the `beforeEach` callback, modify the the test bed configuration by adding an `imports` property that is an array containing the `FormsModule`. Your `beforeEach` should look something like this:

    ```typescript
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TodoItemComponent],
        }).compileComponents();
    });
    ```

    This will save us some madness later on when we we're testing the inputs.

3. One more thing to modify. This is optional, but to save us a little work later on, we're going to tell Angular to auto-detect changes to the DOM. This is a feature that Angular provides to help us test our components. If we don't tell Angular to detect changes, we'd have to do it manually, or it won't be able to update the DOM and we'll get an error. Modify the `import` of `@angular/core/testing` to also import `ComponentFixtureAutoDetect`. Then register a provider for `ComponentFixtureAutoDetect` in the `beforeEach` callback. Your `beforeEach` should now look something like this:

    ```typescript
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TodoItemComponent],
            providers: [
                {
                    provide: ComponentFixtureAutoDetect,
                    useValue: true,
                },
            ],
        }).compileComponents();
    });
    ```

**Now we're ready to start writing tests!**

We're going to start with a test that checks the default states of our component. Remember, we created two properties for our Todo interface, `text` and `completed`. Let's start by making sure that new components have the correct default values.

1. Create a new test called 'should set default states'.
2. Expect our component's `text` property to be an empty string.
3. Expect our component's `completed` property to be `false`.

    You should have a test that looks like this:

    ```typescript
    it("should set default states", () => {
        expect(component.completed).toBe(false);
        expect(component.text).toBe("");
    });
    ```

As expected, we have failing tests (we don't get things for free after all). There are a few things we'll have to do to make this test pass.

### Defining The Todo-Item Component

1. Open the `src/app/todo-item/todo-item.component.ts` file.
2. You'll notice that our component is implementing `OnInit`. For our purposes, we don't need this, so let's remove a few things.

    1. Remove the `OnInit` import.
    2. Remove the `implements OnInit` from the class.
    3. Remove the `ngOnInit` method.

    Now we have a clean component for us to work with.

3. We need to add our properties, `completed` and `text`. However, we don't need just any kind of property, we specifically need to tell our component that these properties are "inputs". This allows Angular to bind values from the app to our components (you'll see it in action shortly).

    1. Import the module `Input` from the `@angular/core` module.
    2. Use the `@Input()` decorator to define the `completed` and `text` properties at the top of the class.

    You should have properties that look like this:

    ```typescript
    @Input() completed: boolean = false;
    @Input() text: string = '';
    ```

Checking our tests once again, we see that everything is passing.

[Insert mini-celebration here]

While we're here, let's go ahead and add some HTMl elements to our component so we can see what's going on.

1. Open up the `src/app/todo-item/todo-item.component.html` and erase it's contents.
2. Add the following HTML to the file:

    ```html
    <div class="todo-item" [class.completed]="completed">
        <input type="checkbox" [(ngModel)]="completed" />
        <p contenteditable="true" spellcheck="false">{{ text }}</p>
    </div>
    ```

    Let's evaluate what we did here.

    1. We told Angular to bind the class `completed` to the `completed` property.
    2. We added an input that has a type of `checkbox` and a `(ngModel)` binding to the `completed` property.
    3. We added a `<p>` element that has a `contenteditable` and `spellcheck` attribute, and also uses Angular's interpolation (double squiggly brackets) to bind the `text` value to the `<p>` element. This will allow us to both see the text of the todo, and change it's value if we need to.

Now that our Todo Item component is ready, let's hook it up in our App Component.

1. Open up the `src/app/app.component.html` file and modify the `<todo>` element. Bind the `completed` and `text` properties to the `completed` and `text` values of the repeated todo list. It should look something like this:

    ```html
    <todo-item
        *ngFor="let todo of todos; index as i"
        [completed]="todo.completed"
        [text]="todo.text"
    >
    </todo-item>
    ```

2. Give it a whirl! Try adding a todo and see the magic happen. Test out modifying the todo and marking it as completed.

### Deleting Todo Items

Remember all that logic we created earlier to test deleting todos? Well, now it's time to make that magic happen!

The logic to delete Todos exists in the app component where we've stored our array of todos. So we need to make each todo component able to tell the app component to delete itself. To do this we're going to use an event emitter. But we're also going to take this opportunity to explore the concepts of Spys.

> **Spys**: In short, a spy allows us to inspect how properties or functions are used and called. You can use a spy to test that a function is called, and that it is called with the correct arguments.

Let's use a spy to make sure that our Todo component's `delete` method is called when we click the delete button.

> Note: This test is for the purpose of showing how spy's work, we normally would NOT make this kind of test because what we're testing is the communication between the view and component, something that Angular handles and already has tests for. Rule of thumb, don't test what frameworks or libraries do and already have tested, focus on your own code.

1. Open the file `src/app/todo-item/todo-item.component.spec.ts`.
2. Add a new test at the bottom of the suite called `should trigger delete when clicked`.
3. Use the syntax `jest.spyOn(<object>, <property>)` to create a spy on the `delete` method of the `TodoItemComponent`.
4. Get the compiled DOM element of the component and find the delete button.
5. Use the `click` method on the button to trigger the event.
6. Use the `expect` method to make sure the `delete` method was called.

Your test should now look like this:

```typescript
it("should trigger delete when clicked", () => {
    jest.spyOn(component, "delete");
    const compiled = fixture.nativeElement as HTMLElement;

    const deleteButton = compiled.querySelector("button")!;

    deleteButton.click();

    expect(component.delete).toHaveBeenCalled();
});
```

This should be second nature by now, let's go and make our code fulfill our tests!

We're going to use the EventEmitter as previously mentioned. If you want to know more, check out Angular's documentation on EventEmitter. For now, simply imagine it as a function that we can call to trigger an event which the parent component can listen for.

1. Open the `src/app/todo-item/todo-item.component.ts` file.
2. Import the `EventEmitter` and `Output` from the `@angular/core` module.
3. Use the `@Output()` decorator to define a new EventEmitter called `deleted`.
4. Add a new method called `delete` to the class.
5. Use the `deleted` EventEmitter to emit an event of `true`.

Your class should now look like this:

```typescript
export class TodoItemComponent {
    @Input() completed: boolean = false;
    @Input() text: string = "";
    @Output() deleted: EventEmitter<any> = new EventEmitter();

    public delete(): void {
        this.deleted.emit(true);
    }
}
```

Now let's add the delete button to the view to call the `delete` function.

1. Open the `src/app/todo-item/todo-item.component.html` file.
2. Under the `<p>` tag add a new button that calls the `delete` method when clicked.

Your view should now look like this:

```html
<div class="todo-item" [class.completed]="completed">
    <input type="checkbox" [(ngModel)]="completed" />
    <p contenteditable="true" spellcheck="false">{{ text }}</p>
    <button (click)="delete()">X</button>
</div>
```

And lastly, let's tell our app component to delete the todo item when the delete button is clicked.

1. Open the `src/app/app.component.html` file.
2. Modify the `<todo-item>` component to listen to the `deleted` event and call our `deleteTodo` function, passing in the index of our todo item.

Your `<todo-item>` should now look like this:

```html
<todo-item
    *ngFor="let todo of todos; index as i"
    [completed]="todo.completed"
    [text]="todo.text"
    (deleted)="deleteTodo(i)"
>
</todo-item>
```

## Celebrate

You have now used TDD to write a simple todo app. Congratulations! Take a moment to look back at the majesty of what you've just created.

1. You used Test Driven Development to create an entire app!
2. You used Jest to write tests for your components!
3. You created components and ensured they were all tested!
4. You have 100% test coverage for all the things you created!
5. You didn't die a horrible death doing it all!

Congratulations, you. Keep being awesome. :thumbsup:
