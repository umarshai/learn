# JavaScript Overview and Interview Questions

## **What is JavaScript?**
JavaScript is a lightweight, interpreted programming language primarily used for adding interactivity to web pages. It supports object-oriented, procedural, and functional programming paradigms.

---

## **Key Features**
1. **Dynamic Typing**: Types are determined at runtime.
2. **Prototypal Inheritance**: Objects inherit directly from other objects.
3. **Event-Driven**: Used to handle events like user actions or server responses.
4. **Asynchronous Programming**: Supports asynchronous operations with `callbacks`, `promises`, and `async/await`.
5. **Cross-Platform**: Runs on all major browsers and environments like Node.js.

---

## **JavaScript Interview Questions and Answers**

### **JavaScript Basics**

#### 1. **What is the difference between `var`, `let`, and `const`?**
- **`var`**: Function-scoped, can be redeclared, and is hoisted.
- **`let`**: Block-scoped, cannot be redeclared, and is not initialized during hoisting.
- **`const`**: Block-scoped, must be initialized during declaration, and its value cannot be reassigned.

#### 2. **How is JavaScript different from Java?**
- JavaScript is a lightweight, dynamic scripting language primarily used for web development, while Java is a compiled, statically-typed programming language used for a variety of applications, including desktop, mobile, and web development.

#### 3. **What is hoisting in JavaScript?**
Hoisting is JavaScript's default behavior of moving declarations (variables and functions) to the top of their scope during compilation. However, only declarations are hoisted, not initializations.

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


# JavaScript Advanced Features and Interview Questions

## **Methods and Features**

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

## **Final Tips**
1. Prepare to explain concepts with examples or scenarios.
2. Familiarize yourself with ES6+ features.
3. Stay updated on JavaScript performance optimizations and tools.

---


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

## **Final Tips**
1. Always clarify questions during interviews and demonstrate your problem-solving approach.
2. Emphasize your understanding of concepts with real-world examples.
3. Stay updated with modern JavaScript features (e.g., ES6+).

---
