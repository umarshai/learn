 
!!! note "Angular Routing"
      Angular routing is a powerful feature that allows you to create single-page applications (SPAs) with multiple views without reloading the page. Here's an overview of the key concepts and components involved in Angular routing:

      1. Setting Up Angular Routing
      When you create a new Angular application, you can set up routing by adding --routing to the Angular CLI command:

      bash

      ng new my-app --routing
      This command generates a AppRoutingModule file for configuring routes.

      2. The Router Module
      Import the RouterModule in the routing module to enable routing. It also provides directives like router-outlet and routerLink for navigation and displaying routed components.

      Example of a routing module:


  ```typescript

  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { HomeComponent } from './home/home.component';
  import { AboutComponent } from './about/about.component';

  const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  3. Router Outlet
  The <router-outlet> directive acts as a placeholder where routed components are displayed. Place it in your main app component template:

  html

  <router-outlet></router-outlet>
  4. Navigating with RouterLink and Programmatic Navigation
  Use routerLink in templates to navigate:

  html

  <a routerLink="/home">Home</a>
  <a routerLink="/about">About</a>
  Alternatively, navigate programmatically using the Router service:
  ```

  ```typescript

  import { Router } from '@angular/router';

  constructor(private router: Router) {}

  goToAbout() {
    this.router.navigate(['/about']);
  }
  ```
## Route Parameters 
!!! note "Route Parameters"
    Parameters can be added to routes for dynamic content. Use the ActivatedRoute service to access them.

    Define a route with a parameter:

  ``` typescript

  { path: 'user/:id', component: UserComponent }
  ```
  Access the parameter in the component:

  ```typescript

  import { ActivatedRoute } from '@angular/router';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
  } 
  ```

## Child Routes
!!! note 
        Use child routes to create nested routing within a component:

  ```typescript

  const routes: Routes = [
    { 
      path: 'dashboard', 
      component: DashboardComponent,
      children: [
        { path: 'settings', component: SettingsComponent },
        { path: 'profile', component: ProfileComponent }
      ]
    }
  ];
  ```
## Lazy Loading
!!! note 
      Lazy loading allows you to load feature modules only when they are needed, optimizing performance. Define a module route with loadChildren:
  

  ```typescript

  const routes: Routes = [
    { 
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    }
  ];
  ```
## Route Guards  
!!! note
      Route guards control access to routes. Angular provides different types of guards:

      * CanActivate: Checks if a user can access a route.
      * CanActivateChild: Checks access to child routes.
      * CanDeactivate: Checks if a user can leave a route.
      * Resolve: Pre-fetches data before loading a route.
      Example of a guard:

  ```typescript

  import { Injectable } from '@angular/core';
  import { CanActivate } from '@angular/router';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    canActivate(): boolean {
      // Replace with actual authentication check
      return isAuthenticated();
    }
  }
  ```
## Handling 404s (Wildcards)  
!!! note 
      Add a wildcard route to catch unmatched paths:

  ```typescript 

  { path: '**', component: PageNotFoundComponent }
  ```
## Router Events
!!! note  
      Angular's Router service emits various events during routing. You can subscribe to these to perform actions at specific routing stages:

  ```typescript

  import { Router, NavigationEnd } from '@angular/router';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended:', event);
      }
    });
  }
  ```
  
## Route Resolvers
!!! note  
      Resolvers allow you to pre-fetch data before navigating to a route. This is useful for loading essential data upfront to avoid displaying partially-loaded views.

        Define a resolver service:

  ```typescript

  import { Injectable } from '@angular/core';
  import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
  import { Observable } from 'rxjs';
  import { UserService } from './user.service';

  @Injectable({ providedIn: 'root' })
  export class UserResolver implements Resolve<User> {
    constructor(private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
      return this.userService.getUser(route.paramMap.get('id'));
    }
  } 
  ```
  Use it in your route configuration:

  ```typescript

  { 
    path: 'user/:id', 
    component: UserComponent,
    resolve: { user: UserResolver }
  }
  ```
  Access the resolved data in the component:

  ```typescript

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
  ```
##  Preloading Modules
!!! note 
      Preloading improves performance by loading lazy-loaded modules in the background, so they're ready if needed. Angular provides built-in preloading strategies:

      NoPreloading (default): Modules are not preloaded.
      PreloadAllModules: All lazy-loaded modules are preloaded.
      Enable preloading in the RouterModule:

  ```typescript

  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })]
  ```

 ## Custom Preloading Strategy
 !!! note 
        You can create a custom preloading strategy for more granular control over which modules to preload.

        Example of a custom preloading strategy:

  ```typescript

  import { PreloadingStrategy, Route } from '@angular/router';
  import { Observable, of } from 'rxjs';

  export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
      return route.data && route.data['preload'] ? load() : of(null);
    }
  }
  ```
  Configure it in the routing module:

  ```typescript

  const routes: Routes = [
    { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule), data: { preload: true } }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })],
    providers: [CustomPreloadingStrategy]
  })
  export class AppRoutingModule {}
  ```
  ## Route Animations
  !!! note "Route Animations"
        Angular allows you to animate transitions between routes, which enhances the user experience in complex applications.

        Example of a route animation:

  ```typescript

  import { trigger, transition, style, animate } from '@angular/animations';

  export const slideInAnimation = 
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ]);
  Apply this animation to <router-outlet>:

  html

  <div [@routeAnimations]="o.isActivated ? o.activatedRoute : ''">
    <router-outlet #o="outlet"></router-outlet>
  </div>
  ```
# Multiple Router Outlets
!!! note 
      For more complex layouts, you can define multiple router outlets, each with its own set of routes.

  ```html

  <router-outlet name="primary"></router-outlet>
  <router-outlet name="sidebar"></router-outlet>
  Then specify the outlets in your routes:
  ```

  ```typescript

  const routes: Routes = [
    { path: 'main', component: MainComponent, outlet: 'primary' },
    { path: 'sidebar', component: SidebarComponent, outlet: 'sidebar' }
  ];
  ```
## Strategy  
!!! note "Strategy"
      6. Route Reuse Strategy
      Angular provides a way to control the reuse of route components, which can be helpful for performance. You can implement a custom RouteReuseStrategy to cache certain components and improve loading times.

      7. Lazy Loading Modules with Custom Selectors
      Instead of loading a module with the loadChildren property directly in the route, you can create custom functions that allow finer control, like conditionally loading modules based on user permissions.

      8. Hash-based Routing
      By default, Angular uses HTML5 routing (e.g., /about). However, for certain cases like legacy server setups that don’t support path-based routing, you can switch to hash-based routing (e.g., /#/about) using:

  ```typescript

  RouterModule.forRoot(routes, { useHash: true })
  ```
  ## Configuring Scroll Position Restoration
  !!! note 
        By default, Angular does not restore scroll positions when navigating. You can enable scroll position restoration in RouterModule:


  ```typescript

  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })]
  ```
  This will scroll to the top on each navigation or restore to the previous position when the user navigates back.


## Router Testing
  !!! note 
        Test Angular routes to ensure expected navigation behavior. Use Angular’s RouterTestingModule for routing in unit tests.

  Example:

  ```typescript

  import { RouterTestingModule } from '@angular/router/testing';

  TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes(routes)]
  });
  ```
  ## Handling Query Parameters and Fragments
  !!! note 
        Query parameters (?key=value) and URL fragments (#section) are commonly used in URLs. To set query parameters:

  ```typescript

  this.router.navigate(['/route'], { queryParams: { filter: 'value' } });
  ```
  And to access them in the component:

  ```typescript

  this.route.queryParams.subscribe(params => {
    const filter = params['filter'];
  });
  ```
  Similarly, for fragments:

  ```typescript

  this.router.navigate(['/route'], { fragment: 'section' });
  ```
  By understanding these concepts, you can take full advantage of Angular's routing capabilities to build a highly interactive, optimized, and user-friendly application.