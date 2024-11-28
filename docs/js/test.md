# JavaScript Overview and Interview Questions


## Overview

JavaScript is a dynamic, interpreted programming language that runs in the browser or on a server (Node.js). It is single-threaded, meaning that it can only execute one operation at a time. However, JavaScript uses certain concepts such as **execution context**, **call stack**, and **hoisting** to handle various operations in a way that provides asynchronous behavior and manages multiple tasks.

---

| **Concept**              | **Explanation**                                                                                                                                                                   | **Examples**                                                                                                                                                          |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Execution Context**     | Holds information about the environment in which the current code is executed. Defines the scope, variable values, and function executions.                                      | - **Global Execution Context**: Default context for global code execution. <br> - **Function Execution Context**: Created when a function is invoked. <br> - **Eval Execution Context**: Rarely used, when code is executed inside an `eval()`. |
| **Components of Execution Context** | Contains: <br> - **Variable Environment**: Holds variables, functions, and parameters. <br> - **Lexical Environment**: Contains variables declared in the current scope. <br> - **This Binding**: Refers to the object executing the current code. |                                                                                                                                                                      |
| **Variable Environment**  | Refers to where variables and functions are stored during code execution, managing scope and access.                                                                              | - **Local Variables**: Variables declared inside a function. <br> - **Function Parameters**: Arguments passed into a function. <br> - **Function Declarations**: Functions in the current scope. |
| **Call Stack**            | A stack data structure used to track function calls. When a function is invoked, its execution context is pushed onto the stack. Once the function execution completes, the context is popped off. | - The **Call Stack** keeps track of the order of function execution. <br> Example: `function a() { b(); } function b() { console.log('Hello'); }` Call stack: `a()` → `b()`. |
| **Event Loop**            | The event loop constantly checks the call stack and callback queue. If the call stack is empty, it pushes the first callback from the callback queue to the call stack for execution. | - The **Event Loop** allows asynchronous code (like `setTimeout` or promises) to be executed once the call stack is clear. <br> Example: `setTimeout(() => { console.log('Done'); }, 1000);` |
| **Garbage Collector**     | A mechanism that automatically frees up memory by cleaning up unused objects that are no longer referenced. The garbage collector works in the background without direct developer intervention. | - The **Garbage Collector** runs periodically to identify and remove objects that are no longer needed or referenced. <br> Example: `let obj = { name: 'Test' }; obj = null;` (The object is now eligible for garbage collection). |
| **Example (Thread Execution)** | When a function is called, it is pushed onto the call stack. Asynchronous code moves callbacks to the event loop's callback queue. When the stack is empty, the event loop executes them. | `function example() { let x = 10; console.log(x); } example();` <br> `x` is stored in the function’s execution context. |


### ES5 features

| **Version** | **Feature**                             | **Description**                                                                                          | **Example**                                                                                                    |
|-------------|-----------------------------------------|----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| **ES5**     | **Strict Mode**                         | Introduced strict mode to catch common coding errors and improve performance.                            | `'use strict'; <br> var x = 10; <br> delete x; // Error`                                                        |
|             | **Array Methods**                       | New methods like `forEach()`, `map()`, `filter()`, `reduce()`, and `some()` to simplify array operations. | `arr.forEach(item => console.log(item)); <br> arr.map(x => x * 2);`                                           |
|             | **JSON**                                | The `JSON` object was introduced to parse and stringify JSON data.                                        | `JSON.parse('{"name": "John"}'); <br> JSON.stringify({name: "John"});`                                         |
|             | **Object Methods**                      | Added `Object.create()`, `Object.defineProperty()`, `Object.defineProperties()`, `Object.getOwnPropertyNames()`. | `Object.create(null); <br> Object.defineProperty(obj, 'prop', { value: 42 });`                              |
| **ES6**     | **Arrow Functions**                     | Introduced a shorter syntax for functions and lexical `this` binding.                                     | `const sum = (a, b) => a + b;`                                                                                 |
|             | **Let and Const**                       | Introduced block-scoped variables (`let`) and constants (`const`).                                          | `let x = 10; <br> const y = 20;`                                                                                |
|             | **Template Literals**                   | String interpolation with backticks and expression embedding.                                              | `` let str = `Hello, ${name}` ``                                                                                  |
|             | **Destructuring Assignment**            | Assign variables from arrays or objects in a concise way.                                                  | `const [a, b] = [1, 2]; <br> const {x, y} = obj;`                                                              |
|             | **Default Parameters**                  | Parameters can have default values.                                                                         | `function greet(name = 'Guest') { console.log(name); }`                                                        |
|             | **Promises**                            | Native support for promises to handle asynchronous operations.                                            | `new Promise((resolve, reject) => { resolve('Done'); }).then(data => console.log(data));`                      |
|             | **Classes**                             | Introduced class syntax for object-oriented programming.                                                  | `class Person { constructor(name) { this.name = name; } }`                                                    |
|             | **Modules**                             | Introduced the `import` and `export` statements to support modular code.                                   | `import { add } from './math.js'; <br> export function add(a, b) { return a + b; }`                           |
| **ES7**     | **Array.prototype.includes()**          | Added `includes()` to check if an element exists in an array.                                              | `[1, 2, 3].includes(2); // true`                                                                                 |
|             | **Exponentiation Operator**              | Introduced the exponentiation operator (`**`) for raising a number to a power.                             | `2 ** 3; // 8`                                                                                                  |
| **ES8**     | **Async/Await**                         | Introduced async functions and the `await` keyword for handling promises more intuitively.                | `async function fetchData() { let result = await fetch('url'); return result.json(); }`                       |
|             | **Object.values() / Object.entries()**  | Methods to return an array of values or an array of key-value pairs from an object.                        | `Object.values({a: 1, b: 2}); // [1, 2]` <br> `Object.entries({a: 1, b: 2}); // [['a', 1], ['b', 2]]`              |
|             | **String padding**                      | Added `padStart()` and `padEnd()` to pad a string to a specified length.                                   | `'5'.padStart(3, '0'); // '005' <br> '5'.padEnd(3, '0'); // '500'`                                              |
| **ES9**     | **Asynchronous Iteration**              | Introduced `for-await-of` for iterating over asynchronous data sources like promises.                     | `async function printData() { for await (let data of fetchData()) { console.log(data); } }`                     |
|             | **Object Rest and Spread Properties**    | Spread and rest properties were added for objects, enabling easier copying and merging of objects.         | `const obj = { ...sourceObj }; <br> const { a, b, ...rest } = obj;`                                           |
| **ES10**    | **Array.prototype.flat()**              | Introduced `flat()` to flatten nested arrays into a single array.                                           | `[1, [2, [3]]].flat(2); // [1, 2, 3]`                                                                           |
|             | **String.prototype.trimStart() / trimEnd()** | Methods to trim whitespace from the beginning or end of a string.                                           | `'  hello  '.trimStart(); // 'hello  ' <br> '  hello  '.trimEnd(); // '  hello'`                                |
|             | **Optional Catch Binding**               | Allows `catch` to omit the error parameter if not needed.                                                   | `try { throw new Error(); } catch { console.log('Error caught'); }`                                             |
| **ES11**    | **Nullish Coalescing Operator (??)**     | Introduced the nullish coalescing operator to return the right-hand operand only when the left-hand is `null` or `undefined`. | `let result = a ?? b; // Returns b if a is null or undefined`                                                   |
|             | **Optional Chaining (?.)**              | Allows safe access to nested properties without throwing errors when a property is `null` or `undefined`.    | `let name = person?.address?.street; // Returns undefined if any part is null or undefined`                    |
|             | **BigInt**                              | Added support for large integers beyond the `Number` type.                                                 | `let bigInt = 1234567890123456789012345678901234567890n;`                                                      |
|             | **Promise.allSettled()**                 | Returns a promise that resolves after all input promises have settled (either resolved or rejected).        | `Promise.allSettled([p1, p2]).then(results => console.log(results));`                                           |
| **ES12**    | **Logical Assignment Operators**         | Combines logical operators (`&&`, `||`, `??`) with assignment.                                               | `x &&= y; <br> x ||= y; <br> x ??= y;`                                                                          |
|             | **WeakRefs**                             | Introduced `WeakRef` and `FinalizationRegistry` for weak references, allowing objects to be garbage collected. | `let ref = new WeakRef(obj);`                                                                                   |
|             | **Numeric Separators**                   | Introduced underscores as separators in numeric literals for better readability.                            | `let num = 1_000_000; // 1000000`                                                                               |
| **ES13 (Future)** | **Top-level Await**               | Allows `await` to be used at the top level in modules, without needing to wrap it inside an `async` function. | `// In an ES module file <br> await fetch('data.json');`                                                         |
|             | **Logical Nullish Assignment (??=)**     | Simplifies nullish coalescing assignment (combines `??` with `=`).                                           | `x ??= y; // Assign y only if x is null or undefined`                                                           |
| **Future** | **Pattern Matching (proposal)**           | Pattern matching (similar to switch statements) to match against complex patterns in JavaScript.             | `match (value) { case 1: return "One"; case [a, b]: return "Pair"; }`                                          |




## **Key Features**
1. **Dynamic Typing**: Types are determined at runtime.
2. **Prototypal Inheritance**: Objects inherit directly from other objects.
3. **Event-Driven**: Used to handle events like user actions or server responses.
4. **Asynchronous Programming**: Supports asynchronous operations with `callbacks`, `promises`, and `async/await`.
5. **Cross-Platform**: Runs on all major browsers and environments like Node.js.

---

## **JavaScript Interview Questions and Answers**
#### 1. **What is the difference between `var`, `let`, and `const`?**
- **`var`**: Function-scoped, can be redeclared, and is hoisted.
- **`let`**: Block-scoped, cannot be redeclared, and is not initialized during hoisting.
- **`const`**: Block-scoped, must be initialized during declaration, and its value cannot be reassigned.

#### 3. **What is hoisting in JavaScript?**
Hoisting is JavaScript's default behavior of moving declarations (variables and functions) to the top of their scope during compilation. However, only declarations are hoisted, not initializations. only var-undefined and functions-f{..} and let const would be in temporal deadzone

#### 4. **What are JavaScript data types?**
- **Primitive Types**: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `BigInt`, `Symbol`.
- **Non-Primitive Types**: Objects (including arrays, functions, and objects).

---


#### 5. **What are closures in JavaScript?**
A closure is a function that remembers the variables from its outer scope, even after the outer function has finished executing. Closures are used to create private variables and maintain state.

#### 6. **What is the difference between `==` and `===`?**
- **`==`**: Checks for value equality and performs type coercion if the types differ.
- **`===`**: Checks for both value and type equality without type coercion.

#### 7. **Explain the concept of "this" in JavaScript.**
The `this` keyword refers to the object that is currently executing the function. Its value depends on the function's context:
- In a method, `this` refers to the object.
- In a regular function, `this` refers to the global object (`window` in browsers, `global` in Node.js).
- In strict mode, `this` is `undefined` for regular functions.

#### 8. **What are promises in JavaScript?**
Promises are objects that represent the eventual completion (or failure) of an asynchronous operation. They have three states:
- **Pending**: The operation is ongoing.
- **Resolved (Fulfilled)**: The operation completed successfully.
- **Rejected**: The operation failed.

#### 9. **What is the event loop in JavaScript?**
The event loop is a mechanism that handles and processes events and asynchronous tasks. It ensures non-blocking execution by continuously checking the **call stack** and **callback queue**, executing queued tasks when the call stack is empty.

---

### **Web-Specific Questions**

#### 10. **What is the difference between synchronous and asynchronous programming?**
- **Synchronous**: Tasks are executed sequentially, blocking further execution until the current task is completed.
- **Asynchronous**: Tasks can be executed independently of the main program flow, using mechanisms like callbacks, promises, or `async/await`.

#### 11. **What are JavaScript Events?**
Events are actions or occurrences that happen in the browser, such as clicks, keypresses, or page loads. JavaScript can respond to these events using event listeners.

#### 12. **What are Arrow Functions in JavaScript?**
Arrow functions are a shorthand syntax for writing functions introduced in ES6. They do not have their own `this`, and thus inherit `this` from their lexical scope.


### **Methods in JavaScript**

#### 1. **What is the difference between `.call()`, `.apply()`, and `.bind()`?**
- **`call()`**: Invokes a function with a specified `this` context and arguments passed individually.
- **`apply()`**: Similar to `call()` but takes arguments as an array.
- **`bind()`**: Returns a new function with a specified `this` context, which can be invoked later.

#### 2. **What are JavaScript array methods?**
- **Mutating Methods**: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `reverse()`, `sort()`.
- **Non-Mutating Methods**: `map()`, `filter()`, `reduce()`, `forEach()`, `find()`, `every()`, `some()`, `slice()`.

#### 3. **Explain `map()`, `filter()`, and `reduce()` with examples.**
- **`map()`**: Transforms an array by applying a function to each element and returns a new array.
- **`filter()`**: Returns a new array containing elements that pass a specified condition.
- **`reduce()`**: Reduces the array to a single value based on a callback function.

#### 4. **What are string methods in JavaScript?**
- Common methods:
  - `charAt()`, `concat()`, `includes()`, `indexOf()`, `replace()`, `split()`, `substring()`, `toLowerCase()`, `toUpperCase()`, `trim()`.

---

### **Objects and Prototypes**

#### 5. **What is the difference between Object.freeze() and Object.seal()?**
- **`Object.freeze()`**: Prevents any modification (adding, deleting, or changing properties).
- **`Object.seal()`**: Allows modification of existing properties but prevents adding or deleting properties.

#### 6. **What are getters and setters in JavaScript?**
Getters and setters are methods that provide controlled access to an object's properties.
- **Getter**: Used to retrieve property values.
- **Setter**: Used to set or update property values.

#### 7. **Explain prototypal inheritance in JavaScript.**
Prototypal inheritance allows objects to inherit properties and methods from another object. Every JavaScript object has a prototype, which is another object it inherits from.

#### 8. **What is the difference between Object.create() and class inheritance?**
- **`Object.create()`**: Creates a new object with a specified prototype.
- **Class inheritance**: Introduced in ES6, uses the `class` and `extends` keywords to create a more structured inheritance model.

---

### **Functions**

#### 9. **What is the difference between a regular function and an arrow function?**
- **Arrow Function**:
  - Does not have its own `this`.
  - Cannot be used as a constructor.
  - Has a more concise syntax.
- **Regular Function**:
  - Has its own `this` context.
  - Can be used as a constructor.
  - Syntax can be verbose.

#### 10. **What is function currying?**
Currying is a technique where a function is transformed into a series of functions, each accepting a single argument.

#### 11. **What is memoization?**
Memoization is an optimization technique where function results are cached for specific inputs to avoid redundant computations.

---

### **Error Handling**

#### 12. **What is the purpose of `try...catch` in JavaScript?**
`try...catch` is used to handle runtime errors gracefully by wrapping code that might throw an error and providing a fallback mechanism in the `catch` block.

#### 13. **What is the difference between `throw` and `return`?**
- **`throw`**: Used to generate a custom error or exception.
- **`return`**: Used to exit a function and return a value.

#### 14. **How can you create custom errors in JavaScript?**
Custom errors can be created by extending the built-in `Error` class and defining a custom constructor.

---

### **Asynchronous Programming**

#### 15. **What is the difference between `setTimeout` and `setInterval`?**
- **`setTimeout`**: Executes a function once after a specified delay.
- **`setInterval`**: Repeatedly executes a function at a specified interval.

#### 16. **What are the different states of a Promise?**
- **Pending**: The initial state of the promise.
- **Fulfilled**: Indicates a successful operation.
- **Rejected**: Indicates a failed operation.

#### 17. **What is `async/await` in JavaScript?**
`async/await` is a syntax introduced in ES8 to handle asynchronous operations in a more readable and synchronous-like manner.

#### 18. **What is the purpose of `Promise.all` and `Promise.race`?**
- **`Promise.all`**: Resolves when all promises in an array resolve, or rejects if any promise rejects.
- **`Promise.race`**: Resolves or rejects as soon as the first promise in the array resolves or rejects.

---

### **Event Handling and DOM**

#### 19. **What is event delegation?**
Event delegation is a technique where a single event listener is attached to a parent element to handle events on its child elements.

#### 20. **What is the difference between `addEventListener` and inline event handlers?**
- **`addEventListener`**: Allows multiple listeners for the same event and better separation of concerns.
- **Inline Handlers**: Embed JavaScript directly into HTML, which can lead to less maintainable code.

#### 21. **What are the phases of event propagation?**
1. **Capturing Phase**: Events are captured from the root to the target element.
2. **Target Phase**: The event reaches the target element.
3. **Bubbling Phase**: Events bubble back up to the root.

---

### **Miscellaneous**

#### 22. **What is the difference between `null` and `undefined`?**
- **`null`**: Explicitly assigned to indicate "no value."
- **`undefined`**: Indicates a variable has been declared but not assigned a value.

#### 23. **What is a `Symbol` in JavaScript?**
A `Symbol` is a unique and immutable primitive data type introduced in ES6, often used as object property keys.

#### 24. **What is `typeof` and when is it used?**
`typeof` is an operator used to determine the type of a variable or value (e.g., `typeof 42 // "number"`).

#### 25. **What is the difference between shallow and deep cloning in JavaScript?**
- **Shallow Cloning**: Copies the top-level properties only (e.g., `Object.assign()`, spread operator `...`).
- **Deep Cloning**: Recursively copies all nested objects (e.g., `JSON.parse(JSON.stringify(obj))` or libraries like Lodash).


---

### **Best Practices**

#### 13. **How do you avoid callback hell?**
- Use **Promises** or **async/await** for better readability and maintainability.
- Modularize code by breaking it into smaller, reusable functions.

#### 14. **What are some common JavaScript debugging techniques?**
- Use `console.log()` for simple debugging.
- Use browser developer tools for stepping through code and inspecting variables.
- Leverage breakpoints and the `debugger` keyword.

#### 15. **What are JavaScript modules?**
Modules allow you to split your code into reusable, maintainable pieces. In ES6, the `import` and `export` keywords are used to define and use modules.

---


