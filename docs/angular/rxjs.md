# RxJS (Reactive Extensions for JavaScript)

RxJS is a library for reactive programming using **observables**. It simplifies handling asynchronous and event-based programming tasks by providing operators to compose and transform data streams.

---

## Key Concepts in RxJS

### 1. **Observable**
An Observable is a data producer that emits values over time. It's a stream of events that you can observe and react to.

### 2. **Observer**
An Observer is an object that listens to values emitted by the Observable. It defines how to handle the data, errors, and completion of the stream.

### 3. **Subscription**
A Subscription represents the execution of an Observable. You use it to start or stop observing.

### 4. **Operators**
Operators are functions that allow you to manipulate streams, such as filtering, mapping, or combining.

### 5. **Subjects**
Subjects are both Observables and Observers. They are multicast, meaning multiple subscribers can receive values.

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
const observer = {
  next: (value: string) => console.log('Next:', value),
  error: (err: any) => console.error('Error:', err),
  complete: () => console.log('Completed!'),
};

// Subscribe to the Observable
observable.subscribe(observer);

```


## RxJS Operators and Real-Life Examples

RxJS operators help manage and manipulate streams of data effectively. They are categorized based on their functionality. Below is an overview of the main types of operators, real-life analogies, and examples.

---

### 1. **Creation Operators**
These are used to create new Observables.

 Example: `interval`
**Real Life Analogy:** A clock ticking every second, emitting the time at regular intervals.

---

### 2. **Transformation Operators**
These operators transform or modify emitted values.

 Example: `map`
**Real Life Analogy:** Converting temperatures from Celsius to Fahrenheit, transforming one data format into another.

---

### 3. **Filtering Operators**
These operators filter out unwanted data from the stream.

 Example: `filter`
**Real Life Analogy:** Filtering a list of ages to keep only those who are adults (18 years or older).

---

### 4. **Combination Operators**
These operators combine multiple Observables into one.

 Example: `merge`
**Real Life Analogy:** Merging multiple live news feeds into a single stream for a unified viewing experience.

---

### 5. **Utility Operators**
These operators provide utility functions for Observables, like managing subscriptions.

 Example: `tap`
**Real Life Analogy:** Logging data passing through a pipeline for debugging without modifying it.

---

### 6. **Error Handling Operators**
These operators help manage and recover from errors.

 Example: `catchError`
**Real Life Analogy:** Handling a server error by providing a default fallback response.

---

### 7. **Multicasting Operators**
These operators share a single Observable execution among multiple subscribers.

 Example: `share`
**Real Life Analogy:** Sharing a live video feed with multiple viewers, where the feed is created only once.

---

RxJS operators allow for powerful manipulation of data streams and make managing complex asynchronous operations more efficient and intuitive.

## Commonly Used RxJS Operators

RxJS (Reactive Extensions for JavaScript) provides powerful operators to handle asynchronous data streams effectively. Below are details of some commonly used operators with simple examples.

## 1. **map**
Transforms the items emitted by an Observable by applying a function to each item.


```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(
  map(x => x * 2)
).subscribe(console.log);
// Output: 2, 4, 6
```

### 2. mergeMap
Projects each source value to an Observable, which is merged into the output Observable.


```typescript
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

of('A', 'B').pipe(
  mergeMap(letter => of(`${letter}1`, `${letter}2`))
).subscribe(console.log);
// Output: A1, A2, B1, B2


```
###  merge
The `merge` operator in RxJS is used to combine multiple Observables into a single Observable. It concurrently subscribes to all input Observables and emits their values as they arrive.

- **Combines multiple Observables:** Emits values from all input Observables in parallel.
- **Order of emissions:** Maintains the order of values emitted by each Observable but not the order of the Observables themselves.
- **Completes:** Completes only when all input Observables have completed.

---

```typescript
import { merge } from 'rxjs';

merge(observable1, observable2, ...observableN);
``` 



### 3. switchMap
Switches to a new inner Observable and unsubscribes from the previous one.




```typescript
import { of, interval } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

of(1, 2, 3).pipe(
  switchMap(value => interval(1000).pipe(take(2))),
).subscribe(console.log);
// Output: 0, 1 (repeats for each value but unsubscribes from previous Observables)

```
### 4. debounceTime
Emits a value from the source Observable only after a particular time span has passed without another source emission.


```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

fromEvent(document, 'click').pipe(
  debounceTime(500),
  map(() => 'Clicked!')
).subscribe(console.log);
// Output: 'Clicked!' (if no further click for 500ms)

```

### 5. distinctUntilChanged
Suppresses duplicate consecutive values from the source Observable.



```typescript
import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

of(1, 1, 2, 2, 3, 3).pipe(
  distinctUntilChanged()
).subscribe(console.log);
// Output: 1, 2, 3

```

### Combining operators



```typescript
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

const searchInput = document.getElementById('search');

fromEvent(searchInput, 'input').pipe(
  map((event: any) => event.target.value),
  debounceTime(300),
  distinctUntilChanged()
).subscribe(value => console.log(`Search: ${value}`));
// Output: Logs the search input after 300ms debounce and only if the value changes

```

### diff
* map	Transforms each value emitted by the source.
* mergeMap	Maps to inner Observables and merges their output.
* switchMap	Switches to a new Observable, unsubscribing previous.
* debounceTime	Emits values after a pause between emissions.
* distinctUntilChanged	Filters out consecutive duplicate values.