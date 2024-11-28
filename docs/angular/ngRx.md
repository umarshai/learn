# ngRx in Angular - Interview Questions and Answers

!!! note "Overview"
    ngRx is a reactive state management library for Angular, inspired by Redux. It provides a predictable state container that helps in managing the application's state in a more maintainable and testable way. It uses **Observables** to manage the state, and provides a mechanism to handle **actions**, **reducers**, and **effects** to implement side effects.

---

## What is ngRx?

!!! note "Answer"
    ngRx is a library for managing state in Angular applications. It allows developers to manage the application state in a **centralized store** using a **unidirectional data flow**. This pattern makes the application state predictable, manageable, and testable.

    ngRx is based on the principles of **Redux** and uses **RxJS** for reactive programming.

---

### Key Concepts in ngRx

1. **Store**:  
   The centralized place where the application's state is stored. It holds the data for the entire app in one global object.

2. **Actions**:  
   Actions are dispatched to change the state. Each action has a type and can optionally carry a payload (additional data).

3. **Reducers**:  
   Reducers are pure functions that determine how the state changes based on the dispatched action.

4. **Effects**:  
   Effects handle side effects in ngRx, like API calls or asynchronous operations. They listen for actions and dispatch new actions based on results.

5. **Selectors**:  
   Selectors are functions used to retrieve specific pieces of data from the store.

---

## ngRx Flow

1. **Action** is dispatched (e.g., button click or form submission).
2. **Reducer** handles the action and updates the store's state.
3. **Effect** listens for specific actions to perform side effects like HTTP requests.
4. **Selector** is used to retrieve data from the store.

---

## Example of Using ngRx

### 1. **Define Actions**:

```typescript
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User API] Load Users');
export const loadUsersSuccess = createAction('[User API] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User API] Load Users Failure', props<{ error: any }>());
```

# ngRx in Angular - Interview Questions and Answers

---

## Define Reducers

!!! note "Reducer Example"
    In ngRx, reducers are pure functions that define how the application's state changes in response to actions. Below is an example of how to define a reducer:

    ```typescript
    import { createReducer, on } from '@ngrx/store';
    import { loadUsersSuccess, loadUsersFailure } from './user.actions';

    export interface UserState {
      users: User[];
      error: string;
    }

    export const initialState: UserState = {
      users: [],
      error: '',
    };

    export const userReducer = createReducer(
      initialState,
      on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
      on(loadUsersFailure, (state, { error }) => ({ ...state, error }))
    );
    ```

## Define Effects

!!! note "Effects Example"
    Effects are used to handle side effects in ngRx, such as making HTTP requests. Below is an example of how to define an effect for loading users:

    ```typescript
    import { Injectable } from '@angular/core';
    import { Actions, ofType } from '@ngrx/effects';
    import { Observable, of } from 'rxjs';
    import { catchError, map, switchMap } from 'rxjs/operators';
    import { UserService } from './user.service';
    import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';

    @Injectable()
    export class UserEffects {
      loadUsers$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadUsers),
          switchMap(() =>
            this.userService.getUsers().pipe(
              map((users) => loadUsersSuccess({ users })),
              catchError((error) => of(loadUsersFailure({ error })))
            )
          )
        )
      );

      constructor(private actions$: Actions, private userService: UserService) {}
    }
    ```

## Selectors

!!! note "Selectors Example"
    Selectors are functions used to retrieve specific pieces of state from the store. Here's an example of how to define selectors for the user state:

    ```typescript
    import { createSelector } from '@ngrx/store';

    export const selectUserState = (state) => state.users;

    export const selectAllUsers = createSelector(selectUserState, (state) => state.users);
    ```

## Common Interview Questions on ngRx

1. **What is ngRx and how does it work?**

    !!! note "Answer"
        ngRx is a state management library for Angular based on Redux and RxJS. It works by maintaining a centralized store where the application’s state resides. Actions are dispatched to modify the state, and reducers process these actions to update the store. Effects handle side effects like HTTP requests or navigation, and selectors are used to retrieve specific pieces of data from the store.

2. **What are the main parts of ngRx?**

    !!! note "Answer"
        The key parts of ngRx are:

        - **Store**: Holds the application state.
        - **Actions**: Describe state changes.
        - **Reducers**: Pure functions that update the state based on actions.
        - **Effects**: Handle side effects (e.g., HTTP calls).
        - **Selectors**: Retrieve pieces of the state.

3. **Explain the role of reducers in ngRx.**

    !!! note "Answer"
        Reducers in ngRx are pure functions that determine how the state changes in response to actions. They take the current state and the action being dispatched, and return a new state object based on the action’s type and payload.

4. **How do you handle side effects in ngRx?**

    !!! note "Answer"
        Side effects, like API calls or navigation, are handled by Effects in ngRx. Effects listen for actions and perform side effects when those actions are dispatched. After completing the side effect, effects can dispatch new actions based on the result (e.g., success or failure).

5. **What is the purpose of selectors in ngRx?**

    !!! note "Answer"
        Selectors are functions used to query the store and retrieve slices of state. They allow components to access specific pieces of data in the store, and are efficient because they can memoize values to avoid unnecessary recalculations.

6. **What is the difference between Store and BehaviorSubject in Angular?**

    !!! note "Answer"
        - **Store**: ngRx Store is a centralized state management system that follows a unidirectional data flow, where actions trigger state changes, and the state is accessible globally. It's a more scalable solution for large applications.
        - **BehaviorSubject**: It is an RxJS class that acts like a subject but also stores the current value. While BehaviorSubject can hold a state, it doesn’t have the structure, consistency, or tools (like effects and actions) that ngRx Store offers for complex applications.

7. **How do you test ngRx reducers and effects?**

    !!! note "Answer"
        - **Testing Reducers**: Reducers are pure functions, so they can be easily tested by dispatching actions and checking the resulting state.

        **Example**:

        ```typescript
        it('should return new state on loadUsersSuccess action', () => {
          const action = loadUsersSuccess({ users: mockUsers });
          const newState = userReducer(initialState, action);
          expect(newState.users).toEqual(mockUsers);
        });
        ```

        - **Testing Effects**: ngRx effects can be tested using MockStore and Jasmine or Jest. You mock the services used in the effect and dispatch the action, checking if the correct actions are emitted.

        **Example**:

        ```typescript
        it('should load users on loadUsers action', () => {
          const action = loadUsers();
          const users = [{ name: 'John Doe' }];
          const successAction = loadUsersSuccess({ users });

          userService.getUsers.and.returnValue(of(users));

          actions$ = hot('-a', { a: action });
          const expected = cold('-b', { b: successAction });

          expect(effects.loadUsers$).toBeObservable(expected);
        });
        ```

## Real-World Scenario Using ngRx

| Scenario | Use Case | ngRx Usage |
|----------|----------|------------|
| Loading Data from API | Fetching data from an external API and managing the loading, success, and error states. | Actions, Reducers, Effects |
| Managing User Authentication | Storing the user's authentication status, user details, and permissions. | Store, Actions, Reducers |
| Handling Multi-step Form | Managing form state across multiple steps, storing intermediate values. | Store, Actions, Selectors |
| Tracking Shopping Cart | Managing a shopping cart with add/remove items and calculating totals. | Store, Actions, Selectors |

## Summary

!!! note "Summary"
    - ngRx is a state management library based on Redux and RxJS, designed to manage application state in Angular applications.
    - The key components are Store, Actions, Reducers, Effects, and Selectors.
    - It follows a unidirectional data flow to manage state changes and side effects in a predictable manner.
    - Effects manage asynchronous tasks like HTTP requests, while Reducers handle the actual state changes.
    - ngRx simplifies managing complex application states in large-scale Angular applications.

!!! tip "Best Practice"
    Use ngRx for managing complex state logic and asynchronous operations, especially in large applications where scalability and maintainability are crucial.
