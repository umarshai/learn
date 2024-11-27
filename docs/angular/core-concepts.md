# Core concepts
## About angular
    // about
    // architecture
    // diff btn  v1 & v2+
    // diff btn js & ts
    //polyfills & transpiler
    // compiler
## Lifecycle hooks
## Modules, components, services  (view-encapsu, inehitance compo)
## Data Binding
## Directives 
## ng-template, ng-content


# Angular Singleton Service

A **Singleton Service** in Angular is a service that exists as a single instance throughout the lifecycle of an application. This ensures that the same instance of the service is shared across the entire app, providing a centralized way to manage data, logic, or shared state.

---

## Key Features of Singleton Services

1. **Single Instance**: Only one instance of the service is created and shared across all components.
2. **State Sharing**: Useful for sharing data or state between different parts of the application.
3. **Efficient Resource Usage**: Reduces overhead by avoiding the creation of multiple instances.

---

## Creating a Singleton Service

To make a service a singleton, it should be provided at the **root level**.

### Example

### Step 1: Generate a Service
Use the Angular CLI to generate a service:
```bash
ng generate service my-service
