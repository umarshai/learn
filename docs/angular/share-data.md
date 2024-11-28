

| Communication Type|  Use Case |	Data Direction	| 
| ----------- | ------------------------------------ | ---|
| @Input()	| Pass data from parent to child	| Parent → Child| 
| @Output()	| Emit event from child to parent	| Child → Parent| 
| @ViewChild()| 	Access child component (single)	| Parent → Child| 
| @ViewChildren()| 	Access multiple child components| 	Parent → Child| 
| @ContentChild()| 	Access single projected content	| Parent → Child| 
| @ContentChildren()| 	Access multiple projected contents	| Parent → Child| 
| Subject	| Share data across unrelated components	| Any → Any| 
| ng-content	| Project content into a child	| Parent → Child| 


## Comparison of Methods
 Communication Scenario|  Recommended Method |	Efficiency Rating	Complexity	| 
| ----------- | ------------------------------------ | ---|	
| Parent to Child	| @Input()	| ⭐⭐⭐⭐⭐	Low| 
| Child to Parent	| @Output()	| ⭐⭐⭐⭐⭐	Low| 
| Sibling or Unrelated Components	| Service with BehaviorSubject| 	⭐⭐⭐⭐	Medium| 
| Application-Wide State| 	NgRx, Akita, or NGXS	| ⭐⭐⭐⭐	High| 
| Content Projection	| ng-content	⭐⭐⭐⭐	Low| 
| Passing Data via URL| 	Router Parameters	| ⭐⭐⭐⭐	Medium| 
| Content Projection	| ng-content	| ⭐⭐⭐⭐	Low| 
| Direct DOM Manipulation| 	ElementRef + Renderer2	| ⭐⭐⭐	Medium| 

## 1. Input() (Parent to Child Communication)
!!! note "" 
    * ****


    * **Scenario**: You have a ProductListComponent that displays a list of products. When you click on a product, the product details are passed to the ProductDetailsComponent to display more information.


    * **Use Case**:  A parent component passes data to a child component..



```typescript
// parent component (ProductListComponent)
@Component({
  selector: 'app-product-list',
  template: `
    <app-product-details [product]="selectedProduct"></app-product-details>
    <button (click)="selectProduct(product)">View Details</button>
  `
})
export class ProductListComponent {
  selectedProduct: Product | undefined;
  
  selectProduct(product: Product) {
    this.selectedProduct = product;
  }
}
// child component (ProductDetailsComponent)
@Component({
  selector: 'app-product-details',
  template: `
    <div *ngIf="product">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
    </div>
  `
})
export class ProductDetailsComponent {
  @Input() product!: Product;
}


```

## 2. Output() (Child to Parent Communication)
!!! note "" 
    * ** **


    * **Scenario**: A SearchBarComponent emits the search query to the ProductListComponent to filter the product list.


    * **Use Case**: A child component emits an event to the parent component. .



```typescript
// child component (SearchBarComponent)
@Component({
  selector: 'app-search-bar',
  template: `
    <input type="text" (input)="onSearch($event.target.value)" placeholder="Search products">
  `
})
export class SearchBarComponent {
  @Output() searchQuery = new EventEmitter<string>();

  onSearch(query: string) {
    this.searchQuery.emit(query);
  }
}

// parent component (ProductListComponent)
@Component({
  selector: 'app-product-list',
  template: `
    <app-search-bar (searchQuery)="filterProducts($event)"></app-search-bar>
    <div *ngFor="let product of filteredProducts">{{ product.name }}</div>
  `
})
export class ProductListComponent {
  filteredProducts: Product[] = [];

  filterProducts(query: string) {
    // Filter logic here
  }
}


```
## ViewChild() (Parent Accessing Child)
!!! note "" 
    * ** **


    * **Scenario**: A FormComponent has a ChildInputComponent, and the parent needs to reset the form input.


    * **Use Case**:  A parent component accesses a child component's properties or methods..



```typescript
// child component (ChildInputComponent)
@Component({
  selector: 'app-child-input',
  template: `<input type="text" #inputBox>`
})
export class ChildInputComponent {
  reset() {
    this.inputBox.nativeElement.value = '';
  }

  @ViewChild('inputBox') inputBox!: ElementRef;
}

// parent component (FormComponent)
@Component({
  selector: 'app-form',
  template: `
    <app-child-input></app-child-input>
    <button (click)="resetInput()">Reset</button>
  `
})
export class FormComponent {
  @ViewChild(ChildInputComponent) childInput!: ChildInputComponent;

  resetInput() {
    this.childInput.reset();
  }
}


```

## ViewChildren() (Access Multiple Child Components)
!!! note "" 
    * ** **


    * **Scenario**: Access multiple child components.


    * **Use Case**:  A TabContainerComponent manages multiple TabComponent instances..



```typescript
// child component (TabComponent)
@Component({
  selector: 'app-tab',
  template: `<ng-content></ng-content>`
})
export class TabComponent {}

// parent component (TabContainerComponent)
@Component({
  selector: 'app-tab-container',
  template: `
    <app-tab></app-tab>
    <app-tab></app-tab>
    <button (click)="logTabs()">Log Tabs</button>
  `
})
export class TabContainerComponent {
  @ViewChildren(TabComponent) tabs!: QueryList<TabComponent>;

  logTabs() {
    console.log(this.tabs.length); // Logs number of tabs
  }
}


```

## 
!!! note "" 
    * ** **


    * **Scenario**: 


    * **Use Case**:  .



```typescript


```
## 5. ContentChild() (Access Projected Content)
!!! note "" 
    * ** **


    * **Scenario**: A ModalComponent accesses a projected title from the parent.


    * **Use Case**:  Access a single projected child element..



```typescript
// modal component (ModalComponent)
@Component({
  selector: 'app-modal',
  template: `<ng-content></ng-content>`
})
export class ModalComponent {
  @ContentChild('title') title!: ElementRef;
}

// parent component (AppComponent)
@Component({
  selector: 'app-root',
  template: `
    <app-modal>
      <h1 #title>Modal Title</h1>
    </app-modal>
  `
})
export class AppComponent {}


```
## 6. ContentChildren() (Access Multiple Projected Content Elements)
!!! note "" 
    * ** **


    * **Scenario**: ContentChildren() (Access Multiple Projected Content Elements)


    * **Use Case**:  Access multiple projected children..



```typescript
@Component({
  selector: 'app-list',
  template: `
    <ng-content></ng-content>
    <button (click)="logItems()">Log Items</button>
  `
})
export class ListComponent {
  @ContentChildren('item') items!: QueryList<ElementRef>;

  logItems() {
    console.log(this.items.length); // Logs the number of items
  }
}


```

## 7. Subject (Observable Pattern) (Cross-Component Communication)
!!! note "" 
    * ** **


    * **Scenario**: A UserService shares login status between NavbarComponent and SidebarComponent.


    * **Use Case**:  Share data between unrelated components..



```typescript

// service (UserService)
@Injectable({ providedIn: 'root' })
export class UserService {
  private loginStatus = new Subject<boolean>();

  loginStatus$ = this.loginStatus.asObservable();

  updateLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }
}

// component (NavbarComponent)
@Component({
  selector: 'app-navbar',
  template: `{{ isLoggedIn ? 'Logout' : 'Login' }}`
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private userService: UserService) {
    this.userService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
}

```
## 8. ng-content (Content Projection)
!!! note "" 
    * ** **


    * **Scenario**: A CardComponent accepts content for a header, body, and footer.


    * **Use Case**:  Pass markup from a parent to a child component..



```typescript
// child component (CardComponent)
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content select="[header]"></ng-content>
      <ng-content select="[body]"></ng-content>
      <ng-content select="[footer]"></ng-content>
    </div>
  `
})
export class CardComponent {}

<!-- parent component -->
<app-card>
  <div header>Card Header</div>
  <div body>Card Body</div>
  <div footer>Card Footer</div>
</app-card>


```


## 9. Service with BehaviorSubject (Cross-Component Communication with State Management)
!!! note "" 
    * ** **


    * **Scenario**: A CartService tracks items added to the cart and updates both the NavbarComponent (showing the cart icon with the number of items) and the CartComponent (displaying the list of items).


    * **Use Case**: Maintain shared state across multiple components in a more reactive way. .



```typescript

// cart.service.ts
@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addItem(product: Product) {
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, product]);
  }
}

// component (NavbarComponent)
@Component({
  selector: 'app-navbar',
  template: `<span>Cart ({{ itemCount }})</span>`
})
export class NavbarComponent {
  itemCount = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe(items => {
      this.itemCount = items.length;
    });
  }
}

```

## 11. Local Storage / Session Storage (Browser Storage for Persisting Data)
!!! note "" 
    * ** **


    * **Scenario**: Storing user preferences such as theme selection (dark mode or light mode) and sharing it across components.


    * **Use Case**:  Persist data between component interactions or page reloads..



```typescript
// theme.service.ts
@Injectable({ providedIn: 'root' })
export class ThemeService {
  setTheme(theme: string) {
    localStorage.setItem('theme', theme);
  }

  getTheme(): string {
    return localStorage.getItem('theme') || 'light';
  }
}
// component (AppComponent)
@Component({
  selector: 'app-root',
  template: `
    <button (click)="toggleTheme()">Toggle Theme</button>
  `
})
export class AppComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    const currentTheme = this.themeService.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
  }
}


```

## 13. Router (Route Parameters and Query Parameters) (Data Sharing via URL)
!!! note "" 
    * ** **


    * **Scenario**: Pass a product ID from a ProductListComponent to a ProductDetailsComponent through the route.


    * **Use Case**:  Pass data through the URL when navigating between components..



```typescript

// product-list.component.ts
@Component({
  selector: 'app-product-list',
  template: `
    <a [routerLink]="['/product', product.id]">View Details</a>
  `
})
export class ProductListComponent {
  product = { id: 1, name: 'Product A' };
}
// product-details.component.ts
@Component({
  selector: 'app-product-details',
  template: `
    <div>Product ID: {{ productId }}</div>
  `
})
export class ProductDetailsComponent {
  productId!: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });
  }
}

```

## 14. @HostListener (Listening to Events from Parent or Host Component)
!!! note "" 
    * ** **


    * **Scenario**: A ScrollSpyDirective listens to scroll events to highlight the active section in a navbar.


    * **Use Case**:  Listen for events triggered on the host element or parent component..



```typescript
@Directive({
  selector: '[appScrollSpy]'
})
export class ScrollSpyDirective {
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Scroll logic here
    console.log('Scrolling...');
  }
}


```

## 15. ElementRef with Renderer2 (Direct DOM Manipulation)
!!! note "" 
    * ** **


    * **Scenario**: A TooltipDirective shows a tooltip when hovering over a button.


    * **Use Case**:  Pass data or interact with the DOM directly between components..



```typescript
@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    const tooltip = this.renderer.createElement('span');
    this.renderer.appendChild(this.el.nativeElement, tooltip);
  }
}


```

