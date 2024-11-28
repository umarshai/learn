## Basics

!!! note "About"
    JavaScript is a dynamic, interpreted programming language that runs in the browser or on a server (Node.js). It is single-threaded, meaning that it can only execute one operation at a time. However, JavaScript uses certain concepts such as **execution context**, **call stack**, and **hoisting** to handle various operations in a way that provides asynchronous behavior and manages multiple tasks.

    
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




    **Key Features**
    1. **Dynamic Typing**: Types are determined at runtime.
    2. **Prototypal Inheritance**: Objects inherit directly from other objects.
    3. **Event-Driven**: Used to handle events like user actions or server responses.
    4. **Asynchronous Programming**: Supports asynchronous operations with `callbacks`, `promises`, and `async/await`.
    5. **Cross-Platform**: Runs on all major browsers and environments like Node.js.


!!! note "JS execution"
      Everything happens in Execution context. it consits of two components

        1. memory component -> Variable Envimronment  - JS first stores the variables(undefined) and fucntion declarations(f{...}).

        2. code component   -> Thread Execution -> synchronous single threaded language which make executes the code line by line like assigning values to function execution. 

       call stack: for every a new execution stack will be creaetd and handled on top of GEC as E1, E2 once return it will remove the execution context from memory

       Hoisting: var and function declation can be accessed even before initialization becase of its defined in variable env and var as undefined and function as whole. vavr and functions will be moved to tope of its scope

       ```typescript
       var a = 1,
       b();
       c();
       console.log(a);
       b(){a=10; console.log(a)};
       c(){a=100; console.log(a)};
       output: 10
              100
              1
       ``` 
       Every JS program will have a responsibility of creating of an Global object. for chromw v8engine-> window

!!! note "Data types"
      - **Primitive Types**: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `BigInt`, `Symbol`.
      - **Non-Primitive Types**: Objects (including arrays, functions, and objects).

<details>
  <summary><strong>control statements</strong></summary>
  # Control Flow Statements in JavaScript

Control flow statements in JavaScript allow you to control the execution flow of your program based on certain conditions. These statements enable decision-making, looping, and error handling. Below are the primary types of control flow statements in JavaScript:

## 1. Conditional Statements

Conditional statements are used to perform different actions based on different conditions.

 `if` Statement
The `if` statement executes a block of code if the condition evaluates to `true`.

    ```javascript
    if (condition) {
      // Code to execute if the condition is true
    }
    ```

 `if...else` Statement
The `if...else` statement provides an alternative set of instructions to execute if the condition is `false`.

    ```javascript
    if (condition) {
      // Code to execute if the condition is true
    } else {
      // Code to execute if the condition is false
    }
    ```

 `if...else if...else` Statement
This structure allows you to check multiple conditions. If the first condition is `false`, it checks the second one, and so on.

    ```javascript
    if (condition1) {
      // Code to execute if condition1 is true
    } else if (condition2) {
      // Code to execute if condition2 is true
    } else {
      // Code to execute if all conditions are false
    }
    ```

 `switch` Statement
The `switch` statement evaluates an expression and executes the corresponding block of code based on the matching `case`. It's useful when you have many possible conditions for one variable or expression.

    ```javascript
    switch (expression) {
      case value1:
        // Code to execute if expression equals value1
        break;
      case value2:
        // Code to execute if expression equals value2
        break;
      default:
        // Code to execute if no case matches
    }
    ```

 2. Looping Statements

Looping statements are used to execute a block of code repeatedly.

 `for` Loop
The `for` loop is used when you know beforehand how many times you want to execute a statement or a block of code.

    ```javascript
    for (let i = 0; i < 5; i++) {
      console.log(i); // Prints numbers 0 to 4
    }
    ```

 `while` Loop
The `while` loop executes a block of code as long as the specified condition evaluates to `true`.

    ```javascript
    let i = 0;
    while (i < 5) {
      console.log(i); // Prints numbers 0 to 4
      i++;
    }
    ```

 `do...while` Loop
The `do...while` loop is similar to the `while` loop, except that it guarantees the block of code will execute at least once, even if the condition is false at the beginning.

    ```javascript
    let i = 0;
    do {
      console.log(i); // Prints numbers 0 to 4
      i++;
    } while (i < 5);
    ```

### `for...in` Loop
The `for...in` loop is used to iterate over the enumerable properties of an object. It’s ideal for looping through object properties or array indexes.

    ```javascript
    let person = { name: 'John', age: 30, city: 'New York' };
    for (let key in person) {
      console.log(key, person[key]); // Prints key-value pairs
    }
    ```

 `for...of` Loop
The `for...of` loop is used to iterate over iterable objects like arrays, strings, and other iterable collections. It is preferred when you need to loop through values, not keys or indexes.

    ```javascript
    let arr = [10, 20, 30];
    for (let value of arr) {
      console.log(value); // Prints values 10, 20, 30
    }
    ```

## 3. Break and Continue

 `break` Statement
The `break` statement is used to exit a loop or `switch` statement before its normal termination.

    ```javascript
    for (let i = 0; i < 10; i++) {
      if (i === 5) {
        break; // Exit loop when i is 5
      }
      console.log(i); // Prints numbers 0 to 4
    }
    ```

 `continue` Statement
The `continue` statement is used to skip the current iteration of a loop and continue with the next iteration.

    ```javascript
    for (let i = 0; i < 5; i++) {
      if (i === 3) {
        continue; // Skip when i is 3
      }
      console.log(i); // Prints numbers 0, 1, 2, 4
    }
    ```

 4. Error Handling Statements

### `try...catch` Statement
The `try...catch` statement allows you to test a block of code for errors and handle the error if one occurs.

    ```javascript
    try {
      let result = riskyOperation();
    } catch (error) {
      console.log('An error occurred:', error.message);
    }
    ```

 `finally` Block
The `finally` block executes code after `try...catch`, regardless of whether an error occurred or not. It is often used for cleanup tasks.

    ```javascript
    try {
      let result = riskyOperation();
    } catch (error) {
      console.log('An error occurred:', error.message);
    } finally {
      console.log('This block will run regardless of success or failure');
    }
    ```

 5. Ternary (Conditional) Operator
The ternary operator is a shorthand for `if...else` statements. It evaluates a condition and returns one of two values depending on whether the condition is true or false.

    ```javascript
    let age = 20;
    let canVote = (age >= 18) ? 'Yes' : 'No';
    console.log(canVote); // Prints 'Yes'
    ```

---

This structure ensures the flow remains intact without any interruptions due to code blocks. Let me know if you need further adjustments!

</details>
!!! note "type co-ersion, Nan"
    Implicit type coercion in javascript is the automatic conversion of value from one data type to another. 
    
    It takes place when the operands of an expression are of different data types.

    NaN property represents the “Not-a-Number” value. It indicates a value that is not a legal number. 


!!! note "Pass by value & pass by reference"
      For primitive data types when passed to another variable, are passed by value. A new space of memory for the copied value  is created.
      For Non- primitive data types 
      directly passes the location of the variable obj to the variable obj2. 
      In other words, the reference of the variable obj is passed to the variable obj2.

        ```typescript
        deep copyig of an object
        const obj1 = { a: 1 };
        const obj2 = { b: 2 };

        const newObj = Object.assign({}, obj1, obj2);

        console.log(newObj);
        // { a: 1, b: 2 }
        JSON.parse(JSON.stringify(obj1));
        const newObj = { ...obj1, ...obj2 };
        ```

<details>
  <summary><strong>Prototype, Scope, Scope Chaining, and Inheritance in JavaScript</strong></summary>

  In JavaScript, concepts like **prototypes**, **scope**, **scope chaining**, and **inheritance** are fundamental to understanding how the language works. These concepts dictate how properties, methods, and variables are accessed and inherited across objects and functions.

  **Prototype**: JavaScript uses **prototype-based inheritance**. Every JavaScript object has a prototype, which is another object from which it inherits properties and methods. The prototype chain allows you to access properties and methods that are not directly present on the object itself but are defined on its prototype.

  **Prototype Example**:

    ```javascript
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    Person.prototype.sayHello = function() {
      console.log('Hello, ' + this.name);
    };

    const john = new Person('John', 25);
    john.sayHello(); // Output: Hello, John
    ```

  In this example:
  - The `Person` constructor function creates objects with the properties `name` and `age`.
  - The `sayHello` method is added to `Person`'s prototype, meaning all instances of `Person` can access it, even though it's not directly defined on the instance itself.
  - When `john.sayHello()` is called, JavaScript looks for `sayHello` on `john`, but since it's not found, it checks `john`'s prototype.

  **Scope**: In JavaScript, **scope** refers to the context in which a variable is declared and accessible. There are two main types of scope:
  - **Global Scope**: Variables declared outside of any function are in the global scope and can be accessed from anywhere in the program.
  - **Function Scope**: Variables declared inside a function are only accessible within that function.

  **Scope Example**:

    ```javascript
    let globalVar = 'I am global';

    function checkScope() {
      let localVar = 'I am local';
      console.log(globalVar); // I am global
      console.log(localVar); // I am local
    }

    checkScope();
    console.log(globalVar); // I am global
    // console.log(localVar); // Error: localVar is not defined
    ```

  In this example, `globalVar` is accessible both inside and outside the function, while `localVar` is only accessible inside the `checkScope` function.

  **Scope Chaining**: JavaScript uses **scope chaining** to resolve variable references. If a variable is not found in the current scope, JavaScript looks up the chain of scopes until it either finds the variable or reaches the global scope. If the variable is not found in the global scope, an error is thrown.

  **Scope Chaining Example**:

    ```javascript
    let globalVar = 'I am global';

    function outerFunction() {
      let outerVar = 'I am outer';

      function innerFunction() {
        let innerVar = 'I am inner';
        console.log(globalVar); // I am global
        console.log(outerVar); // I am outer
        console.log(innerVar); // I am inner
      }

      innerFunction();
    }

    outerFunction();
    ```

  In this example, `innerFunction` has access to variables defined in both `outerFunction` and the global scope, demonstrating scope chaining.

  **Inheritance**: JavaScript uses **prototype-based inheritance** rather than classical inheritance. Objects can inherit properties and methods from other objects through their prototype chain.

  **Inheritance Example**:

    ```javascript
    function Animal(name) {
      this.name = name;
    }

    Animal.prototype.sayHello = function() {
      console.log('Hello, I am ' + this.name);
    };

    function Dog(name) {
      Animal.call(this, name); // Inherit properties from Animal
    }

    Dog.prototype = Object.create(Animal.prototype); // Inherit methods from Animal
    Dog.prototype.constructor = Dog;

    const dog = new Dog('Buddy');
    dog.sayHello(); // Output: Hello, I am Buddy
    ```

  In this example:
  - `Dog` inherits from `Animal` using `Object.create(Animal.prototype)`.
  - The `call` method is used to inherit properties from `Animal` within the `Dog` constructor function.
  - `Dog` instances can now call `sayHello`, which was defined on the `Animal` prototype.

</details>


<details><summary><strong>Event Bubbling and Event Capturing</strong></summary>
  # Event Bubbling and Event Capturing in JavaScript

Event bubbling and event capturing are two phases of event propagation in the DOM (Document Object Model). When an event is triggered, it propagates through the DOM either from the target element to the root (bubbling) or from the root to the target element (capturing). These phases determine the order in which event listeners are called.

 1. Event Bubbling

In event bubbling, the event starts from the target element and bubbles up to the root element. It means that the innermost event listener is triggered first, and the event bubbles up to outer elements.

 Event Bubbling Example

    ```javascript
    // HTML
    <div id="parent">
      <button id="child">Click me</button>
    </div>

    // JavaScript
    document.getElementById('parent').addEventListener('click', function() {
      alert('Parent clicked');
    });

    document.getElementById('child').addEventListener('click', function() {
      alert('Child clicked');
    });
    ```

In this example:
1. When you click the **child button**, the event will first trigger the **child's** event listener.
2. After that, the event will bubble up and trigger the **parent's** event listener.

 Stopping Event Bubbling
You can stop event bubbling by calling the `stopPropagation()` method within the event handler.

    ```javascript
    document.getElementById('child').addEventListener('click', function(event) {
      alert('Child clicked');
      event.stopPropagation(); // Stops the event from bubbling up
    });
    ```

 2. Event Capturing (Trickling)

In event capturing (or trickling), the event starts from the root element and trickles down to the target element. This is the opposite of event bubbling. The outermost event listener is triggered first, and the event then propagates down to the target element.

 Event Capturing Example

To enable capturing, you need to pass an additional `true` value as the third argument to `addEventListener`.

    ```javascript
    // HTML
    <div id="parent">
      <button id="child">Click me</button>
    </div>

    // JavaScript
    document.getElementById('parent').addEventListener('click', function() {
      alert('Parent clicked (capturing phase)');
    }, true);

    document.getElementById('child').addEventListener('click', function() {
      alert('Child clicked');
    });
    ```

In this example:
1. When you click the **child button**, the event will first trigger the **parent's** event listener in the capturing phase.
2. After that, it will trigger the **child's** event listener.

 Stopping Event Capturing
You can also stop event capturing by using the `stopPropagation()` method within the event handler.

    ```javascript
    document.getElementById('parent').addEventListener('click', function(event) {
      alert('Parent clicked');
      event.stopPropagation(); // Stops the event from propagating further
    }, true);
    ```

## 3. Methods Related to Event Bubbling and Capturing

JavaScript provides several methods that are useful in managing event propagation during the bubbling and capturing phases.

### `stopPropagation()`
This method stops the event from bubbling up or trickling down the DOM tree. It can be used in both event bubbling and capturing phases.

    ```javascript
    element.addEventListener('click', function(event) {
      event.stopPropagation();
    });
    ```

 `stopImmediatePropagation()`
This method not only stops the event from propagating but also prevents other listeners on the same element from being called.

    ```javascript
    element.addEventListener('click', function(event) {
      event.stopImmediatePropagation();
    });
    ```

 `preventDefault()`
This method prevents the default behavior of the event. It's commonly used for actions like form submission or link navigation.

    ```javascript
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevents the link from navigating
    });
    ```

 4. Event Listeners in Different Phases

By default, event listeners are added in the **bubbling phase**. However, you can specify whether an event listener should be triggered in the capturing phase by passing `true` as the third argument to `addEventListener`.

 Bubbling Phase (Default)
    ```javascript
    element.addEventListener('click', function() {
      console.log('Event in bubbling phase');
    });
    ```

 Capturing Phase
    ```javascript
    element.addEventListener('click', function() {
      console.log('Event in capturing phase');
    }, true);  // `true` enables capturing phase
    ```

---

This structure helps explain both event bubbling and capturing clearly while keeping the flow intact.

</details>

## Functions
  <details>
  <summary><strong>JavaScript Functions</strong></summary>

  <p><strong>Higher-Order Functions</strong></p>
  <p>
    A higher-order function is a function that can take other functions as arguments or return a function as its result. This allows you to compose functions and create more reusable and flexible code.
  </p>
  <pre>
    ```javascript
    function mapArray(arr, fn) {
      return arr.map(fn);
    }
    const result = mapArray([1, 2, 3], x => x * 2);
    console.log(result); // [2, 4, 6]
    ```
  </pre>

  <p><strong>Anonymous Functions</strong></p>
  <p>
    Anonymous functions are functions that do not have a name. They are often used as arguments to higher-order functions or assigned to variables for one-time use.
  </p>
  <pre>
    ```javascript
    setTimeout(function() {
      console.log('Hello, World!');
    }, 1000);
    ```
  </pre>

  <p><strong>Closures</strong></p>
  <p>
    A closure is a function that retains access to its lexical environment, even after the outer function has returned. This allows it to remember variables from the scope in which it was created.
  </p>
  <pre>
    ```javascript
    function outer() {
      let count = 0;
      return function inner() {
        count++;
        console.log(count);
      };
    }
    let counter = outer();
    counter(); // 1
    counter(); // 2
    ```
  </pre>

  <p><strong>Immediately Invoked Function Expression (IIFE)</strong></p>
  <p>
    An IIFE is a function expression that is invoked immediately after its definition. It is often used to create a new scope and avoid polluting the global namespace.
  </p>
  <pre>
    ```javascript
    (function() {
      let message = 'Hello, World!';
      console.log(message);
    })();
    ```
  </pre>

  <p><strong>call() Method</strong></p>
  <p>
    The `call()` method invokes a function with a specified `this` value and individual arguments. It is commonly used to set the context of a function.
  </p>
  <pre>
    ```javascript
    function greet(name) {
      console.log(`Hello, ${name}`);
    }
    greet.call(null, 'John'); // Hello, John
    ```
  </pre>

  <p><strong>apply() Method</strong></p>
  <p>
    The `apply()` method is similar to `call()`, but it takes the arguments as an array. It's useful when you want to pass a list of arguments to a function.
  </p>
  <pre>
    ```javascript
    function greet(name, age) {
      console.log(`${name} is ${age} years old.`);
    }
    greet.apply(null, ['Alice', 25]); // Alice is 25 years old.
    ```
  </pre>

  <p><strong>bind() Method</strong></p>
  <p>
    The `bind()` method creates a new function with a specified `this` value and initial arguments, which can then be invoked later.
  </p>
  <pre>
    ```javascript
    function greet(name) {
      console.log(`Hello, ${name}`);
    }
    const greetJohn = greet.bind(null, 'John');
    greetJohn(); // Hello, John
    ```
  </pre>

  <p><strong>exec() Method</strong></p>
  <p>
    The `exec()` method is used with regular expressions to execute a search for a match in a string. It returns an array of matched results or `null` if no match is found.
  </p>
  <pre>
    ```javascript
    const regex = /hello/;
    const result = regex.exec('hello world');
    console.log(result); // ['hello']
    ```
  </pre>

  <p><strong>test() Method</strong></p>
  <p>
    The `test()` method is used to test whether a pattern exists in a string, returning `true` or `false` based on the result.
  </p>
  <pre>
    ```javascript
    const regex = /world/;
    const result = regex.test('hello world');
    console.log(result); // true
    ```
  </pre>

  <p><strong>Currying</strong></p>
  <p>
    Currying is a technique where a function is transformed into a sequence of functions that each take one argument and return a new function. It allows partial application of functions.
  </p>
  <pre>
    ```javascript
    function add(a) {
      return function(b) {
        return a + b;
      };
    }
    const add5 = add(5);
    console.log(add5(10)); // 15
    ```
  </pre>

  <p><strong>Callback Functions</strong></p>
  <p>
    A callback function is a function that is passed into another function as an argument, to be executed later.
  </p>
  <pre>
    ```javascript
    function fetchData(callback) {
      setTimeout(() => {
        callback('Data fetched');
      }, 1000);
    }
    fetchData(message => console.log(message)); // Data fetched
    ```
  </pre>

  <p><strong>Recursion</strong></p>
  <p>
    Recursion is when a function calls itself in order to solve a problem. It often involves a base case to stop the recursion and prevent an infinite loop.
  </p>
  <pre>
    ```javascript
    function factorial(n) {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }
    console.log(factorial(5)); // 120
    ```
  </pre>

  <p><strong>Arrow Functions</strong></p>
  <p>
    Arrow functions provide a shorter syntax for writing functions. They also do not bind their own `this`, instead they inherit it from the enclosing scope.
  </p>
  <pre>
    ```javascript
    const add = (a, b) => a + b;
    console.log(add(2, 3)); // 5
    ```
  </pre>

  <p><strong>Rest and Spread Operators</strong></p>
  <p>
    The rest operator (`...`) allows you to collect multiple arguments into an array. The spread operator (`...`) allows you to expand an array or object into individual elements.
  </p>
  <pre>
    ```javascript
    // Rest
    function sum(...numbers) {
      return numbers.reduce((a, b) => a + b, 0);
    }
    console.log(sum(1, 2, 3)); // 6

    // Spread
    const arr1 = [1, 2, 3];
    const arr2 = [...arr1, 4, 5];
    console.log(arr2); // [1, 2, 3, 4, 5]
    ```
  </pre>

  <p><strong>Shallow Copy vs Deep Copy</strong></p>
  <p>
    A shallow copy copies the top-level properties of an object, whereas a deep copy duplicates the entire structure, including nested objects.
  </p>
  <pre>
    ```javascript
    // Shallow Copy
    const original = { a: 1, b: { c: 2 } };
    const shallow = { ...original };
    shallow.b.c = 3;
    console.log(original.b.c); // 3

    // Deep Copy
    const deepCopy = JSON.parse(JSON.stringify(original));
    deepCopy.b.c = 4;
    console.log(original.b.c); // 3
    ```
  </pre>

</details>

## Strings
<details>
  <summary><strong>JavaScript Strings</strong></summary>

  <p><strong>What is a String in JavaScript?</strong></p>
  <p>
    A string in JavaScript is a sequence of characters used to represent text. Strings are immutable, meaning once created, their values cannot be changed. Strings can be enclosed in single quotes (`'`), double quotes (`"`), or backticks (`` ` ``).
  </p>
  <pre>
    ```javascript
    let str1 = 'Hello';
    let str2 = "World";
    let str3 = `Hello, World!`;
    console.log(str3); // Hello, World!
    ```
  </pre>

  <p><strong>String Length</strong></p>
  <p>
    The `length` property of a string returns the number of characters in the string.
  </p>
  <pre>
    ```javascript
    let str = "Hello, World!";
    console.log(str.length); // 13
    ```
  </pre>

  <p><strong>String Methods</strong></p>
  
  <p><strong>charAt()</strong></p>
  <p>
    The `charAt()` method returns the character at a specified index (position) in a string.
  </p>
  <pre>
    ```javascript
    let str = "JavaScript";
    console.log(str.charAt(4)); // S
    ```
  </pre>

  <p><strong>indexOf()</strong></p>
  <p>
    The `indexOf()` method returns the index of the first occurrence of a specified value in a string. If the value is not found, it returns `-1`.
  </p>
  <pre>
    ```javascript
    let str = "Hello, World!";
    console.log(str.indexOf("World")); // 7
    ```
  </pre>

  <p><strong>slice()</strong></p>
  <p>
    The `slice()` method extracts a section of a string and returns a new string. It takes two parameters: the starting index and the ending index (not inclusive).
  </p>
  <pre>
    ```javascript
    let str = "JavaScript";
    console.log(str.slice(0, 4)); // Java
    ```
  </pre>

  <p><strong>substring()</strong></p>
  <p>
    The `substring()` method returns a new string between two specified indices. It behaves similarly to `slice()`, but with a few differences, such as treating negative indices as `0`.
  </p>
  <pre>
    ```javascript
    let str = "JavaScript";
    console.log(str.substring(0, 4)); // Java
    ```
  </pre>

  <p><strong>replace()</strong></p>
  <p>
    The `replace()` method searches for a specified pattern (string or regular expression) and replaces it with a new substring.
  </p>
  <pre>
    ```javascript
    let str = "Hello, World!";
    let newStr = str.replace("World", "JavaScript");
    console.log(newStr); // Hello, JavaScript!
    ```
  </pre>

  <p><strong>toLowerCase() and toUpperCase()</strong></p>
  <p>
    The `toLowerCase()` method converts all characters in a string to lowercase, while the `toUpperCase()` method converts all characters to uppercase.
  </p>
  <pre>
    ```javascript
    let str = "JavaScript";
    console.log(str.toLowerCase()); // javascript
    console.log(str.toUpperCase()); // JAVASCRIPT
    ```
  </pre>

  <p><strong>trim()</strong></p>
  <p>
    The `trim()` method removes any leading and trailing whitespace from a string.
  </p>
  <pre>
    ```javascript
    let str = "  Hello, World!  ";
    console.log(str.trim()); // Hello, World!
    ```
  </pre>

  <p><strong>split()</strong></p>
  <p>
    The `split()` method splits a string into an array of substrings based on a specified separator.
  </p>
  <pre>
    ```javascript
    let str = "Apple, Banana, Cherry";
    let arr = str.split(", ");
    console.log(arr); // ["Apple", "Banana", "Cherry"]
    ```
  </pre>

  <p><strong>concat()</strong></p>
  <p>
    The `concat()` method is used to join two or more strings together.
  </p>
  <pre>
    ```javascript
    let str1 = "Hello";
    let str2 = "World";
    let result = str1.concat(", ", str2);
    console.log(result); // Hello, World
    ```
  </pre>

  <p><strong>startsWith() and endsWith()</strong></p>
  <p>
    The `startsWith()` method checks if a string starts with a specified substring, while `endsWith()` checks if it ends with a specified substring.
  </p>
  <pre>
    ```javascript
    let str = "Hello, World!";
    console.log(str.startsWith("Hello")); // true
    console.log(str.endsWith("!")); // true
    ```
  </pre>

  <p><strong>includes()</strong></p>
  <p>
    The `includes()` method checks if a string contains a specified substring, returning `true` if found and `false` otherwise.
  </p>
  <pre>
    ```javascript
    let str = "Hello, World!";
    console.log(str.includes("World")); // true
    console.log(str.includes("world")); // false
    ```
  </pre>

  <p><strong>repeat()</strong></p>
  <p>
    The `repeat()` method returns a new string that repeats the original string a specified number of times.
  </p>
  <pre>
    ```javascript
    let str = "JavaScript ";
    console.log(str.repeat(3)); // JavaScript JavaScript JavaScript 
    ```
  </pre>

  <p><strong>String Template Literals</strong></p>
  <p>
    Template literals, denoted by backticks (`` ` ``), allow you to embed expressions within a string. This makes string concatenation and formatting easier.
  </p>
  <pre>
    ```javascript
    let name = "John";
    let age = 30;
    let greeting = `Hello, my name is ${name} and I am ${age} years old.`;
    console.log(greeting); // Hello, my name is John and I am 30 years old.
    ```
  </pre>

  <p><strong>Escape Characters</strong></p>
  <p>
    Escape characters are used in strings to represent special characters that cannot be typed directly or need to be escaped for syntax reasons. Some common escape characters include:
    <ul>
      <li><code>\n</code> - Newline</li>
      <li><code>\t</code> - Tab</li>
      <li><code>\\</code> - Backslash</li>
      <li><code>\'</code> - Single quote</li>
      <li><code>\"</code> - Double quote</li>
    </ul>
  </p>
  <pre>
    ```javascript
    let str = "Hello,\nWorld!";
    console.log(str); 
    // Output: 
    // Hello,
    // World!
    ```
  </pre>

  <p><strong>Unicode and Special Characters</strong></p>
  <p>
    You can represent special characters and characters from other languages using Unicode escape sequences. For example, `<code>\uXXXX</code>` allows you to insert a Unicode character in the string.
  </p>
  <pre>
    ```javascript
    let str = "\u00A9 2024 JavaScript";
    console.log(str); // © 2024 JavaScript
    ```
  </pre>

  <p><strong>Important Notes</strong></p>
  <ul>
    <li>Strings in JavaScript are immutable. You can't modify the content of a string directly. Instead, you must create a new string.</li>
    <li>Strings are indexed by their characters, starting at index `0`.</li>
    <li>Most of the string methods return a new string and do not modify the original string.</li>
    <li>You can use template literals for multi-line strings or embedded expressions.</li>
  </ul>
</details>


## Arrays
<details>
  <summary><strong>JavaScript Arrays</strong></summary>

  <p><strong>What is an Array in JavaScript?</strong></p>
  <p>
    An array in JavaScript is a list-like object used to store multiple values in a single variable. Arrays are ordered collections, meaning the values are indexed, and the elements in an array can be accessed using these indexes.
    Arrays are dynamic in nature, meaning their size can change during execution.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3, 4, 5];
    console.log(arr); // [1, 2, 3, 4, 5]
    ```
  </pre>

  <p><strong>Array Length</strong></p>
  <p>
    The `length` property of an array returns the number of elements in the array. It can be used to determine the size of the array.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3, 4, 5];
    console.log(arr.length); // 5
    ```
  </pre>

  <p><strong>Accessing Array Elements</strong></p>
  <p>
    Array elements can be accessed using their index, starting from `0` for the first element.
  </p>
  <pre>
    ```javascript
    let arr = ['apple', 'banana', 'cherry'];
    console.log(arr[1]); // banana
    ```
  </pre>

  <p><strong>Array Methods</strong></p>

  <p><strong>push()</strong></p>
  <p>
    The `push()` method adds one or more elements to the end of an array and returns the new array length.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3];
    arr.push(4);
    console.log(arr); // [1, 2, 3, 4]
    ```
  </pre>

  <p><strong>pop()</strong></p>
  <p>
    The `pop()` method removes the last element from an array and returns that element.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3];
    let removed = arr.pop();
    console.log(arr); // [1, 2]
    console.log(removed); // 3
    ```
  </pre>

  <p><strong>shift()</strong></p>
  <p>
    The `shift()` method removes the first element from an array and returns that element.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3];
    let removed = arr.shift();
    console.log(arr); // [2, 3]
    console.log(removed); // 1
    ```
  </pre>

  <p><strong>unshift()</strong></p>
  <p>
    The `unshift()` method adds one or more elements to the beginning of an array and returns the new length of the array.
  </p>
  <pre>
    ```javascript
    let arr = [2, 3];
    arr.unshift(1);
    console.log(arr); // [1, 2, 3]
    ```
  </pre>

  <p><strong>concat()</strong></p>
  <p>
    The `concat()` method combines two or more arrays or values and returns a new array.
  </p>
  <pre>
    ```javascript
    let arr1 = [1, 2];
    let arr2 = [3, 4];
    let result = arr1.concat(arr2);
    console.log(result); // [1, 2, 3, 4]
    ```
  </pre>

  <p><strong>slice()</strong></p>
  <p>
    The `slice()` method returns a shallow copy of a portion of an array into a new array. It takes two arguments: start index and end index (not inclusive).
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3, 4, 5];
    let sliced = arr.slice(1, 4);
    console.log(sliced); // [2, 3, 4]
    ```
  </pre>

  <p><strong>splice()</strong></p>
  <p>
    The `splice()` method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3, 4, 5];
    arr.splice(2, 1, 'a', 'b');
    console.log(arr); // [1, 2, 'a', 'b', 4, 5]
    ```
  </pre>

  <p><strong>forEach()</strong></p>
  <p>
    The `forEach()` method executes a provided function once for each array element.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3];
    arr.forEach(element => console.log(element)); // 1 2 3
    ```
  </pre>

  <p><strong>map()</strong></p>
  <p>
    The `map()` method creates a new array populated with the results of calling a provided function on every element in the array.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3];
    let result = arr.map(x => x * 2);
    console.log(result); // [2, 4, 6]
    ```
  </pre>

  <p><strong>filter()</strong></p>
  <p>
    The `filter()` method creates a new array with all elements that pass the test implemented by the provided function.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3, 4, 5];
    let result = arr.filter(x => x > 2);
    console.log(result); // [3, 4, 5]
    ```
  </pre>

  <p><strong>reduce()</strong></p>
  <p>
    The `reduce()` method applies a function to each element in the array (from left to right) to reduce it to a single value.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3, 4];
    let sum = arr.reduce((acc, curr) => acc + curr, 0);
    console.log(sum); // 10
    ```
  </pre>

  <p><strong>find()</strong></p>
  <p>
    The `find()` method returns the first element in the array that satisfies the provided testing function.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3, 4];
    let result = arr.find(x => x > 2);
    console.log(result); // 3
    ```
  </pre>

  <p><strong>indexOf()</strong></p>
  <p>
    The `indexOf()` method returns the index of the first occurrence of a specified value in the array. If the value is not found, it returns `-1`.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3, 4];
    console.log(arr.indexOf(3)); // 2
    console.log(arr.indexOf(5)); // -1
    ```
  </pre>

  <p><strong>sort()</strong></p>
  <p>
    The `sort()` method sorts the elements of an array in place and returns the sorted array.
  </p>
  <pre>
    ```javascript
    let arr = [4, 2, 3, 1];
    arr.sort();
    console.log(arr); // [1, 2, 3, 4]
    ```
  </pre>

  <p><strong>reverse()</strong></p>
  <p>
    The `reverse()` method reverses the order of the elements in an array in place.
  </p>
  <pre>
    ```javascript
    let arr = [1, 2, 3, 4];
    arr.reverse();
    console.log(arr); // [4, 3, 2, 1]
    ```
  </pre>

  <p><strong>flat()</strong></p>
  <p>
    The `flat()` method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
  </p>
  <pre>
    ```javascript
    let arr = [1, [2, [3, 4]], 5];
    let flattened = arr.flat(2);
    console
  ```
</details>

## Objects
<details>
  <summary><strong>JavaScript Objects</strong></summary>

  <p><strong>Overview</strong></p>
  <p>
    In JavaScript, an object is a standalone entity, with properties and types. It's similar to real-life objects, where each object has characteristics (properties) and behavior (methods). Objects are key-value pairs where the key is always a string (or Symbol), and the value can be any data type, including other objects.
  </p>

  <p><strong>Creating Objects</strong></p>
  <pre>
    ```javascript
    // Using Object Literal Syntax
    let person = {
      name: "John",
      age: 30,
      greet: function() { console.log("Hello!"); }
    };

    // Using the Object constructor
    let car = new Object();
    car.make = "Toyota";
    car.model = "Corolla";
    car.year = 2020;
    ```
  </pre>

  <p><strong>Accessing Object Properties</strong></p>
  <p>
    There are two ways to access properties of an object: dot notation and bracket notation.
  </p>
  <pre>
    ```javascript
    let person = { name: "John", age: 30 };
    console.log(person.name);  // Dot notation
    console.log(person["age"]); // Bracket notation
    ```
  </pre>

  <p><strong>Modifying Object Properties</strong></p>
  <pre>
    ```javascript
    let person = { name: "John", age: 30 };
    person.age = 31;                // Modifies the existing property
    person["name"] = "Doe";         // Modifies the property using bracket notation
    ```
  </pre>

  <p><strong>Adding New Properties</strong></p>
  <pre>
    ```javascript
    let person = { name: "John" };
    person.age = 30;               // Adding a new property using dot notation
    person["address"] = "New York"; // Adding a new property using bracket notation
    ```
  </pre>

  <p><strong>Deleting Properties</strong></p>
  <pre>
    ```javascript
    let person = { name: "John", age: 30 };
    delete person.age;  // Removes the 'age' property from the object
    ```
  </pre>

  <p><strong>Methods in Objects</strong></p>
  <p>
    An object can also contain methods, which are functions associated with the object. Methods are defined using function syntax and can be called using dot notation.
  </p>
  <pre>
    ```javascript
    let person = {
      name: "John",
      greet: function() {
        console.log("Hello, " + this.name);
      }
    };

    person.greet();  // Outputs: "Hello, John"
    ```
  </pre>

  <p><strong>this Keyword</strong></p>
  <p>
    Inside an object's method, `this` refers to the object itself. It allows you to access properties and methods of the current object.
  </p>
  <pre>
    ```javascript
    let person = {
      name: "John",
      greet: function() {
        console.log("Hello, " + this.name);
      }
    };

    person.greet();  // "Hello, John"
    ```
  </pre>

  <p><strong>Object Methods</strong></p>
  <p>JavaScript provides several built-in methods for working with objects:</p>
  <ul>
    <li><strong>Object.keys(obj)</strong> - Returns an array of the object's own property names (keys).</li>
    <li><strong>Object.values(obj)</strong> - Returns an array of the object's own property values.</li>
    <li><strong>Object.entries(obj)</strong> - Returns an array of key-value pairs for the object's properties.</li>
    <li><strong>Object.assign(target, source)</strong> - Copies all enumerable properties from one or more source objects to a target object.</li>
    <li><strong>Object.freeze(obj)</strong> - Freezes an object, preventing new properties from being added and existing properties from being modified or deleted.</li>
    <li><strong>Object.isFrozen(obj)</strong> - Checks if an object is frozen.</li>
    <li><strong>Object.hasOwnProperty(prop)</strong> - Checks if the object has a property with the specified name as its own property (not inherited).</li>
  </ul>

  <p><strong>Object Destructuring</strong></p>
  <p>
    Destructuring is a convenient way to extract values from an object and assign them to variables.
  </p>
  <pre>
    ```javascript
    const person = { name: "John", age: 30 };
    const { name, age } = person;  // Destructuring
    console.log(name);  // John
    console.log(age);   // 30
    ```
  </pre>

  <p><strong>Object Spread Syntax</strong></p>
  <p>
    The spread syntax allows you to copy properties from one object to another, or merge multiple objects into one.
  </p>
  <pre>
    ```javascript
    const person = { name: "John", age: 30 };
    const newPerson = { ...person, address: "New York" };
    console.log(newPerson);  // { name: "John", age: 30, address: "New York" }
    ```
  </pre>

  <p><strong>Constructor Functions</strong></p>
  <p>
    Constructor functions are a way to create reusable templates for creating new objects.
  </p>
  <pre>
    ```javascript
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    const john = new Person("John", 30);
    console.log(john.name);  // John
    ```
  </pre>

  <p><strong>Object Prototypes</strong></p>
  <p>
    Every JavaScript object has an internal prototype property, which allows objects to inherit properties and methods from other objects.
  </p>
  <pre>
    ```javascript
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    Person.prototype.greet = function() {
      console.log("Hello, " + this.name);
    };

    const john = new Person("John", 30);
    john.greet();  // Hello, John
    ```
  </pre>

  <p><strong>Prototype Chain</strong></p>
  <p>
    Objects in JavaScript are linked to other objects through a prototype chain. This chain is used to look up properties and methods that are not found on the object itself but on its prototype.
  </p>
  <pre>
    ```javascript
    function Animal(name) {
      this.name = name;
    }

    Animal.prototype.sayHello = function() {
      console.log("Hello, " + this.name);
    };

    function Dog(name) {
      Animal.call(this, name);  // Inherit from Animal
    }

    Dog.prototype = Object.create(Animal.prototype);  // Link Dog prototype to Animal prototype
    Dog.prototype.constructor = Dog;

    const dog = new Dog("Rex");
    dog.sayHello();  // Hello, Rex
    ```
  </pre>
  <ul>
    <li><strong>Creating Objects</strong>: You can create objects either using an object literal (<code>{}</code>) or the <code>new Object()</code> syntax.</li>
    <li><strong>Accessing Properties</strong>: You can access properties via dot notation (<code>object.property</code>) or bracket notation (<code>object['property']</code>).</li>
    <li><strong>Modifying and Adding Properties</strong>: Properties can be modified or added to an object using dot or bracket notation. Example: <code>object.property = newValue;</code></li>
    <li><strong>Methods in Objects</strong>: Functions stored as object properties are called methods. They can access other properties of the object via <code>this</code>. Example:
      <pre>const person = {
        name: 'Alice',
        greet: function() {
          console.log('Hello, ' + this.name);
        }
      }</pre>
    </li>
    <li><strong>Object Methods</strong>: JavaScript provides built-in methods for object manipulation, such as <code>Object.keys()</code>, <code>Object.values()</code>, and <code>Object.assign()</code>. Example:
      <pre>Object.keys(person); // ['name', 'greet']</pre>
    </li>
    <li><strong>Destructuring</strong>: Allows easy extraction of properties from an object into variables. Example:
      <pre>const { name, greet } = person;</pre>
    </li>
    <li><strong>Spread Syntax</strong>: Allows merging objects or cloning objects in a concise way. Example:
      <pre>const newPerson = {...person};</pre>
    </li>
    <li><strong>Constructor Functions</strong>: Custom functions that act as templates for creating objects. Example:
      <pre>function Person(name) {
        this.name = name;
      }
      const person1 = new Person('John');</pre>
    </li>
    <li><strong>Prototype and Prototype Chain</strong>: JavaScript objects inherit properties from a prototype chain, allowing object properties and methods to be shared. Example:
      <pre>Object.getPrototypeOf(person);</pre>
    </li>
  </ul>

</details>


## Built in features
  <details>
  <summary><strong>JavaScript Built-in Features: Map, Set, WeakMap, WeakSet</strong></summary>

  <p><strong>Map</strong></p>
  <p>
    A `Map` is a collection of key-value pairs where both the keys and the values can be of any data type (objects, primitives, etc.). Maps remember the insertion order of the keys, unlike objects, where the keys are always converted to strings.
  </p>
  <pre>
    ```javascript
    let map = new Map();
    map.set('name', 'John');
    map.set('age', 30);
    console.log(map.get('name')); // John
    console.log(map.has('age')); // true
    console.log(map.size); // 2
    map.delete('age');
    console.log(map.has('age')); // false
    map.clear();
    console.log(map.size); // 0
    ```
  </pre>
  <p><strong>Common Methods:</strong></p>
  <ul>
    <li><strong>set(key, value)</strong> - Adds a new key-value pair to the Map or updates an existing one.</li>
    <li><strong>get(key)</strong> - Retrieves the value associated with the key.</li>
    <li><strong>has(key)</strong> - Returns true if the key exists, false otherwise.</li>
    <li><strong>delete(key)</strong> - Removes the key-value pair by key.</li>
    <li><strong>clear()</strong> - Removes all key-value pairs from the Map.</li>
    <li><strong>size</strong> - Returns the number of key-value pairs in the Map.</li>
  </ul>

  <p><strong>Set</strong></p>
  <p>
    A `Set` is a collection of unique values, where each value can only occur once. Sets are useful when you need to store a list of unique items without duplicates.
  </p>
  <pre>
    ```javascript
    let set = new Set();
    set.add(1);
    set.add(2);
    set.add(3);
    set.add(2); // Duplicates are ignored
    console.log(set); // Set { 1, 2, 3 }
    console.log(set.has(1)); // true
    console.log(set.size); // 3
    set.delete(2);
    console.log(set.has(2)); // false
    set.clear();
    console.log(set.size); // 0
    ```
  </pre>
  <p><strong>Common Methods:</strong></p>
  <ul>
    <li><strong>add(value)</strong> - Adds a new value to the Set. If the value already exists, it does nothing.</li>
    <li><strong>has(value)</strong> - Checks if a value exists in the Set.</li>
    <li><strong>delete(value)</strong> - Removes the specified value from the Set.</li>
    <li><strong>clear()</strong> - Clears all values from the Set.</li>
    <li><strong>size</strong> - Returns the number of values in the Set.</li>
  </ul>

  <p><strong>WeakMap</strong>
  </details>

  <details>
  <summary><strong>Additional JavaScript Built-in Features</strong></summary>

  <p><strong>Promise</strong></p>
  <p>
    A `Promise` is an object representing the eventual completion or failure of an asynchronous operation. Promises are used to handle asynchronous operations in a more manageable way.
  </p>
  <pre>
    ```javascript
    let promise = new Promise((resolve, reject) => {
      let success = true;
      if (success) {
        resolve("Operation successful!");
      } else {
        reject("Operation failed!");
      }
    });

    promise.then(result => {
      console.log(result);  // 'Operation successful!'
    }).catch(error => {
      console.log(error);   // 'Operation failed!'
    });
    ```
  </pre>
  <p><strong>Common Methods:</strong></p>
  <ul>
    <li><strong>then(onFulfilled, onRejected)</strong> - Adds fulfillment and rejection handlers to the promise.</li>
    <li><strong>catch(onRejected)</strong> - Adds a rejection handler to the promise.</li>
    <li><strong>finally(onFinally)</strong> - Adds a handler that will be invoked after the promise settles (either resolved or rejected).</li>
    <li><strong>Promise.all()</strong> - Returns a promise that resolves when all promises in an iterable have resolved.</li>
    <li><strong>Promise.race()</strong> - Returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects.</li>
  </ul>

  <p><strong>Symbol</strong></p>
  <p>
    `Symbol` is a primitive data type introduced in ES6 that is often used to create unique property keys. Each symbol is guaranteed to be unique and can be used as a property key to avoid name clashes.
  </p>
  <pre>
    ```javascript
    let symbol1 = Symbol('desc');
    let symbol2 = Symbol('desc');
    console.log(symbol1 === symbol2); // false (unique symbols)
    ```
  </pre>
  <p><strong>Common Use:</strong></p>
  <ul>
    <li>Used for unique object property keys, to avoid property name conflicts.</li>
    <li>Commonly used in metaprogramming for defining internal object behavior (e.g., `Symbol.iterator`).</li>
  </ul>

  <p><strong>ArrayBuffer</strong></p>
  <p>
    An `ArrayBuffer` is a low-level object used to represent binary data in JavaScript. It is commonly used in situations where data needs to be read or written to byte-oriented buffers, such as in Web APIs like `fetch` and `WebSockets`.
  </p>
  <pre>
    ```javascript
    let buffer = new ArrayBuffer(16);  // Creates a buffer with 16 bytes
    let view = new DataView(buffer);   // Creates a DataView to interact with the buffer
    view.setInt8(0, 42);               // Sets the first byte to 42
    console.log(view.getInt8(0));      // 42
    ```
  </pre>
  <p><strong>Common Use:</strong></p>
  <ul>
    <li>Used for handling binary data in APIs such as `WebSockets`, `fetch`, and `FileReader`.</li>
    <li>Commonly used in combination with typed arrays like `Int8Array`, `Uint8Array`, `Float32Array`, etc.</li>
  </ul>

  <p><strong>Date</strong></p>
  <p>
    The `Date` object is used for handling dates and times in JavaScript. It provides methods for parsing, formatting, and manipulating date and time values.
  </p>
  <pre>
    ```javascript
    let now = new Date();
    console.log(now);                 // Current date and time
    let specificDate = new Date(2024, 0, 1); // January 1, 2024
    console.log(specificDate);        // Date object representing January 1, 2024
    console.log(specificDate.getFullYear()); // 2024
    ```
  </pre>
  <p><strong>Common Methods:</strong></p>
  <ul>
    <li><strong>getDate()</strong> - Returns the day of the month.</li>
    <li><strong>getMonth()</strong> - Returns the month (0-11).</li>
    <li><strong>getFullYear()</strong> - Returns the 4-digit year.</li>
    <li><strong>getTime()</strong> - Returns the number of milliseconds since January 1, 1970.</li>
    <li><strong>toLocaleString()</strong> - Formats the date and time according to the local timezone and locale.</li>
  </ul>

  <p><strong>Error</strong></p>
  <p>
    The `Error` object is used to represent runtime errors in JavaScript. It is also the base object for custom error types like `SyntaxError`, `ReferenceError`, and `TypeError`.
  </p>
  <pre>
    ```javascript
    try {
      throw new Error("Something went wrong!");
    } catch (e) {
      console.log(e.message);  // 'Something went wrong!'
    }
    ```
  </pre>
  <p><strong>Common Error Types:</strong></p>
  <ul>
    <li><strong>SyntaxError</strong> - Raised when there is a syntax mistake in the code.</li>
    <li><strong>ReferenceError</strong> - Raised when a reference is made to a variable that does not exist.</li>
    <li><strong>TypeError</strong> - Raised when a value is not of the expected type.</li>
    <li><strong>RangeError</strong> - Raised when a value is not within an allowable range.</li>
  </ul>

  <p><strong>RegExp</strong></p>
  <p>
    The `RegExp` object is used for matching patterns in strings. Regular expressions provide powerful text-processing tools and are used extensively for tasks like validation, pattern searching, and replacement.
  </p>
  <pre>
    ```javascript
    let regex = /foo/;
    let str = "foobar";
    console.log(regex.test(str)); // true
    let result = str.replace(/foo/, "bar");
    console.log(result); // "barbar"
    ```
  </pre>
  <p><strong>Common Methods:</strong></p>
  <ul>
    <li><strong>test()</strong> - Tests whether a pattern exists in a string, returns true or false.</li>
    <li><strong>exec()</strong> - Executes a search for a match in a string and returns an array of matched results.</li>
    <li><strong>match()</strong> - Used on a string to return an array of all matches of the regular expression.</li>
    <li><strong>replace()</strong> - Used to replace matched substrings with a new string.</li>
  </ul>

</details>


## Asynchronous Programming
<details>
  <summary><strong>JavaScript Asynchronous Programming</strong></summary>

  <p><strong>Overview</strong></p>
  <p>
    Asynchronous programming in JavaScript allows non-blocking code execution. This is especially useful when dealing with I/O-bound tasks such as reading from files, making HTTP requests, or accessing databases. By using asynchronous programming techniques, JavaScript can execute tasks without freezing the main thread, providing a smoother user experience.
  </p>

  <p><strong>Why Asynchronous Programming?</strong></p>
  <p>
    JavaScript is single-threaded, meaning it can only execute one operation at a time. However, when dealing with tasks that take time (e.g., reading data from a server), it is inefficient to block the entire program while waiting for the task to complete. Asynchronous programming allows JavaScript to initiate a task, continue executing other code, and handle the task when it completes.
  </p>

  <p><strong>Key Concepts</strong></p>

  <ul>
    <li><strong>Callback Functions</strong>: Functions passed as arguments to other functions to be called once a task completes.</li>
    <li><strong>Promises</strong>: Objects that represent the eventual completion (or failure) of an asynchronous operation.</li>
    <li><strong>Async/Await</strong>: A syntax for working with promises in a more synchronous manner, making code more readable.</li>
  </ul>

  <p><strong>1. Callback Functions</strong></p>
  <p>
    A callback is a function passed as an argument to another function and executed after the completion of an asynchronous operation.
  </p>
  <pre>
    ```javascript
    // Simple example of callback usage
    function fetchData(callback) {
      setTimeout(() => {
        callback("Data received!");
      }, 2000);
    }

    fetchData((data) => {
      console.log(data);  // Outputs: Data received!
    });
    ```
  </pre>

  <p><strong>Callback Hell</strong></p>
  <p>
    A common issue with callbacks is "callback hell", where callbacks are nested within each other, leading to hard-to-maintain code. This issue is often addressed using Promises or Async/Await.
  </p>
  <pre>
    ```javascript
    fetchData((data) => {
      console.log(data);
      fetchMoreData((moreData) => {
        console.log(moreData);
        fetchFinalData((finalData) => {
          console.log(finalData);
        });
      });
    });
    ```
  </pre>

  <p><strong>2. Promises</strong></p>
  <p>
    A promise represents a value that may be available now, or in the future, or never. It is an object that can be in one of three states: pending, resolved (fulfilled), or rejected.
  </p>
  <pre>
    ```javascript
    // Creating a Promise
    let promise = new Promise((resolve, reject) => {
      let success = true;  // Simulate success or failure
      if (success) {
        resolve("Operation successful!");
      } else {
        reject("Operation failed.");
      }
    });

    // Handling the Promise
    promise
      .then((result) => {
        console.log(result);  // Outputs: Operation successful!
      })
      .catch((error) => {
        console.error(error);  // Outputs: Operation failed.
      });
    ```
  </pre>

  <p><strong>Promise Chaining</strong></p>
  <p>
    Promises can be chained, allowing you to execute multiple asynchronous operations sequentially.
  </p>
  <pre>
    ```javascript
    function fetchData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Data received");
        }, 2000);
      });
    }

    fetchData()
      .then((data) => {
        console.log(data);  // Outputs: Data received
        return "More data";
      })
      .then((moreData) => {
        console.log(moreData);  // Outputs: More data
      })
      .catch((error) => {
        console.log(error);
      });
    ```
  </pre>

  <p><strong>3. Async/Await</strong></p>
  <p>
    Async/Await is a more modern and cleaner way of handling asynchronous operations. `async` functions always return a Promise. The `await` keyword can be used to wait for a Promise to resolve or reject before proceeding to the next line of code.
  </p>
  <pre>
    ```javascript
    // Using Async/Await
    async function fetchData() {
      let data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Data received!");
        }, 2000);
      });
      console.log(data);  // Outputs: Data received!
    }

    fetchData();
    ```
  </pre>

  <p><strong>Handling Multiple Promises</strong></p>
  <p>
    You can handle multiple promises simultaneously using methods like `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`.
  </p>

  <ul>
    <li><strong>Promise.all()</strong>: Waits for all promises to resolve or any to reject.</li>
    <li><strong>Promise.allSettled()</strong>: Waits for all promises to settle (either resolved or rejected).</li>
    <li><strong>Promise.race()</strong>: Resolves or rejects as soon as the first promise resolves or rejects.</li>
    <li><strong>Promise.any()</strong>: Resolves when the first promise resolves, ignoring rejected promises.</li>
  </ul>
  <pre>
    ```javascript
    // Using Promise.all
    let promise1 = new Promise((resolve) => setTimeout(() => resolve("First"), 1000));
    let promise2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 2000));

    Promise.all([promise1, promise2]).then((values) => {
      console.log(values);  // Outputs: ["First", "Second"]
    });

    // Using Promise.race
    Promise.race([promise1, promise2]).then((value) => {
      console.log(value);  // Outputs: First (because it's resolved first)
    });
    ```
  </pre>

  <p><strong>4. Error Handling with Async/Await</strong></p>
  <p>
    When using async/await, you can handle errors using try-catch blocks, similar to synchronous code.
  </p>
  <pre>
    ```javascript
    async function fetchData() {
      try {
        let data = await new Promise((resolve, reject) => {
          let success = false;
          if (success) {
            resolve("Data fetched successfully");
          } else {
            reject("Error fetching data");
          }
        });
        console.log(data);
      } catch (error) {
        console.error(error);  // Outputs: Error fetching data
      }
    }

    fetchData();
    ```
  </pre>

  <p><strong>5. Event Loop and Callbacks</strong></p>
  <p>
    The JavaScript event loop is responsible for managing the execution of multiple pieces of code, ensuring that the main thread is not blocked. Asynchronous callbacks are placed in the **callback queue**, and once the stack is empty, the event loop moves callbacks to the call stack for execution.
  </p>
  <pre>
    ```javascript
    console.log("Start");

    setTimeout(() => {
      console.log("Async Task");
    }, 2000);

    console.log("End");
    ```
    <p>Outputs:</p>
    <pre>Start</pre>
    <pre>End</pre>
    <pre>Async Task</pre>
  </pre>

  <p><strong>6. Conclusion</strong></p>
  <p>
    Asynchronous programming is essential for handling time-consuming tasks in JavaScript. By using callbacks, promises, or async/await, JavaScript provides powerful ways to manage concurrency without blocking the execution of other code. Understanding how asynchronous code works is key to building efficient and responsive applications.
  </p>
  Key Concepts:
<ul>
    <li><strong>Callback Functions</strong>: Functions that are passed as arguments to other functions to execute after an asynchronous task is complete.</li>
    <li><strong>Promises</strong>: Objects representing the eventual completion (or failure) of an asynchronous operation. Promises allow better chaining and error handling compared to callbacks.</li>
    <li><strong>Async/Await</strong>: A modern syntax for working with promises that allows writing asynchronous code in a more synchronous, readable style.</li>
    <li><strong>Error Handling</strong>: `try-catch` can be used for error handling in async functions to catch errors from promises.</li>
    <li><strong>Event Loop</strong>: Manages asynchronous tasks in JavaScript, ensuring the main thread is not blocked by time-consuming tasks.</li>
    <li><strong>Promise Methods</strong>: Methods like `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()` provide powerful ways to work with multiple promises.</li>
  </ul>

</details>
