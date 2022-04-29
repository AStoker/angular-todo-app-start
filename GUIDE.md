# Create A Todo App With Test Driven Development

In this tutorial we will be creating a Todo app with test driven development (also known as TDD).

## Prerequisites

You **need** to have a few things installed before you can start this tutorial.

### Required Tools

-   t [Node.js](https://nodejs.org/en/), version **16.14.2** or higher
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

### Writing the Test

1. We'll start by creating a new test suite to describe everyting around creating and adding todos.

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

### Implementing the Code

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
    newTodo(text: string) {
        this.todos.push({
            text,
            completed: false,
        });
    }
    ```

    - You can see that whenever we add a new Todo we're giving it a `text` property and a completed property that defaults to `false`.

You'll notice now that our tests are all passing. Great work!

### Writing The Rest Of The Tests

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

### Implementing the rest of the Code

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

That should be all the tests that handle creating Todos. Go ahead and give the app a try! If you left the `ng serve --open` task running, then you should still see the app running in your browser. Type in a value in the input and then hit enter. You'll see that the entry is cleared out, just like we asserted. You'll also see a pretty little unstyled Todo item.
