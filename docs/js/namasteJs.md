<details><summary> 1. How js Works</summary>

    ```typescript

        Js creates global execution context has two components
        1. memory component alias variable environment
            * creates memory before code execution for var and fucniton syntax
                var as undefined
                function with its syntax
        2. code component
            * executes code line by line 
    ```

</details>


<details><summary> 2. How js code is executed</summary>

    ```typescript
    on Every fucntion invocation js engine creates a exectuion context in a call stack
    * in call stack on fucniton invocation new memroy component and new code component gets 
        - upon completion of that function it deletes the executuion context
    ```
</details>
<details><summary> 3. Hoisting in js
</summary>

    ```typescript
        its the behaviour of js where the decalred variables and fucniton will be moved to top of its scope by 
        allocation memory for var as undefined and whole fucntion syntax, so if any code tries to  access var or fucniton befores it declaration, it will not result in error. var will result in undefined and function can be invoked
    ```
</details>

<details><summary> 4. Functions work in js</summary>

    ```typescript
        - in mnormal funcitons it can be invoked before its declaration because of hoisting. 
        but not in the case of function where assigned to variable. that function will be treated as variable only
    ```
</details>
<details><summary> 5. Shortest js</summary>

    ```typescript
        - without any line of code still it will be a js program
        * browser will create a global object as window
        * this refers to window object
    ```
</details>
<details><summary> 6. undefined vs not defined</summary>

    ```typescript
    - undefined: memory allocated for variable but no value has been assigned
    - not defined: no reference for this variable in the memory

    ```
</details>
<details><summary> 7. Scope, Scope chain, Lexical env</summary>

    ```typescript
    - Scope: scope defines the accessibility of a variable
    - Scope chain: where the code execution looks for a variable in its memory component along with its lexical env 
        if js engine does not find variable in its local memory, it goes for next scope of chain
    - lexical Env: an Execution context's memory componet and its parent execution context memory component
    ```
</details>
<details><summary> 8. let & const</summary>

    ```typescript
        let : cannot redeclare, can re-assign 
         hoisting happpens but if tries to access before its declaration will result in temperol deadzone
        const: cannot redeclare,should initialize on declaration itself, reassign will result in type error
        reference error: unable to trace a variable in its memory
        syntax error: code validation failed. willl not run program
        type error: ex: tried to re assign value of constant which is not allowed
    ```
</details>





 9. Block Scope 
 10. Qna
 11. Closures
 12. setTimeout + closures interview
 13. Js interview
 14. First class fucnitons
 15. callBack Fucnitons
 16. Asynchronous Js & event loop
 17. JS engine
 18. trsust issues with setTimeout()
 19. Higher Order funcitons
 20. map, filter, reduce




