# Promises in JavaScript - Interview Questions and Answers

!!! note "Overview"
    Promises are used for asynchronous programming in JavaScript. They represent the completion (or failure) of an asynchronous operation and its resulting value. Promises help manage asynchronous operations by avoiding callback hell and making code more readable and maintainable.

---

## What is a Promise?

**Answer**:  
A Promise is an object representing the eventual completion or failure of an asynchronous operation. It is in one of three states:

- **Pending**: The initial state. The promise is still being executed.
- **Fulfilled**: The operation completed successfully.
- **Rejected**: The operation failed.

### Example of Creating a Promise:

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operation was successful!");
  } else {
    reject("Operation failed!");
  }
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Promises in JavaScript

!!! note "Explanation"
    In this example:

    - `resolve()` is called if the promise is successful.
    - `reject()` is called if the promise fails.
    - `.then()` is used to handle success, and `.catch()` handles errors.

---

### Common Interview Questions on Promises

#### 1. What is the difference between a callback and a promise?

!!! note "Answer"
    - **Callback**: A function passed as an argument to another function and executed after some operation is completed. It can lead to *callback hell*, where nested callbacks make code harder to read and manage.
    - **Promise**: An object representing the completion or failure of an asynchronous operation, which is easier to manage and chain. Promises make asynchronous code more readable and maintainable.

| **Feature**      | **Callback**                                            | **Promise**                                                     |
|------------------|---------------------------------------------------------|---------------------------------------------------------------|
| **Readability**  | Hard to manage in nested or multiple callbacks.        | Promises allow chaining with `.then()` and `.catch()`.         |
| **Error Handling**| Errors are handled by passing errors to callbacks.     | Errors are handled with `.catch()` for better control.        |
| **Asynchronous Handling**| Requires multiple callbacks for multiple async tasks. | Allows chaining of async operations.                          |

#### 2. What are the states of a Promise?

!!! note "Answer"
    A Promise can be in one of three states:
    
    - **Pending**: Initial state. The asynchronous operation is still in progress.
    - **Fulfilled**: The asynchronous operation completed successfully.
    - **Rejected**: The asynchronous operation failed.

#### 3. What are `.then()` and `.catch()` methods?

!!! note "Answer"
    - `.then()` is used to handle the success response when the promise is fulfilled. It returns a new promise that resolves with the returned value.
    - `.catch()` is used to handle the error response when the promise is rejected.

    **Example:**

    ```javascript
    myPromise
      .then(result => console.log(result))  // Handles success
      .catch(error => console.error(error)); // Handles error
    ```

#### 4. What is Promise chaining?

!!! note "Answer"
    Promise chaining is the process of using multiple `.then()` methods on a promise, where each `.then()` returns a new promise. This allows for sequential asynchronous operations.

    **Example:**

    ```javascript
    fetchData()
      .then(data => processData(data))   // first async operation
      .then(processedData => saveData(processedData))  // second async operation
      .catch(error => console.error(error));  // handle any error in the chain
    ```

#### 5. What is `Promise.all()`?

!!! note "Answer"
    `Promise.all()` is a method that accepts an array of promises and returns a new promise that resolves when all of the promises in the array have resolved. If any of the promises are rejected, `Promise.all()` will immediately reject with the error of the first promise that fails.

    **Example:**

    ```javascript
    const promise1 = Promise.resolve(3);
    const promise2 = Promise.resolve(4);
    const promise3 = Promise.resolve(5);

    Promise.all([promise1, promise2, promise3])
      .then(values => console.log(values))  // [3, 4, 5]
      .catch(error => console.log(error));
    ```

#### 6. What is `Promise.race()`?

!!! note "Answer"
    `Promise.race()` accepts an array of promises and returns a new promise that resolves or rejects as soon as the first promise in the array resolves or rejects. It "races" the promises.

    **Example:**

    ```javascript
    const promise1 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'one'));
    const promise2 = new Promise((resolve, reject) => setTimeout(resolve, 200, 'two'));

    Promise.race([promise1, promise2])
      .then(result => console.log(result))  // Output: 'one'
      .catch(error => console.log(error));
    ```

#### 7. What is `Promise.allSettled()`?

!!! note "Answer"
    `Promise.allSettled()` accepts an array of promises and returns a promise that resolves after all promises have either been fulfilled or rejected, providing the results of all promises.

    **Example:**

    ```javascript
    const promise1 = Promise.resolve(1);
    const promise2 = Promise.reject('error');
    const promise3 = Promise.resolve(3);

    Promise.allSettled([promise1, promise2, promise3])
      .then(results => console.log(results)); 
      // Output: 
      // [ { status: 'fulfilled', value: 1 },
      //   { status: 'rejected', reason: 'error' },
      //   { status: 'fulfilled', value: 3 }]
    ```

#### 8. What is `Promise.finally()`?

!!! note "Answer"
    `Promise.finally()` is used to execute a cleanup or final operation after a promise settles (either resolves or rejects), regardless of the outcome. It does not modify the promise chain's result.

    **Example:**

    ```javascript
    fetchData()
      .then(data => processData(data))
      .catch(error => handleError(error))
      .finally(() => console.log('Cleanup after promise'));
    ```

---

### Real-World Scenarios for Using Promises

| **Scenario**                  | **Use Case**                                                          | **Promise Usage**                                              |
|-------------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------|
| **Fetching Data from API**    | Making asynchronous HTTP requests to fetch data from a server.       | `fetch()` API wrapped in a Promise.                            |
| **Processing Multiple API Requests** | Making multiple API calls concurrently and waiting for all results. | `Promise.all()`                                                 |
| **UI Interactions**           | Waiting for user interactions before continuing with further operations. | Promise chaining with UI events.                               |
| **Async File Operations**     | Handling file reading/writing operations where the result is not immediately available. | Promise-based async I/O operations.                           |
| **Timeout or Delay Handling** | Delaying a certain operation, like waiting for a certain time before taking action. | `Promise.race()` with a timeout promise.                        |

---

### Summary

- Promises represent the completion (or failure) of an asynchronous operation.
- They help to handle asynchronous code in a more readable way, avoiding callback hell.
- Key methods include `.then()`, `.catch()`, `.finally()`, and utility methods like `Promise.all()`, `Promise.race()`, and `Promise.allSettled()` for handling multiple promises simultaneously.
- Promise chaining allows multiple asynchronous operations to run sequentially, while `Promise.all()` and `Promise.race()` are used to handle concurrent promises.

!!! tip "Best Practice"
    Use `Promise.all()` when you need all promises to resolve before continuing, and `Promise.race()` when you need the fastest result.
