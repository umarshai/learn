# Angular Forms - Interview Questions and Answers

!!! note "Overview"
    Angular provides two types of forms for handling user input: **Template-driven Forms** and **Reactive Forms**. Both approaches are used to build forms but differ in how they manage form control and validation. Understanding when and how to use them is crucial for Angular development.

---

## Types of Forms in Angular

| **Type of Form**        | **Description**                                                                                  | **Usage Scenario**                                                          |
|-------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| **Template-driven Forms** | Forms are defined in the template using `ngModel`. Forms are mostly managed by Angular.          | Simpler forms or when forms don’t require complex logic (e.g., login forms). |
| **Reactive Forms**        | Forms are defined in the component using `FormGroup` and `FormControl`. Provides more control.   | Complex forms with dynamic validations or extensive logic (e.g., dynamic forms). |

---

## Template-Driven Forms

### What are Template-Driven Forms in Angular?

**Answer**:  
Template-driven forms are forms that are defined in the template using the `ngModel` directive. Angular automatically tracks form input and validation state. These forms are easier to set up and require less code, making them ideal for simpler scenarios.

### How to Create Template-Driven Forms?

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form)">
  <input type="text" name="username" ngModel required />
  <button type="submit">Submit</button>
</form>
```
### Reactive Forms

---

### What are Reactive Forms in Angular?

!!! note "Answer"
    Reactive forms are more structured and are defined entirely in the component class using `FormGroup`, `FormControl`, and `FormBuilder`. This approach provides more control over the form logic and validation, making it ideal for complex forms with dynamic validations or large forms.

---

### How to Create Reactive Forms?

!!! note "Example"
    ```typescript
    import { Component } from '@angular/core';
    import { FormGroup, FormBuilder, Validators } from '@angular/forms';

    @Component({
      selector: 'app-registration',
      templateUrl: './registration.component.html',
    })
    export class RegistrationComponent {
      registrationForm: FormGroup;

      constructor(private fb: FormBuilder) {
        this.registrationForm = this.fb.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
        });
      }

      onSubmit() {
        console.log(this.registrationForm.value);
      }
    }
    ```

---

### Common Interview Questions on Forms in Angular

#### 1. **What is the difference between Template-driven and Reactive Forms?**

| **Feature**               | **Template-driven Forms**                               | **Reactive Forms**                                         |
|---------------------------|---------------------------------------------------------|------------------------------------------------------------|
| **Configuration**          | Defined in the template using `ngModel`.               | Defined in the component using `FormGroup` and `FormControl`. |
| **Control Tracking**       | Angular tracks form controls automatically.             | Manual tracking of form controls and validation.            |
| **Validation**             | Validation is done directly in the template.            | Validation is done in the component using validators.       |
| **Complexity**             | Simple and easy to use for small forms.                 | More control and better for complex forms.                 |

---

#### 2. **What is ngModel in Template-driven forms?**

!!! note "Answer"
    `ngModel` is a directive used to bind form controls to component properties in template-driven forms. It creates a two-way data binding between the form input field and the model in the component, allowing automatic updates when either the view or model changes.

    **Example**:
    ```html
    <input [(ngModel)]="user.name" name="name" />
    ```

---

#### 3. **What is FormGroup and FormControl in Reactive Forms?**

!!! note "Answer"
    - **`FormGroup`**: A collection of form controls that track the value and validation state of the form.
    - **`FormControl`**: A single unit of form input that tracks the value and validation state of an individual form element.

    **Example**:
    ```typescript
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
    ```

---

#### 4. **What are Validators in Angular Forms?**

!!! note "Answer"
    Validators are used to define rules for form fields to ensure the data is valid. Angular provides built-in validators like `required`, `minlength`, `maxlength`, `pattern`, etc. You can also create custom validators for more complex validation logic.

    **Example of built-in validators**:
    ```typescript
    import { Validators, FormControl } from '@angular/forms';

    const name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    ```
### 5. How to Handle Form Validation in Angular?

!!! note "Answer"
    Validation in Angular is handled differently in template-driven and reactive forms.

    - **Template-driven Forms**: Use directives like `required`, `minlength`, and `ngModel` for validation.
    - **Reactive Forms**: Validators are applied directly in the component using the `Validators` class.

    **Example in reactive forms**:

    ```typescript
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    });
    ```

---

### 6. How Do You Handle Form Submission in Angular?

!!! note "Answer"
    For form submission, you can use the `(ngSubmit)` event in template-driven forms or the `onSubmit()` method in reactive forms.

    - **Template-driven form**:

    ```html
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <input name="username" ngModel required />
      <button type="submit">Submit</button>
    </form>
    ```

    - **Reactive form**:

    ```typescript
    onSubmit() {
      if (this.registrationForm.valid) {
        console.log(this.registrationForm.value);
      }
    }
    ```

---

### Real-World Scenarios for Angular Forms

| **Scenario**          | **Use Case**                                                                 | **Form Type**         |
|-----------------------|-----------------------------------------------------------------------------|-----------------------|
| **Login Form**         | A simple form with username and password fields.                            | Template-driven form  |
| **Registration Form**  | A complex form with dynamic validation rules like confirming password and email validation. | Reactive form         |
| **Dynamic Forms**      | A form with dynamic fields added/removed based on user selection.            | Reactive form         |
| **Survey Form**        | A form with multiple sections and conditional validation based on previous answers. | Reactive form         |

---

### Summary

- **Template-driven Forms** are simple to use and suitable for smaller forms.
- **Reactive Forms** provide more control, are more scalable, and are ideal for complex forms.
- **FormGroup** and **FormControl** are key components in reactive forms for grouping and managing form fields.
- Angular provides built-in validators and also supports custom validators for flexible form validation.
- **ngModel** provides two-way data binding in template-driven forms.

!!! tip "Best Practice"
    Use **Reactive Forms** for complex forms that require extensive validation or dynamic form fields. Use **Template-driven Forms** for simple, one-time forms where the validation is straightforward.

---

### Custom Validators, Form Arrays, patchValue vs setValue in Angular

!!! note "Overview"
    In Angular, **custom validators** allow you to create your own validation logic, **FormArrays** provide a way to handle dynamic collections of form controls, and the `patchValue` and `setValue` methods allow you to update form values flexibly.

---

### Custom Validators in Angular

#### What Are Custom Validators?

!!! note "Answer"
    Custom validators are functions that allow you to define custom validation logic for form controls or form groups. You can create validators to check for specific conditions that are not covered by the built-in validators.

---

#### How to Create a Custom Validator?

To create a custom validator, define a function that returns either `null` (valid) or an error object (invalid).

**Example: Email Domain Validator**

**Scenario**: A form field should only accept email addresses from a specific domain (e.g., `example.com`).

1. **Create a Custom Validator Function**:

    ```typescript
    import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

    export function emailDomainValidator(domain: string): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const email = control.value;
        if (email && !email.endsWith(`@${domain}`)) {
          return { invalidEmailDomain: { value: control.value } };
        }
        return null;
      };
    }
    ```

2. **Use the Custom Validator in a FormControl**:

    ```typescript
    this.form = this.fb.group({
      email: ['', [Validators.required, emailDomainValidator('example.com')]],
    });
    ```

---

### Form Arrays in Angular

#### What is a FormArray?

!!! note "Answer"
    A **FormArray** is a container for managing an array of form controls or form groups. It allows you to handle dynamic forms, such as a list of items, where each item can have its own set of form controls.

---

#### How to Create and Use a FormArray?

1. **Define a FormArray**:

    ```typescript
    import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

    this.form = this.fb.group({
      skills: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
    ```

2. **Add Form Controls Dynamically to the FormArray**:

    ```typescript
    get skills() {
      return this.form.get('skills') as FormArray;
    }

    addSkill() {
      this.skills.push(this.fb.control('', Validators.required));
    }
    ```

3. **Loop Through FormArray in Template**:

    ```html
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div formArrayName="skills">
        <div *ngFor="let skill of skills.controls; let i = index">
          <input [formControlName]="i" placeholder="Skill" />
        </div>
      </div>
      <button type="button" (click)="addSkill()">Add Skill</button>
      <button type="submit">Submit</button>
    </form>
    ```

---

### `patchValue` vs `setValue` in Angular

#### What is `setValue`?

!!! note "Answer"
    `setValue` is used to update the values of a form group or form array with complete values. All form controls in the form group or array must have a value assigned.

**Example Using `setValue`**:

```typescript
this.form.setValue({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
});
In the above example, all fields must be present in the form, otherwise, an error will occur.
```

### What is `patchValue`?

!!! note "Answer"
    `patchValue` is similar to `setValue`, but it allows you to partially update the form values. It only updates the values for the specified controls, and it will ignore any controls that are not passed.

    **Example Using `patchValue`:**

    ```typescript
    this.form.patchValue({
      firstName: 'John'
    });
    ```

    In this example, only the `firstName` control will be updated, and the other controls (`lastName`, `email`) will remain unchanged.

---

### Difference Between `patchValue` and `setValue`

| **Method**   | **Description**                                                        | **Use Case**                                                 |
|--------------|------------------------------------------------------------------------|--------------------------------------------------------------|
| **setValue** | Updates all form controls in the form group or form array.             | When you need to update every form control's value at once.  |
| **patchValue** | Updates only the provided controls in the form group or array.        | When you need to update only specific fields, leaving others unchanged. |

---

### Real-World Scenarios for Using Custom Validators, Form Arrays, `patchValue`, and `setValue`

| **Scenario**                   | **Use Case**                                                      | **Form Feature**     |
|---------------------------------|--------------------------------------------------------------------|----------------------|
| **Email Validation**            | Validating an email to ensure it comes from a specific domain.    | Custom Validator     |
| **Dynamic Lists (Skills, Tags)**| Allowing users to add a list of skills or tags dynamically.       | FormArray            |
| **Updating Multiple Form Controls** | Updating multiple fields in the form with data from an API response. | `setValue`           |
| **Updating Partial Form Values** | Patching only a part of a form, such as updating user profile details. | `patchValue`         |

---

### Summary

- **Custom Validators** allow you to create custom validation logic for form controls or groups.
- **FormArrays** are used to handle dynamic lists of form controls, such as a list of items or multiple choices.
- `setValue` updates all the values in a form, while `patchValue` only updates the specified values, allowing partial updates.
- Use **`patchValue`** for flexible updates and **`setValue`** when you need to set all form values.

!!! tip "Best Practice"
    Use **FormArrays** for scenarios where the number of form controls is dynamic, such as adding/removing list items. Use **`setValue`** when you need to set all values, and **`patchValue`** when updating only specific form fields.
