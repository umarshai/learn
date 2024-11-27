# RxJS (Reactive Extensions for JavaScript)

RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

---

## Key Concepts in RxJS

ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.

The essential concepts in RxJS which solve async event management are:
!!! note
    * Observable: represents the idea of an invokable collection of future values or events.
    * Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
    * Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
    * Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
    * Subject: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
    * Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

---

## Observables
  * Observables are lazy Push collections of multiple values. 
  * What is Pull? In Pull systems, the Consumer determines when it receives data from the data Producer. The Producer itself  is unaware of when the data will be delivered to the Consumer.
  * What is Push? In Push systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data.

---
## Basic Example: Observable and Observer

```typescript
import { Observable } from 'rxjs';

// Create an Observable
const observable = new Observable((subscriber) => {
  subscriber.next('Hello');
  subscriber.next('RxJS');
  subscriber.complete();
});
// Create an Observer
* What is an Observer? An Observer is a consumer of values delivered by an Observable.
const observer = {
  next: (value: string) => console.log('Next:', value),
  error: (err: any) => console.error('Error:', err),
  complete: () => console.log('Completed!'),
};
// Subscribe to the Observable
observable.subscribe(observer);
```



## RxJS Operators and Real-Life Examples
!!! note
    * RxJS operators help manage and manipulate streams of data effectively. They are categorized based on their functionality. 
      Two types:
    * A Pipeable Operator is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified.
    * Creation Operators are the other kind of operator, which can be called as standalone functions to create a new Observable. For example: of(1, 2, 3) creates an observable that will emit 1, 2, and 3, one right after another. Creation operators will be discussed in more detail in a later section.
---

## Map
!!! note "Map" 
    * **Transforms the data emitted by an observable.**
    * **Scenario**:
    Transforming API Data
    You need to fetch a list of users from an API and display their full names.
    * **Use Case**:
    Converting raw API responses into a format suitable for the UI.

```typescript
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

this.http.get<{ name: string; age: number }[]>('/api/users').pipe(
  map(users => users.filter(user => user.age > 18))
).subscribe(console.log);
```
## filter
!!! note "filter" 
    * **Filters the emitted values based on a condition. **
    * **Scenario**: Filtering Search Results. You want to display only users whose age is above 18.
    * **Use Case**: Displaying only relevant data based on certain conditions.


```typescript
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

this.http.get<{ name: string; age: number }[]>('/api/users').pipe(
  map(users => users.filter(user => user.age > 18))
).subscribe(console.log);

```

## merge
!!! note "merge" 
    * ** Merges multiple observables and emits values as they arrive.**
    * **Scenario**: Handling Multiple Event Sources You have a button and a keyboard shortcut that both trigger the same action.

    * **Use Case**: Combines multiple event streams, allowing you to trigger the same action from different sources.

```typescript
import { fromEvent, merge } from 'rxjs';

const buttonClick$ = fromEvent(document.getElementById('button')!, 'click');
const keyPress$ = fromEvent(document, 'keydown');

merge(buttonClick$, keyPress$).subscribe(() => {
  console.log('Action triggered!');
});

```

## mergeMap
!!! note "mergeMap" 
    * ** Maps to an observable and flattens multiple inner observables concurrently.**
    * **Scenario**: Fetching Related Data for Multiple Items. You fetch a list of users and then fetch details for each user.

    * **Use Case**: Running multiple API requests concurrently for better performance.

```typescript
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

this.http.get<number[]>('/api/userIds').pipe(
  mergeMap(ids => from(ids)),
  mergeMap(id => this.http.get(`/api/users/${id}`))
).subscribe(console.log);


```


## forkJoin
!!! note "forkJoin" 
    * ** Waits for multiple observables to complete and returns the final values.**
    * **Scenario**: Loading User Details from Multiple APIs.You need to load user profile data from multiple APIs simultaneously and display it after all requests are complete.

    * **Use Case**: Executes multiple API calls in parallel and waits for all to complete before proceeding.

```typescript
import { forkJoin } from 'rxjs';

forkJoin({
  user: this.http.get('/api/user/1'),
  orders: this.http.get('/api/user/1/orders'),
  notifications: this.http.get('/api/user/1/notifications')
}).subscribe(({ user, orders, notifications }) => {
  this.user = user;
  this.orders = orders;
  this.notifications = notifications;
});
```
## switchMap
!!! note "switchMap" 
    * ** Switches to a new observable, canceling the previous one.**
    * **Scenario**: Search Autocomplete. Each keystroke triggers an API search, but only the latest request should be considered.

    * **Use Case**: Canceling stale requests when new input arrives.

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

fromEvent(document.getElementById('search')!, 'input').pipe(
  debounceTime(300),
  map((event: any) => event.target.value),
  switchMap(query => this.http.get(`/api/search?q=${query}`))
).subscribe(console.log);
```

## debounceTime
!!! note "debounceTime" 
    * ** Emits a value only after a specified time has passed without another emission.**
    * **Scenario**: User Input Validation. You validate an email address only after the user stops typing for 300ms.
    * **Use Case**: Reducing API calls for frequent user input.

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

fromEvent(document.getElementById('email')!, 'input').pipe(
  debounceTime(300),
  map((event: any) => event.target.value)
).subscribe(console.log);
```

## distinctUntilChanged
!!! note "distinctUntilChanged" 
    * ** Suppresses duplicate consecutive values.**
    * **Scenario**: Preventing Duplicate API Calls. Only fetch data when the user changes the input.
    * **Use Case**: Avoiding redundant API calls when the input hasn’t changed.

```typescript
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

fromEvent(document.getElementById('search')!, 'input').pipe(
  debounceTime(300),
  map((event: any) => event.target.value),
  distinctUntilChanged(),
  switchMap(query => this.http.get(`/api/search?q=${query}`))
).subscribe(console.log);


```

## combineLatest
!!! note "combineLatest" 
    * ** Combines the latest values from multiple observables.**
    * **Scenario**: Displaying Data from Multiple Inputs. You want to calculate and display the total price when the user selects a product and enters the quantity.
    * **Use Case**: Synchronizing data from different sources.

```typescript
import { combineLatest, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const productPrice$ = fromEvent(document.getElementById('product')!, 'change').pipe(
  map((event: any) => +event.target.value)
);
const quantity$ = fromEvent(document.getElementById('quantity')!, 'input').pipe(
  map((event: any) => +event.target.value)
);

combineLatest([productPrice$, quantity$]).pipe(
  map(([price, quantity]) => price * quantity)
).subscribe(console.log);
```

## catchError
!!! note "catchError" 
    * **Handles errors emitted by an observable. **
    * **Scenario**: Handling API Errors Gracefully.You want to display an error message when an API call fails.
    * **Use Case**: Providing user-friendly error messages.

```typescript
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

this.http.get('/api/data').pipe(
  catchError(error => {
    console.error('Error:', error);
    return throwError(() => new Error('Failed to fetch data.'));
  })
).subscribe({
  next: console.log,
  error: err => console.log(err.message)
});


```

## retry
!!! note "retry" 
    * **Retries a failed observable a specified number of times. **
    * **Scenario**: Retrying Failed API Requests.You want to retry a failed API request up to 3 times before showing an error.

    * **Use Case**: Handling intermittent network failures by retrying requests.

```typescript
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

this.http.get('/api/data').pipe(
  retry(3),
  catchError(err => throwError(() => new Error('Failed after 3 retries.')))
).subscribe({
  next: console.log,
  error: err => console.log(err.message)
});


```

## take
!!! note "take" 
    * **Emits only the first n values from an observable. **
    * **Scenario**: Polling API for a Limited Number of Times.You want to poll an API for updates every second but stop after 5 attempts.

    * **Use Case**: Limits the number of times the observable emits, reducing unnecessary requests.

```typescript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

interval(1000).pipe(
  take(5),
  switchMap(() => this.http.get('/api/status'))
).subscribe(console.log);


```

## startWith
!!! note "startWith" 
    * ** Emits an initial value before the source observable emits.**
    * **Scenario**: Setting Default State for a Loader.You have a data table that shows a loader until the API data is loaded.

    * **Use Case**: Sets the default state (Loading...) before the API response arrives.

```typescript
import { of } from 'rxjs';
import { startWith } from 'rxjs/operators';

this.http.get('/api/data').pipe(
  startWith('Loading...')
).subscribe(response => {
  if (response === 'Loading...') {
    this.showLoader = true;
  } else {
    this.showLoader = false;
    this.data = response;
  }
});


```
## zip
!!! note "zip" 
    * ** Combines multiple observables and emits their values as an array.**
    * **Scenario**: Fetching Data for Related Entities.You need to fetch a list of users and their corresponding addresses, but only emit values when both have been retrieved.

    * **Use Case**: Combines the data streams of users and their respective addresses in a synchronized manner.

```typescript
import { zip } from 'rxjs';

zip(
  this.http.get('/api/users'),
  this.http.get('/api/addresses')
).subscribe(([users, addresses]) => {
  this.usersWithAddresses = users.map((user, index) => ({
    ...user,
    address: addresses[index]
  }));
});


```

## of
!!! note "of" 
    * ** Creates an observable that emits a set of values and completes immediately.**
    * **Scenario**: Displaying Static Data.You want to display static data such as a list of product categories without making an API call.

    * **Use Case**: Use of to emit static or synchronous data that doesn't require external data fetching.

```typescript
import { of } from 'rxjs';

const categories$ = of(['Electronics', 'Books', 'Clothing']);

categories$.subscribe(categories => {
  console.log(categories); // Output: ['Electronics', 'Books', 'Clothing']
});


```

## from
!!! note "from" 
    * **Creates an observable from an array, a promise, or an iterable. **
    * **Scenario**: Handling Data from a Promise. You have a function that returns a promise, and you want to convert it into an observable for easier handling.

    * **Use Case**: Use from to convert arrays, promises, or iterable objects into observables.

```typescript
import { from } from 'rxjs';

const promise = fetch('/api/data').then(response => response.json());

from(promise).subscribe(data => {
  console.log(data);
});


```



##
!!! note "Map" 
    * ** Performs a side effect for each emission, such as logging or updating UI, without modifying the emitted value.**
    * **Scenario**: Logging API Response
You want to log the API response for debugging purposes but don’t want to modify the data.

    * **Use Case**: Use tap for logging, triggering side effects, or updating UI elements without affecting the data flow.

```typescript
import { tap } from 'rxjs/operators';

this.http.get('/api/data').pipe(
  tap(response => console.log('API Response:', response))
).subscribe(data => {
  this.data = data;
});


```

| operator      | Description                          | use cases |
| ----------- | ------------------------------------ | |
|    map   |   Transforms the emitted value.       |   Transforming API data to display full names. | map(users => users.map(user => user.firstName + ' ' + user.lastName))|
|    filter   |     Emits only values that satisfy a condition.     |  Filtering search results to show only users above 18.  |  filter(user => user.age > 18) |
| switchMap      |   Cancels the previous observable and switches to the latest one.       |   Real-time search autocomplete, canceling stale requests. |  switchMap(query => this.http.get('/api/search?q=' + query)) |
|   mergeMap    |     Flattens multiple inner observables concurrently.     | Fetching related data (e.g., user details) concurrently.   |  mergeMap(id => this.http.get('/api/users/' + id)) |
|   concatMap    |     Flattens multiple inner observables sequentially.     |  Submitting form sections one after another.  | concatMap(section => this.http.post('/api/form', section))  |
|  debounceTime     |     Emits the latest value after a specified time.     |  Reducing API calls for user input validation.  |  debounceTime(300) |
|    distinctUntilChanged   |   Emits values only if they are different from the previous one.       |  Preventing duplicate API calls for unchanged input.  |  distinctUntilChanged() |
|    combineLatest   |   Combines the latest values from multiple observables.       | Calculating the total price from product and quantity inputs.   | combineLatest([price$, quantity$]).pipe(map(([price, quantity]) => price * quantity))  |
|   catchError    |    Catches errors in the observable stream and handles them.      |   Displaying a user-friendly error message for API failures |   catchError(err => throwError(() => new Error('Failed to fetch data.')))|
|     retry  |    Retries a failed observable a specified number of times.      |   Retrying failed API requests up to 3 times. |  retry(3) |
|    of   |    Creates an observable that emits a set of values.      |  Displaying static data such as product categories.  |  of(['Electronics', 'Books', 'Clothing']) |
|       |          |    |   |




## Subject
!!! note "Subject" 
    * ** What is a Subject? An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.**


    * ** A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.**   


    ***It does not store the last emitted value, meaning new subscribers won’t receive previous values.*


    * **Scenario**: Event Emitter for User Actions. You want to emit events when a user clicks a button, and multiple components need to react to this event in real-time.

    * **Use Case**: Use Subject when you need a multicast observable to broadcast events without retaining the last emitted value.



```typescript
import { Subject } from 'rxjs';

const userActionSubject = new Subject<string>();

// Component A: Emits user action
function onUserAction(action: string) {
  userActionSubject.next(action);  // Emit the action
}

// Component B: Listens to user actions
userActionSubject.subscribe(action => {
  console.log('Component B received action:', action);
});

// Component C: Listens to user actions
userActionSubject.subscribe(action => {
  console.log('Component C received action:', action);
});

// Simulate user actions
onUserAction('Button Clicked'); // Both Component B and C receive the action


```

## Behaviour Subjects
!!! note "BehaviorSubject" 
    * **A BehaviorSubject stores the latest value and emits it to new subscribers immediately upon subscription. **
    * **Scenario**: You want to store and broadcast the current user’s authentication status across different components.

    * **Use Case**:  Use BehaviorSubject when you need to maintain and broadcast the latest value to both current and future subscribers (e.g., user authentication, theme settings).

```typescript
import { BehaviorSubject } from 'rxjs';

const authStatus$ = new BehaviorSubject<boolean>(false);  // Initial state is 'logged out'

// Component A: Updates authentication status
function login() {
  authStatus$.next(true);  // User is logged in
}

// Component B: Listens for authentication changes
authStatus$.subscribe(isLoggedIn => {
  console.log('Component B - User is logged in:', isLoggedIn);
});

// Component C: Subscribes after login but still gets the last state
authStatus$.subscribe(isLoggedIn => {
  console.log('Component C - User is logged in:', isLoggedIn);
});

// Simulate login
login();  // Both Component B and C receive 'true'


```

## Replay Subject
!!! note "ReplaySubject" 
    * **A ReplaySubject emits a specified number of previous values to new subscribers, even if they subscribed after those values were emitted. **
    * **Scenario**: Chat Application. You want a component to receive the last 3 messages in a chatroom, even if the component joins after the messages were sent.

    * **Use Case**: Use ReplaySubject when you want to replay a specified number of previous values to new subscribers (e.g., chat history, recent notifications).

```typescript
import { ReplaySubject } from 'rxjs';

const chatMessages$ = new ReplaySubject<string>(3);  // Replay the last 3 messages

// User A sends messages
chatMessages$.next('Hello!');
chatMessages$.next('How are you?');
chatMessages$.next('What are you doing?');

// New subscriber (User B) joins and receives the last 3 messages
chatMessages$.subscribe(message => {
  console.log('User B received:', message);
});

// User B receives all 3 messages: 'Hello!', 'How are you?', 'What are you doing?'


```


## Async Subjects
!!! note "An AsyncSubject emits only the last value and only when the observable completes." 
    * ** **
    * **Scenario**: API Request with Caching.you make an expensive API request, and you want all subscribers to receive the same final result when the request completes.

    * **Use Case**:  Use AsyncSubject when you only care about the final value after completion (e.g., caching API results, configuration loading).



```typescript

import { AsyncSubject } from 'rxjs';

const apiResponse$ = new AsyncSubject<number>();

// Simulate an API call
setTimeout(() => {
  apiResponse$.next(42);  // Emit final result
  apiResponse$.complete();  // Complete the observable
}, 3000);

// Subscriber A subscribes before completion
apiResponse$.subscribe(response => {
  console.log('Subscriber A received:', response);
});

// Subscriber B subscribes after completion but still receives the final value
setTimeout(() => {
  apiResponse$.subscribe(response => {
    console.log('Subscriber B received:', response);
  });
}, 4000);

```

|Subject |  Type	Behavior |	Use Case	| Example Scenario|
| ----------- | ------------------------------------ | ---|---| 
|Subject	    | Multicasts values to multiple subscribers but does not store the last value.|	Event emitter for user actions.|	Broadcasting button clicks to components.|
|BehaviorSubject	|Stores the latest value and emits it to new subscribers immediately.| 	Maintaining state and broadcasting changes.|	User authentication or theme settings.|
|ReplaySubject |	Replays a specified number of previous values to new subscribers. |	Providing history or recent data.|Chat messages or recent notifications.|
|AsyncSubject	| Emits only the final value and only after the observable completes.	 | Caching or handling the result of a single operation.	| API request caching or configuration loading.|