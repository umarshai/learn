<details>
  <summary><strong>Lazy Loading</strong></summary>
  Lazy Loading is an optimization technique in Angular that helps load JavaScript files and components only when they are required, instead of loading everything upfront. This can significantly reduce the initial load time of the application. By using Angular’s `loadChildren` property in route configurations, we can load modules on demand. It improves performance, especially for larger applications.

  **Example:**
  
    const routes: Routes = [  
      {  
        path: 'feature',  
        loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)  
      }  
    ];  
</details>

<details>
  <summary><strong>AOT Compilation</strong></summary>
  Ahead-of-Time (AOT) Compilation is a technique where Angular compiles the application during the build process, rather than in the browser. This results in faster rendering as the application is already compiled into efficient JavaScript code. AOT also helps detect errors earlier and reduces the size of the final bundle.

  **Example:**
  
    To enable AOT in Angular, just run the build command with the `--aot` flag:
  
    ng build --aot
</details>

<details>
  <summary><strong>Change Detection</strong></summary>
  Angular's change detection mechanism ensures that the view is updated whenever the model changes. Optimizing change detection can improve app performance. Using `ChangeDetectionStrategy.OnPush`, Angular will check for changes only when the input properties change, thus reducing the number of checks and improving performance.

  **Example:**
  
    @Component({  
      selector: 'app-user',  
      changeDetection: ChangeDetectionStrategy.OnPush,  
      templateUrl: './user.component.html'  
    })  
    export class UserComponent {  
      @Input() user: User;  
    }  
</details>

<details>
  <summary><strong>trackBy for ngFor</strong></summary>
  The `trackBy` function in `ngFor` helps Angular track items by a unique identifier, improving performance in large lists. By default, Angular will re-render all items when the list changes. Using `trackBy`, Angular can only update the DOM for the changed items, which reduces unnecessary re-renders.

  **Example:**
  
    <ul>  
      <li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>  
    </ul>  

    trackById(index: number, item: any): number {  
      return item.id;  // Unique identifier for each item  
    }  
</details>

<details>
  <summary><strong>Pure Pipes</strong></summary>
  A pure pipe is a pipe that only executes when its input data changes, not every time the component re-renders. This reduces unnecessary recalculations and enhances performance. Pure pipes are the default in Angular, and using them effectively can optimize the application's responsiveness.

  **Example:**
  
    @Pipe({  
      name: 'filter',  
      pure: true  // Pure pipe  
    })  
    export class FilterPipe implements PipeTransform {  
      transform(value: any[], searchTerm: string): any[] {  
        return value.filter(item => item.name.includes(searchTerm));  
      }  
    }  
</details>

<details>
  <summary><strong>Tree Shaking</strong></summary>
  Tree shaking is a technique used during the build process to remove unused code from the final bundle. Angular uses tools like Webpack to analyze the codebase and eliminate code that isn't needed, which helps reduce the size of the JavaScript bundle and improves load times.

  **Example:**
  
    Simply ensure that the build is done in production mode:
  
    ng build --prod

    Webpack automatically removes unused code when you build with `--prod`.
</details>

<details>
  <summary><strong>Use Web Workers</strong></summary>
  Web Workers allow JavaScript code to run in the background on a separate thread, enabling complex calculations or data processing without blocking the main thread. This helps improve UI responsiveness, especially in applications with heavy computation or large data sets.

  **Example:**
  
    const worker = new Worker('./worker.js', { type: 'module' });  

    worker.onmessage = (event) => {  
      console.log('Worker response:', event.data);  
    };  

    worker.postMessage('Start work');
</details>

<details>
  <summary><strong>Optimize Images</strong></summary>
  Optimizing images ensures that images are delivered in the most efficient format and size. Using techniques like lazy loading, compression, and serving images in modern formats like WebP can significantly reduce load times and improve application performance, especially on mobile networks.

  **Example:**
  
    <img src="image.webp" alt="Optimized Image" loading="lazy">
</details>

<details>
  <summary><strong>Optimize Component Rendering</strong></summary>
  Optimizing component rendering involves minimizing unnecessary DOM updates. By using change detection strategies like `OnPush`, leveraging `ngOnChanges` lifecycle hooks, and preventing unnecessary re-renders, you can ensure that components only re-render when absolutely necessary, improving overall performance.

  **Example:**
  
    @Component({
      selector: 'app-profile',
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class ProfileComponent {
      @Input() profile: Profile;
    }
</details>

<details>
  <summary><strong>Optimize HTTP Requests</strong></summary>
  Optimizing HTTP requests involves reducing the number of requests made to the server, caching data where appropriate, and batching requests together. Using HTTP interceptors to manage request headers, retries, or caching strategies can help improve the responsiveness of an application.

  **Example:**
  
    @Injectable()
    export class DataService {
      private cache = new Map<string, any>();

      constructor(private http: HttpClient) {}

      getData(url: string): Observable<any> {
        if (this.cache.has(url)) {
          return of(this.cache.get(url));
        } else {
          return this.http.get(url).pipe(
            tap(data => this.cache.set(url, data))
          );
        }
      }
    }
</details>

<details>
  <summary><strong>Optimize Template Expressions</strong></summary>
  Template expressions in Angular are evaluated frequently during change detection. To optimize performance, avoid complex expressions in templates. Instead, move logic to component methods or properties, and use the `OnPush` change detection strategy to minimize recalculations.

  **Example:**
  
    Instead of complex logic in templates:
    
    ```html  
    <div>{{ calculateDiscount(price) }}</div>  
    ```

    **Move logic to component:**
    
    ```typescript  
    export class ProductComponent {
      price = 100;
      
      calculateDiscount(price: number): number {
        return price * 0.9;  // Apply discount
      }
    }
    ```
</details>

<details>
  <summary><strong>Prevent Memory Leaks</strong></summary>
  Memory leaks occur when objects are not properly cleaned up, leading to increased memory consumption over time. To prevent memory leaks, it’s important to unsubscribe from observables, destroy timers, and remove event listeners when components are destroyed. Tools like `ngOnDestroy` and `takeUntil` can help manage this.

  **Example:**
  
    @Component({
      selector: 'app-observable-example',
      templateUrl: './observable-example.component.html'
    })
    export class ObservableExampleComponent implements OnDestroy {
      private unsubscribe$ = new Subject<void>();

      ngOnInit() {
        this.dataService.getData()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(data => {
            console.log(data);
          });
      }

      ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }
    }
</details>
