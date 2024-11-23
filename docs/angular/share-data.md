## Methods of sharing data components

In Angular (including Angular 2 and later versions), there are several common ways to share data between components. The method you choose depends on the relationship between the components (parent-child, sibling, or unrelated) and the type of data being shared.

Here are some of the main techniques:



These methods are often more specialized or advanced, useful in scenarios where traditional data-sharing techniques may not be sufficient or optimal.





Let’s walk through practical examples of each data-sharing technique in Angular. This will include code snippets that illustrate how to implement each approach.

## 1. @Input() and @Output() Decorators (Parent-Child Communication)

```typescript console.log('test')```

```typescript
Copy code
// Child component
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'child-component',
  template: `<button (click)="sendData()">Send Data</button>`,
})
export class ChildComponent {
  @Input() parentData: string;
  @Output() childEvent = new EventEmitter<string>();

  sendData() {
    this.childEvent.emit("Data from child");
  }
}

// Parent component template
<child-component [parentData]="dataFromParent" (childEvent)="receiveData($event)"></child-component>
```
---
### 2. Shared Service (Any Component)
typescript
Copy code
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}

// Component A: Update message
constructor(private sharedService: SharedService) {}
this.sharedService.changeMessage("Hello from Component A");

// Component B: Subscribe to message
this.sharedService.currentMessage.subscribe(message => {
  console.log(message);
});
3. Template Reference Variables (Parent-Child Communication)
html
Copy code
<!-- Parent component template -->
<child-component #childComp></child-component>
<button (click)="childComp.someMethod()">Call Child Method</button>
4. @ViewChild and @ViewChildren (Parent-Child Communication)
typescript
Copy code
// Parent component
import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'parent-component',
  template: `<child-component></child-component>`,
})
export class ParentComponent {
  @ViewChild(ChildComponent) child: ChildComponent;

  ngAfterViewInit() {
    this.child.someMethod();
  }
}
5. Router Parameters (Unrelated Components)
typescript
Copy code
// Navigate and pass data
this.router.navigate(['/path', data]);

// Receiving component
constructor(private route: ActivatedRoute) {}
this.route.params.subscribe(params => {
  console.log(params['id']);
});
6. Input Setter (Parent-Child Communication)
typescript
Copy code
// Child component
import { Component, Input } from '@angular/core';

@Component({
  selector: 'child-component',
  template: `<p>{{processedData}}</p>`,
})
export class ChildComponent {
  processedData: string;

  @Input() set parentData(value: string) {
    this.processedData = value.toUpperCase();
  }
}
7. Local Storage/Session Storage (Any Component)
typescript
Copy code
// Set data in local storage
localStorage.setItem('key', JSON.stringify(data));

// Retrieve data
let retrievedData = JSON.parse(localStorage.getItem('key'));
8. NgRx Store (Application-Wide)
typescript
Copy code
// Action definition
import { createAction, props } from '@ngrx/store';
export const updateData = createAction('[Data] Update', props<{ data: string }>());

// Reducer function
export const dataReducer = createReducer(
  initialState,
  on(updateData, (state, { data }) => ({ ...state, data }))
);

// Component to dispatch action
this.store.dispatch(updateData({ data: 'New data' }));

// Component to select state
this.store.select('data').subscribe(data => console.log(data));
9. Event Bus (Using Angular’s EventEmitter in Services)
typescript
Copy code
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  public eventEmitter = new EventEmitter<any>();
}

// Emitting an event in one component
this.eventBusService.eventEmitter.emit(data);

// Listening for events in another component
this.eventBusService.eventEmitter.subscribe(data => {
  console.log(data);
});
10. Injection Tokens (DI Tokens)
typescript
Copy code
import { InjectionToken } from '@angular/core';

export const CONFIG_TOKEN = new InjectionToken<string>('config');

// Provide token in app module
providers: [{ provide: CONFIG_TOKEN, useValue: 'my-config-data' }]

// Inject token in a component
constructor(@Inject(CONFIG_TOKEN) public config: string) {
  console.log(config);
}
11. @HostListener and @HostBinding (Event-Based Communication)
typescript
Copy code
import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostBinding('class.highlight') isHighlighted = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.isHighlighted = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHighlighted = false;
  }
}
12. @ngrx/component-store (Component-Level State Management)
typescript
Copy code
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface CounterState {
  count: number;
}

@Injectable()
export class CounterStore extends ComponentStore<CounterState> {
  readonly count$ = this.select(state => state.count);

  constructor() {
    super({ count: 0 });
  }

  readonly increment = this.updater(state => ({ count: state.count + 1 }));
}
13. Portal-Based Communication (Angular CDK Portals)
typescript
Copy code
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Component, Inject, ViewContainerRef, Injector } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ng-template cdkPortalOutlet></ng-template>`
})
export class AppComponent {
  constructor(private viewContainerRef: ViewContainerRef) {}

  openComponent() {
    const componentPortal = new ComponentPortal(MyComponent);
    this.viewContainerRef.createComponent(componentPortal);
  }
}
14. Custom Event Emitters with Observables (for Cross-Component Events)
typescript
Copy code
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomEventService {
  private eventSubject = new Subject<any>();

  emitEvent(data: any) {
    this.eventSubject.next(data);
  }

  getEvent(): Observable<any> {
    return this.eventSubject.asObservable();
  }
}
15. Directive-Based Communication
typescript
Copy code
import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirective {
  @Output() customEvent = new EventEmitter<any>();

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.customEvent.emit('Clicked');
  }
}
16. Dynamic Components with ComponentFactoryResolver
typescript
Copy code
import { Component, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<button (click)="loadComponent()">Load Component</button>`
})
export class AppComponent {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {}

  loadComponent() {
    const componentFactory = this.cfr.resolveComponentFactory(DynamicComponent);
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = "Dynamic data";
  }
}
These examples cover various approaches for data sharing in Angular applications, depending on the specific requirements and relationships between components.