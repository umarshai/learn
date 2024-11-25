
## value Labs
<details>
  <summary><strong> 1. challenges faced in Angular Migration (15 -> 17)</strong></summary>
  
        Change Zone.js deep imports like zone.js/bundles/zone-testing.js and zone.js/dist/zone to zone.js and zone.js/testing.
        Run ng update @angular/material@16.
        supports TypeScript version 4.9.3 or later.
        supports node.js versions: v16 and v18.
</details>
<details>
  <summary><strong> 2. pipes y not directives</strong></summary>
  
        Purpose Misalignment:

        Pipes are specifically designed to transform data in templates (e.g., converting dates, formatting numbers, filtering arrays).
        Directives modify DOM behavior or structure, which is not suitable for inline data transformation.
        Complexity:

        Using a directive for simple data transformation (like formatting a date) would require DOM manipulation, which is cumbersome and less efficient than a pipe.
        Directives and pipes serve different purposes in Angular. Pipes are specialized for data transformation in templates, while directives are meant to modify or control DOM elements' behavior. They are not interchangeable in most scenarios due to their differing design philosophies and applications.

</details> 
<details>
  <summary><strong>3. promise methods</strong></summary>
             1. Promise.resolve()
            Returns a promise that resolves with the given value.

```typescript
Copy code
Promise.resolve("Resolved value").then((value) => console.log(value));
// Output: Resolved value
```
2. Promise.reject()
Returns a promise that rejects with the given reason.

```javascript
Copy code
Promise.reject("Rejected value").catch((reason) => console.error(reason));
// Output: Rejected value

```

            3. Promise.all()
            Waits for all promises in an array to resolve. If any promise is rejected, it immediately rejects with that reason.

```javascript
Copy code
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.reject("Error");

Promise.all([p1, p2, p3])
.then((results) => console.log(results))
.catch((error) => console.error(error));
// Output: Error

```

```typescript
import { Observable } from 'rxjs';

// Create an Observable
const observable = new Observable((subscriber) => {
  subscriber.next('Hello');
  subscriber.next('RxJS');
  subscriber.complete();
});

// Create an Observer
const observer = {
  next: (value: string) => console.log('Next:', value),
  error: (err: any) => console.error('Error:', err),
  complete: () => console.log('Completed!'),
};

// Subscribe to the Observable
observable.subscribe(observer);

```

</details>
<details>
  <summary><strong>4. event bubbling & event capturing</strong></summary>
   When an event occurs on an element, it goes through the following phases:

        Capturing Phase (Event Capturing):

        The event starts at the topmost ancestor (e.g., document) and works its way down to the target element.
        Target Phase:

        The event reaches the target element, where the event handler on the target can execute.
        Bubbling Phase (Event Bubbling):

        The event propagates back up from the target element to the topmost ancestor.

        Event Bubbling
In event bubbling, the event propagates upward from the target element to its ancestors. 

```html
    <div id="parent" style="padding: 20px; background-color: lightblue;">
Parent
<div id="child" style="padding: 20px; background-color: lightgreen;">
    Child
</div>
</div>

<script>
const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", () => {
    console.log("Parent clicked (Bubbling phase)");
});

child.addEventListener("click", () => {
    console.log("Child clicked");
});
</script>
```

                            Event Capturing
                In event capturing, the event propagates downward from the topmost ancestor to the target element.

                Example of Event Capturing
                To use capturing, pass true as the third argument to addEventListener.
            Parent clicked (Capturing phase)
            Child clicked
            Stopping Propagation
            You can stop an event from propagating further by using event.stopPropagation().


        Summary
        Bubbling: Events propagate from the target element upward.
        Capturing: Events propagate from the topmost ancestor downward.
        Use stopPropagation() to stop further propagation.
        Methods can be utilized inside event handlers to enhance functionality.
        Event delegation optimizes event handling by attaching listeners to parent elements.
</details>
<details>
  <summary><strong>5. serve side events</strong></summary>
            Server-Sent Events (SSE) in JavaScript
            Server-Sent Events (SSE) is a standard for pushing updates from a server to a web browser over a single HTTP connection. Unlike WebSockets, which allow two-way communication, SSE provides a unidirectional channel (server to client).

            How SSE Works
            The server sends data to the client over an HTTP connection.
            The client listens to the server using an EventSource object.
            Data is streamed as text/event-stream, which is continuously updated by the server.
</details>

<details>
  <summary><strong> 6. flatmap</strong></summary>
   The map and flatMap methods are used to manipulate and transform arrays in JavaScript. They are part of the Array.prototype.

        1. map()
        The map method creates a new array by applying a function to each element of the original array.
        . flatMap()
        The flatMap method maps each element using a mapping function, then flattens the result into a new array. It's a combination of map() followed by flat() with a depth of 1.

```js
    const arr = [1, 2, 3];
const result = arr.flatMap(x => [x, x * 2]);
console.log(result);
// Output: [1, 2, 2, 4, 3, 6]

```
        map: For simple transformations.
        flatMap: For transformations requiring flattening by one level. It simplifies your code and improves readability and performance when dealing with nested structures.

</details>
<details>
  <summary><strong>8. merge and forkjoin and merge map diff</strong></summary>
   In Angular's RxJS, merge, forkJoin, and mergeMap are commonly used operators for working with observables. Below is a detailed explanation of their differences and use cases.

                1. merge
                Combines multiple observables into one, emitting values from all observables as they occur.
                It subscribes to all observables simultaneously and merges their outputs into a single observable.
                Syntax

```typescript
    Copy code
    merge(observable1, observable2, ...).subscribe(observer);
```
                Key Points
                Emits values immediately as they are emitted by the source observables.
                Useful for concurrent streams where order does not matter.
                Example

```typescript
    Copy code
    import { merge, of } from 'rxjs';
    import { delay } from 'rxjs/operators';

    const obs1 = of('A').pipe(delay(1000));
    const obs2 = of('B').pipe(delay(500));

    merge(obs1, obs2).subscribe(value => console.log(value));
    // Output: B, A (based on their delays);
```

                2. forkJoin
                Combines multiple observables into one but waits for all observables to complete before emitting a single array of their last emitted values.
                Best for scenarios where you need all results together after all observables complete.
                Syntax
                typescript
                Copy code
                forkJoin([observable1, observable2, ...]).subscribe(observer);
                Key Points
                Emits once when all source observables complete.
                Ideal for executing parallel tasks where results are interdependent.
                Example

```typescript
Copy code
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const obs1 = of('A').pipe(delay(1000));
const obs2 = of('B').pipe(delay(500));

forkJoin([obs1, obs2]).subscribe(value => console.log(value));
// Output: ['A', 'B'] (after all observables complete)
```

                3. mergeMap
                Projects each value from the source observable into an inner observable, then flattens the results into a single observable.
                Subscribes to multiple inner observables concurrently and merges their outputs.
                Syntax
```typescript
Copy code
source.pipe(mergeMap(value => innerObservable)).subscribe(observer);
Key Points
Useful when you need to map each emitted value to another observable and merge the results.
Inner observables emit values as soon as they are available.
Example
typescript
Copy code
import { of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

const source = of('A', 'B');
source
.pipe(
    mergeMap(value =>
    of(`${value} processed`).pipe(delay(1000))
    )
)
.subscribe(value => console.log(value));
// Output: A processed, B processed (concurrently after ~1s)
```
</details>
<details>
  <summary><strong>9. Banking sector</strong></summary>
              Secure API Communication
            Use CORS to restrict access to APIs from specific domains.
            Validate and sanitize all API inputs on the server side.
            Minimizing Payload
            Use Angular CLI's build optimizer and tree-shaking to reduce bundle size.
            Compress assets using Gzip or Brotli.
</details>
<details>
  <summary><strong>10. new feature in 17 like signals</strong></summary>
          ts 5.X
        new control floe statements @if
</details>
<details>
  <summary><strong>11.flex is it fror responsiveness</strong></summary>
       
        How Flexbox Helps in Responsiveness
        Dynamic Layouts:

        Flexbox distributes space dynamically based on available dimensions, making layouts adjust naturally to screen size changes.
        Alignment and Justification:

        Use justify-content and align-items to control alignment and spacing of items in a flex container, helping maintain a consistent layout across devices.
        Reordering and Wrapping:

        The flex-wrap property enables items to wrap to the next row or column when there's insufficient space, preventing content overflow.
        order allows reordering of elements for specific screen sizes.
        Flexibility in Item Sizing:

        The flex-grow, flex-shrink, and flex-basis properties provide control over how items resize relative to their container and siblings.

```typescript
    <div class="container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
    </div>

    <style>
    .container {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    .item {
        background-color: lightblue;
        padding: 20px;
        flex-grow: 1;
    }

    @media (max-width: 600px) {
        .container {
        flex-direction: column; /* Stack items vertically on smaller screens */
        }
    }
    </style>
```
</details>

<details>
  <summary><strong> 12. cherry pick in git 
</strong></summary>
  Test
</details>
    


               

    

    

    

   

## Tek Systems

<details>
  <summary><strong>1. PWA Apps</strong></summary>
  Test
</details>
<details>
  <summary><strong>    2. SSR </strong></summary>
  Test
</details>
<details>
  <summary><strong>3. Rxjs</strong></summary>
  Test
</details>
<details>
  <summary><strong> 4. NgRx</strong></summary>
  Test
</details>
<details>
  <summary><strong>5. css framework sass</strong></summary>
  Test
</details>

<details>
  <summary><strong>6. typescript differences type of, type inference</strong></summary>
  Test
</details>
    


