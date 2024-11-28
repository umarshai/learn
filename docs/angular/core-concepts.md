## About angular
!!! note
    ### What is Angular?
    Angular is a TypeScript-based open-source web application framework developed by Google. It is used to build single-page applications (SPA) with features like data binding, dependency injection, and a component-based architecture.
    - **Component-Based Architecture**: UI is built using reusable components.
    - **Two-Way Data Binding**: Synchronizes data between model and view.
    - **Dependency Injection**: Provides services to components or other services.
    - **Directives**: Extend HTML with custom attributes and behavior.
    - **RxJS**: Handles asynchronous data streams.
    - **Routing**: Provides navigation between views or components.

---

!!! note "Angular Application Workflow from `index.html`"

    1. **`index.html` - The Entry Point**  
       - The `index.html` file is the **single HTML file** that serves as the entry point for the Angular application.  
       - It typically contains a minimal structure with the following key elements:
         ```html
         <!doctype html>
         <html lang="en">
         <head>
           <meta charset="utf-8">
           <title>AngularApp</title>
           <base href="/">
           <meta name="viewport" content="width=device-width, initial-scale=1">
           <link rel="icon" type="image/x-icon" href="favicon.ico">
         </head>
         <body>
           <app-root></app-root>
         </body>
         </html>
         ```
       
       - **Explanation**:
         - **`<base href="/">`**: Ensures the application uses relative paths correctly for routing.
         - **`<app-root>`**: This is the root component’s selector, where the Angular application is rendered.

    2. **Bootstrapping the Application**  
       - Angular starts by bootstrapping the application using the `main.ts` file.
       - The **bootstrapping process**:
         - Loads `AppModule` (the root module).
         - Instantiates the root component (`AppComponent`).
         - Replaces the `<app-root>` tag in `index.html` with the rendered template of `AppComponent`.

    3. **`main.ts` - Starting the App**  
       - The `main.ts` file is the **starting point** of the Angular application.
       - It calls the **`platformBrowserDynamic().bootstrapModule(AppModule)`** method to start the app.

    4. **`AppModule` - Root Module**  
       - `AppModule` is the **root module** that declares and bootstraps the root component (`AppComponent`).
       - It imports necessary Angular modules (like `BrowserModule`, `AppRoutingModule`) and registers services.

    5. **`AppComponent` - Root Component**  
       - The `AppComponent` is the **first component** loaded and displayed in the browser.
       - It defines the root template, which may contain other components, directives, and services.

    6. **Component Rendering**  
       - Angular replaces the `<app-root>` element in `index.html` with the rendered content of `AppComponent`.
       - Any child components declared in the template of `AppComponent` are also rendered.

    7. **Data Binding and Directives**  
       - Angular synchronizes data between the component class and the view using:
         - **Interpolation** (`{{ }}`) for displaying data.
         - **Property Binding** (`[property]`) to bind data to DOM properties.
         - **Event Binding** (`(event)`) to handle user interactions.

    8. **Routing**  
       - If the app has multiple pages, the **Angular Router** handles navigation between components.
       - The `AppRoutingModule` defines the routes and dynamically loads the components based on the URL.

    9. **Reactive Programming with RxJS**  
       - Angular uses **RxJS** for handling asynchronous events like HTTP requests or user interactions.

    10. **Change Detection**  
        - Angular’s change detection mechanism updates the UI whenever the component state changes.

    11. **Compilation and Rendering**  
        - Angular compiles templates and components into JavaScript code:
          - **Just-In-Time (JIT)**: Compiles during runtime (development mode).
          - **Ahead-of-Time (AOT)**: Compiles during build time (production mode).
    
    // diff btn  v1 & v2+


### Difference Between Angular and AngularJS

| **Feature**       | **Angular**                     | **AngularJS**                   |
|-------------------|---------------------------------|---------------------------------|
| Language          | TypeScript                     | JavaScript                     |
| Architecture      | Component-based                | Controller-based (MVC)         |
| Data Binding      | Two-way with `[(ngModel)]`     | Two-way with `ng-model`        |
| Mobile Support    | Native mobile support (Ionic)  | No direct mobile support       |
| Performance       | Faster                         | Slower (due to digest cycle)   |

---
### JS and TS
!!! note "Key Differences Between JS and TS"

| **Feature**                | **JavaScript (JS)**                                 | **TypeScript (TS)**                               |
|----------------------------|-----------------------------------------------------|--------------------------------------------------|
| **Definition**              | A dynamic, interpreted programming language used primarily for building web applications. | A superset of JavaScript that adds static typing and other features for better development. |
| **Typing**                  | Dynamically typed, meaning variables can change types during runtime. | Statically typed, meaning variable types are defined during compile time and cannot change. |
| **Compilation**             | Interpreted directly by the browser or Node.js.      | Compiled to JavaScript before execution, ensuring type-checking at compile time. |
| **Type Annotations**        | No type annotations, the type of a variable is inferred at runtime. | Supports type annotations (e.g., `let x: number = 10;`). |
| **Error Handling**          | Errors are typically caught at runtime.              | Errors can be caught at compile time due to static type checking. |
| **Features**                | Basic features such as functions, objects, and arrays. | Includes advanced features like interfaces, enums, generics, and type aliases. |
| **Support for Classes**     | JavaScript ES6 introduced classes but with no strong typing or interface support. | TypeScript extends JavaScript classes with strict type checks and support for interfaces. |
| **Tooling and IDE Support** | Limited tooling for error detection and code completion. | Offers better tooling with IDEs providing autocompletion, refactoring, and static type checking. |
| **Compatibility**           | Supported natively in all modern browsers and Node.js environments. | TypeScript code needs to be transpiled into JavaScript to run in browsers or Node.js. |
| **Development Speed**       | Faster to start and more flexible, but can lead to runtime errors. | Slower to start due to strict type definitions but offers better maintainability and fewer runtime errors. |

### polyfills & transpiler
!!! note 
     Polyfills
    Polyfills are the code that makes the application compatible with different browsers.  
    - **Purpose**: ES6 code is not compatible with some older browsers like **Internet Explorer (IE)** or certain versions of **Firefox**.  
    - **Solution**: Polyfills provide the necessary environment setup to enable the application to run in these browsers.

    ---

     Transpiler
    - **Definition**: Transpiling is the process of transforming source code from one programming language to another.  
    - **In Angular**: The **TypeScript** code used for development is transpiled to **JavaScript**, which can be executed in the browser.

    ---

     Webpack
    - **Definition**: Webpack is a **module bundler** that packages application source code into convenient chunks.  
    - **Purpose**: It helps load the code from the server to the browser efficiently, optimizing performance and resource management.

    ---

    ### Common Angular CLI Commands

    | **Command**                     | **Description**                                  |
    |----------------------------------|--------------------------------------------------|
    | `npm install -g @angular/cli`    | Installs Angular CLI globally on your machine.   |
    | `npm install bootstrap`          | Installs Bootstrap for UI styling.               |
    | `ng serve`                       | Serves the application locally on a development server. |
    | `ng g c componentName`           | Generates a new component with the specified name. |
    | `ng g d directiveName`           | Generates a new directive with the specified name. |
    | `ng g s serviceName`             | Generates a new service with the specified name. |
    | `ng g m moduleName`              | Generates a new module with the specified name.  |

    
### Angular Compilation and Rendering

!!! note "How Angular Application Works with JIT and AOT Compilation"

    Angular applications consist of components and templates that the browser does not understand directly. Therefore, they need to be **compiled** before running inside the browser.

     Just-In-Time (JIT) Compilation
    - In **JIT Compilation**, the application is compiled inside the browser during **runtime**.
    - **Workflow**:
      - Development → Production → App downloaded in Browser → Angular compiles templates to JavaScript (JS).
    - Suitable for **development** environments as it allows quick testing and debugging.

     Ivy: Angular's Compilation and Rendering Engine
    - **Ivy** is the code name for Angular's compilation and rendering pipeline.
    - Starting from **Angular 9**, applications are **Ivy-compiled** by default.
    - Ivy improves the performance and reduces the bundle size of Angular applications.

     Ahead-of-Time (AOT) Compilation
    - In **AOT Compilation**, the application is compiled during **build time** before being served to the browser.
    - **Workflow**:
      - Development → Angular compiles templates to JavaScript during build time → Production.
    - Suitable for **production** environments as it provides faster rendering and better performance.

     Benefits of AOT Compilation
    - The application is compiled **before running** inside the browser, allowing the browser to:
      - **Load executable code** and render the app immediately.
      - Avoid the need for extra HTML files since the **HTML and templates are embedded** into the JavaScript files.
    - This approach provides **better security** by minimizing the risk of malicious template injections.

    
### View Encapsulation
!!! note
    - encapasulation: viewEncapsulation.Emulated :default behaviour where the styles apply only to its own
    - encapasulation: viewEncapsulation.none : will apply globally
    - encapasulation: viewEncapsulation.ShadowDom: Angular uses the browser's built-in Shadow DOM API to enclose the    component's view inside a ShadowRoot, used as the component's host element, and apply the provided styles in an isolated manner. Not all browsers support it, which is why the ViewEncapsulation.Emulated is the recommended and default mode. 
### Angular app Optimization
!!! note
    - Use Lazy Loading for feature modules.
    - Use Ahead-of-Time (AOT) Compilation.
    - Use TrackBy in `*ngFor` for efficient DOM updates.
    - Use Pure Pipes instead of methods in templates.
    - Unsubscribe from Observables to prevent memory leaks.
    - Use OnPush Change Detection Strategy for immutable data.   
## Lifecycle hooks

| **Lifecycle Hook** | **Description** | **Method Signature** | **Real-World Scenario** |
|--------------------|-----------------|-----------------------|--------------------------|
| **ngOnChanges**    | Called when an input property changes. | `ngOnChanges(changes: SimpleChanges)` | Used to react to changes in input properties, such as updating a child component when a parent component's data changes. |
| **ngOnInit**       | Called once after the first `ngOnChanges`. Used to initialize component data. | `ngOnInit()` | Ideal for fetching data from APIs when a component loads for the first time. Example: Load user data when a profile page is opened. |
| **ngDoCheck**      | Called during every change detection run, allowing custom change detection logic. | `ngDoCheck()` | Useful for manually detecting changes in deeply nested or immutable objects. Example: Track changes in a complex form object. |
| **ngAfterContentInit** | Called once after content projection (`<ng-content>`) has been initialized. | `ngAfterContentInit()` | Used to perform actions after projected content is fully initialized. Example: Logging or manipulating projected content in a modal component. |
| **ngAfterContentChecked** | Called after every change detection run for projected content. | `ngAfterContentChecked()` | Ensures the projected content is up to date. Example: Validate form content projected from a parent component. |
| **ngAfterViewInit** | Called once after the component's view and child views have been initialized. | `ngAfterViewInit()` | Useful for DOM manipulation or initializing third-party libraries. Example: Initializing a chart library after the DOM is ready. |
| **ngAfterViewChecked** | Called after every change detection run for the component's view and child views. | `ngAfterViewChecked()` | Used to check the component’s view for changes. Example: Updating UI elements like tooltips after every change detection cycle. |
| **ngOnDestroy**    | Called once before the component is destroyed. Used for cleanup logic. | `ngOnDestroy()` | Ideal for unsubscribing from observables or detaching event handlers to prevent memory leaks. Example: Unsubscribe from a WebSocket connection when leaving a chat page. |

### Change Detection in Angular

!!! note "What is Change Detection in Angular?"
    **Change Detection** is the mechanism in Angular that keeps the **data model** and the **view (UI)** in sync. It ensures that changes in the application’s state are automatically reflected in the DOM (Document Object Model), and vice versa.

---

 Key Concepts of Change Detection

| **Concept**         | **Description**                                                                                           |
|---------------------|-----------------------------------------------------------------------------------------------------------|
| **Purpose**         | Ensures that changes in the component’s data model are reflected in the view.                              |
| **How it Works**    | Angular monitors component state and compares it to the previous state. If a change is detected, the DOM is updated. |
| **Triggering Mechanisms** | Change detection is triggered by events such as user input, HTTP responses, or timer events.           |
| **Zones**           | Angular uses **Zones** to intercept asynchronous operations like `setTimeout`, promises, and event listeners to trigger change detection automatically. |
| **Change Detection Strategies** | Angular provides two strategies: **Default** and **OnPush**.                                     |

---

 Change Detection Strategies

| **Strategy**         | **Description**                                                                                           | **Use Case**                          |
|----------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------|
| **Default**          | Checks the entire component tree for changes.                                                             | Suitable for applications with frequent or unpredictable data changes. |
| **OnPush**           | Checks only when input properties of the component change or when an event is triggered.                   | Suitable for performance optimization in large applications where data changes are predictable. |

---

 Real-World Scenario for Change Detection

- **E-Commerce Application**:  
  In a shopping cart component, when a user adds or removes items, the change detection mechanism updates the total price and item list in real-time without needing a page refresh.

- **Chat Application**:  
  Incoming messages from a WebSocket connection are displayed immediately in the chat window using change detection to update the UI.

---



1. **What is Change Detection in Angular?**  
   It is the process by which Angular updates the DOM whenever there is a change in the component's state.

2. **How does Angular detect changes?**  
   Angular uses a **digest cycle** where it compares the current state of the component with its previous state to detect changes.

3. **What is the difference between Default and OnPush strategies?**  
   - **Default**: Checks the entire component tree.  
   - **OnPush**: Checks only when the input properties change or an event occurs, improving performance.

4. **When would you use OnPush strategy?**  
   Use **OnPush** for components with **immutable data** or when optimizing performance in applications with large data sets.

    * What is NgZone?
NgZone helps Angular manage change detection by running tasks outside of Angular’s zone and triggering change detection when necessary.



## Modules, components, services  (view-encapsu, inehitance compo)
    # Components, Modules, and Services in Angular

!!! note "Overview of Components, Modules, and Services in Angular"
    Angular applications are built using **components**, organized into **modules**, and powered by **services** for business logic and data sharing.

---

## Components

| **Feature**            | **Description**                                                                                  |
|------------------------|--------------------------------------------------------------------------------------------------|
| **Definition**          | A component controls a section of the user interface (UI). It defines the **view** and **logic** for that part of the screen. |
| **Structure**           | A component consists of three main parts:                                                        |
|                        | - **Template (HTML)**: Defines the UI layout and appearance.                                     |
|                        | - **Class (TypeScript)**: Contains the logic and data-binding for the template.                   |
|                        | - **Styles (CSS/SCSS)**: Defines the component-specific styling.                                 |
| **Selector**            | The custom HTML tag that represents the component in a template (e.g., `<app-header>`).          |
| **Real-World Scenario** | A **HeaderComponent** that contains the navigation menu and logo for a web application.          |

---

## Modules

| **Feature**            | **Description**                                                                                  |
|------------------------|--------------------------------------------------------------------------------------------------|
| **Definition**          | A module is a container for a cohesive block of functionality within an Angular app.             |
| **Root Module**         | Every Angular app has at least one root module (`AppModule`), which bootstraps the application.  |
| **Feature Modules**     | Used to organize and encapsulate related components, services, and pipes (e.g., `UserModule`, `ProductModule`). |
| **NgModule Decorator**  | Declares the components, directives, and pipes that belong to the module and imports other required modules. |
| **Real-World Scenario** | A **UserModule** that contains all user-related components (e.g., user profile, user settings).   |

---

## Services

| **Feature**            | **Description**                                                                                  |
|------------------------|--------------------------------------------------------------------------------------------------|
| **Definition**          | A service is a class that contains business logic, reusable functions, and data retrieval methods. |
| **Dependency Injection**| Services are injected into components or other services using Angular’s **Dependency Injection (DI)** system. |
| **Scope**               | Services can be application-wide (provided in `AppModule`) or module-specific.                  |
| **Real-World Scenario** | A **ProductService** that fetches product data from an API and provides it to various components (e.g., ProductList, ProductDetails). |

---

## Summary

- **Components**: Define the UI and logic for a specific part of the application.
- **Modules**: Organize the application into cohesive blocks of functionality.
- **Services**: Handle business logic and data sharing, and can be injected into components or other services.

## Data Binding

!!! note "Overview of Data Binding in Angular"
    **Data Binding** in Angular is the mechanism that allows communication between the **component's TypeScript code** and the **template (HTML)**. It keeps the **data model** and the **view** in sync, enabling dynamic and interactive user interfaces.

---

## Types of Data Binding in Angular

| **Type**                | **Syntax**               | **Description**                                                                                   | **Real-World Scenario**                                                                                     |
|-------------------------|--------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Interpolation**       | `{{ expression }}`       | Displays data from the component class in the template by evaluating an expression.               | Displaying a user's name dynamically on the UI: `{{ user.name }}`.                                           |
| **Property Binding**    | `[property]="expression"` | Binds a component property to an HTML element property.                                           | Dynamically setting the `src` attribute of an image: `<img [src]="imageUrl">`.                               |
| **Event Binding**       | `(event)="handler"`       | Binds an HTML event to a method in the component class.                                           | Handling button clicks: `<button (click)="onSubmit()">Submit</button>`.                                      |
| **Two-Way Binding**     | `[(ngModel)]="property"`  | Combines property binding and event binding to bind data both ways between the view and the model. | Synchronizing a form input with a variable: `<input [(ngModel)]="username">`.                                |

---

## Detailed Explanation of Data Binding Types

### 1. **Interpolation**
- **Definition**: Used to display component data in the template.  
- **Syntax**: `{{ expression }}`  
- **Example**: Displaying a dynamic greeting message like `Hello, {{ user.name }}!`.  
- **Use Case**: Display static or dynamic data in the UI.

---

### 2. **Property Binding**
- **Definition**: Binds a property in the component to a DOM property in the template.  
- **Syntax**: `[property]="expression"`  
- **Example**: `<input [value]="user.name">` binds the input field's value to `user.name`.  
- **Use Case**: Dynamically change element attributes, such as `src`, `disabled`, `hidden`, or `class`.

---

### 3. **Event Binding**
- **Definition**: Binds an event emitted by a DOM element to a method in the component.  
- **Syntax**: `(event)="handler"`  
- **Example**: `<button (click)="submitForm()">Submit</button>` calls the `submitForm()` method when the button is clicked.  
- **Use Case**: Handle user interactions like clicks, keypresses, or form submissions.

---

### 4. **Two-Way Data Binding**
- **Definition**: Combines property binding and event binding to create a synchronized connection between the view and the model.  
- **Syntax**: `[(ngModel)]="property"`  
- **Example**: `<input [(ngModel)]="user.name">` updates `user.name` whenever the input value changes and vice versa.  
- **Use Case**: Create dynamic forms where input values need to be reflected in real-time in the model.

---

## Summary

- **Interpolation**: For displaying dynamic data in the template.
- **Property Binding**: For dynamically binding DOM properties to component properties.
- **Event Binding**: For handling user interactions.
- **Two-Way Binding**: For synchronizing data between the component and the view in real-time.

!!! tip "Best Practice"
    Use **One-Way Data Binding** (Interpolation, Property Binding, Event Binding) when possible for better performance, and reserve **Two-Way Binding** for forms and inputs where real-time synchronization is required.

## Directives 


!!! note "Overview of Directives in Angular"
    **Directives** are special instructions in Angular that enhance the functionality of HTML elements. They help manipulate the DOM, control behavior, and apply dynamic styles or logic.

---

 Types of Directives

| **Type**               | **Description**                                                                                 | **Syntax Example**                  | **Real-World Scenario**                                                      |
|------------------------|-------------------------------------------------------------------------------------------------|-------------------------------------|------------------------------------------------------------------------------|
| **Component Directive** | A directive with a template, logic, and styles that defines a UI block.                         | `<app-header></app-header>`         | A **HeaderComponent** used for displaying a site’s header across pages.      |
| **Structural Directive** | Changes the structure of the DOM by adding or removing elements.                               | `*ngIf`, `*ngFor`, `*ngSwitch`      | Display a list of items dynamically using `*ngFor`.                          |
| **Attribute Directive** | Changes the appearance or behavior of an existing element without altering its structure.       | `[ngClass]`, `[ngStyle]`            | Highlight an element conditionally using `[ngClass]="{'active': isActive}"`. |

---

 Built-in Directives

| **Directive**           | **Type**          | **Description**                                                                                   | **Real-World Scenario**                                                                                     |
|-------------------------|-------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `*ngIf`                 | Structural        | Conditionally includes or excludes a template based on a boolean expression.                      | Display a "Loading..." message while waiting for data to load.                                              |
| `*ngFor`                | Structural        | Repeats a template for each item in a collection.                                                 | Render a list of products in an e-commerce application.                                                     |
| `[ngClass]`             | Attribute         | Dynamically adds or removes CSS classes.                                                          | Highlight a selected menu item based on user interaction.                                                   |
| `[ngStyle]`             | Attribute         | Dynamically applies inline styles.                                                                | Change the color of a warning message based on its severity level.                                          |

---

## Custom Directives

 What is a Custom Directive?
A **Custom Directive** is a user-defined directive that extends the functionality of Angular’s built-in directives or adds new behaviors to the DOM.

 Steps to Create a Custom Directive
1. Generate a directive using Angular CLI:  
   `ng generate directive directiveName`
2. Define the directive logic inside the TypeScript class.
3. Use the directive in a template by applying it to an element.

---

 Example of a Custom Directive

| **Feature**            | **Description**                                                                                  | **Real-World Scenario**                                                                                     |
|------------------------|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| **HighlightDirective** | A custom directive that changes the background color of an element when the user hovers over it.  | **Scenario**: Highlighting table rows in a data grid when the user hovers over them.                         |
| **FocusDirective**     | A custom directive that automatically focuses an input field when the page loads.                 | **Scenario**: Automatically focusing the username field on a login form.                                     |

---

### Example: **HighlightDirective**

| **Feature**             | **Description**                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------|
| **Directive Logic**      | Listens for mouse events (`mouseenter`, `mouseleave`) and changes the background color accordingly. |
| **Usage**               | `<p appHighlight>Hover over this text to see the highlight effect.</p>`                         |

---

 Summary

- **Component Directives** define UI blocks with a template, logic, and styles.
- **Structural Directives** manipulate the DOM structure by adding or removing elements (`*ngIf`, `*ngFor`).
- **Attribute Directives** modify the behavior or appearance of an element (`[ngClass]`, `[ngStyle]`).
- **Custom Directives** add new behavior to elements, enhancing user interaction or automating tasks.

!!! tip "Best Practice"
    Use **Custom Directives** to encapsulate reusable behavior that can be applied across multiple components, ensuring a clean and modular codebase.

Passing Data to Directives in Angular

!!! note "Overview"
    In Angular, you can pass data to a **custom directive** using **input properties**. This allows the directive to receive dynamic data from the parent component and perform actions based on that data.

---

 Steps to Pass Data to a Custom Directive

1. **Create a Custom Directive**.
2. **Use the `@Input` decorator** to define input properties in the directive.
3. **Pass data from the parent component** through the directive’s selector.

---

Example Scenario: Passing Data to a Custom Highlight Directive

 Use Case
We want to create a **HighlightDirective** that changes the background color of a paragraph based on the color value passed from the parent component.

 Step-by-Step Explanation

| **Step**                | **Description**                                                                                  | **Example Syntax**                                                                           |
|-------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| **1. Define Input Property** | Use the `@Input` decorator in the directive to declare a property that will accept data.      | `@Input() appHighlightColor: string = '';`                                                  |
| **2. Apply Directive in Template** | Use the directive in a template and pass the color value as an attribute.                | `<p [appHighlightColor]="'yellow'">Highlighted Text</p>`                                     |
| **3. Use Input Value in Directive Logic** | Use the input property to set the background color or apply logic.                    | `this.el.nativeElement.style.backgroundColor = this.appHighlightColor;`                      |

---

 Code Example

 Directive Class (HighlightDirective)

```typescript
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightColor]'
})
export class HighlightDirective implements OnInit {
  @Input() appHighlightColor: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.appHighlightColor;
  }
}

export class AppComponent {
  dynamicColor: string = 'lightgreen';
}
Summary
Use the @Input decorator to pass data into a custom directive.
Bind the directive property to a dynamic value or a static value in the template.
This approach allows directives to be flexible and reusable across different components.
## ng-template, ng-content
```

## Angular Singleton Service

A **Singleton Service** in Angular is a service that exists as a single instance throughout the lifecycle of an application. This ensures that the same instance of the service is shared across the entire app, providing a centralized way to manage data, logic, or shared state.

---

 Key Features of Singleton Services

1. **Single Instance**: Only one instance of the service is created and shared across all components.
2. **State Sharing**: Useful for sharing data or state between different parts of the application.
3. **Efficient Resource Usage**: Reduces overhead by avoiding the creation of multiple instances.

---

 Creating a Singleton Service

To make a service a singleton, it should be provided at the **root level**.

 Example

 Step 1: Generate a Service
Use the Angular CLI to generate a service:
```bash
ng generate service my-service
