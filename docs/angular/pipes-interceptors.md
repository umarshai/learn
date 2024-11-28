* Angular provides a set of commonly used pipes to simplify data transformation in templates.

| Pipe|   Description	| Usage Example|
| ----------- | ------------------------------------ | ---|
| DatePipe| 	Formats a date value| 	`{{ today| 
| CurrencyPipe| 	Formats a number as currency	| `{{ price| 
| DecimalPipe	| Formats a number to a decimal	| `{{ num| 
| PercentPipe| 	Formats a number as a percentage| 	`{{ ratio| 
| JsonPipe	| Converts an object to a JSON string| 	`{{ user| 
| LowerCasePipe	| Transforms a string to lowercase	| `{{ name| 
| UpperCasePipe	| Transforms a string to uppercase| 	`{{ name| 
| SlicePipe	| Extracts a portion of an array/string	| `{{ text| 
| AsyncPipe| 	Unwraps and subscribes to Observable or Promise	| `{{ observableData$| 
| TitleCasePipe	| Transforms a string to title case| 	`{{ name| 


## 1. DatePipe Example (Showing Current Date)
!!! note "" 
    *** Display the current date in a human-readable format on a dashboard.*

```typescript
<!-- In DashboardComponent -->
<p>Today's Date: {{ today | date:'fullDate' }}</p>
export class DashboardComponent {
  today: Date = new Date();
}
Output:
Today's Date: Wednesday, November 28, 2024

```

## 2. CurrencyPipe Example (E-commerce Website)
!!! note "" 
    ***Display product prices in a currency format. *
```typescript

<p>Price: {{ product.price | currency:'USD':'symbol':'1.2-2' }}</p>
export class ProductComponent {
  product = { price: 1234.5 };
}
Output:
Price: $1,234.50
```

## 3. AsyncPipe Example (Fetching Data from an API)
!!! note "" 
    ***Display a list of users fetched asynchronously from an API. **
```typescript
<ul>
  <li *ngFor="let user of users$ | async">{{ user.name }}</li>
</ul>
export class UserListComponent {
  users$ = this.http.get<User[]>('https://api.example.com/users');
  constructor(private http: HttpClient) {}
}


```



## Custom Pipes in Angular
## AbbreviationPipe
*** When Angular's prebuilt pipes don't meet your requirements, you can create custom pipes.*
!!! note "" 
    * ** Custom Pipe to Convert a String to Abbreviations**

    * **Scenario**:  In a contact list, display the user's full name as initials.


```typescript
ng generate pipe customPipeName
// abbreviation.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviation'
})
export class AbbreviationPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map(word => word[0].toUpperCase())
      .join('');
  }
}

<p>User Initials: {{ user.name | abbreviation }}</p>

export class UserComponent {
  user = { name: 'John Doe' };
}
Output:User Initials: JD



```

## Truncate Pipe
!!! note "" 
    * ** **


    * **Scenario**: Show a shortened version of a product description.


    * **Use Case**:  .



```typescript
// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
<p>{{ product.description | truncate:30 }}</p>
export class ProductComponent {
  product = { description: 'This is a long product description that should be truncated.' };
}

Output:
This is a long product des...
```

## Safe HTML Pipe (Bypass HTML Sanitization)
!!! note "" 
    * **In a content management system, safely display raw HTML content. **



```typescript
// safe-html.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

<div [innerHTML]="htmlContent | safeHtml"></div>
export class HtmlContentComponent {
  htmlContent = '<h1>Welcome to our Website</h1><p>This is raw HTML content.</p>';
}
Output:
The HTML content is displayed safely without Angular's default sanitization blocking it.

```



## Highlight Pipe
!!! note 
    Scenario: Highlight search terms in a list of results.


```typescript

// highlight.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, `<span class="highlight">$1</span>`);
  }
}
Usage:

<p [innerHTML]="text | highlight:searchTerm"></p>
typescript
Copy code
export class SearchComponent {
  text = 'Angular is a popular framework for building web applications.';
  searchTerm = 'Angular';
}
Output:
Angular is highlighted in the text.
```


# Intersceptors
!!! note "Intersceptors"
    In Angular, HTTP Interceptors are a part of the HttpClient module and provide a way to intercept and modify HTTP requests and responses globally before they are sent to the server or after the server returns a response.

    Why Use Interceptors?
    Interceptors are useful for handling:

    Authentication Tokens (e.g., attaching JWT tokens to every request)
    Error Handling (e.g., catching errors globally)
    Logging (e.g., logging requests and responses)
    Request/Response Transformation (e.g., modifying request headers or responses)

    How Angular Interceptors Work
    Interceptors implement the HttpInterceptor interface and intercept HTTP requests using the intercept() method. They are registered globally in the providers array of an Angular module.

| Use Case| Description  |	
| ----------- | ------------------------------------ | 
| Authentication	| Attach JWT tokens or API keys to each request.| 
| Error Handling	| Catch and handle HTTP errors globally.| 
| Logging	| Log request and response details for debugging.| 
| Custom Headers| 	Add custom headers required for API requests.| 
| Response Transformation| 	Modify or transform the response before passing it to components.| 
| Network Delay Simulation	| Simulate slow network conditions for testing.| 

## Adding Authorization Token to HTTP Requests
!!! note "Adding Authorization Token to HTTP Requests" 
    Scenario: In a banking application, every API request to the server requires a JWT token for authentication. Instead of manually adding the token to each request, an interceptor automatically appends the token.

Implementation:
```typescript

// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = 'Bearer ' + localStorage.getItem('authToken'); // Get token from localStorage

    // Clone the request and add the Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });

    return next.handle(authReq); // Pass the cloned request
  }
}
```
```typescript 
Registering the Interceptor:
Add the interceptor to the providers array in your module.


// app.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
Result: Every HTTP request automatically includes the Authorization token, ensuring secure communication with the backend.
```

## Global Error Handling
!!! note " Global Error Handling"
    Scenario: In an e-commerce application, handle HTTP errors globally and display user-friendly messages when the server returns an error (e.g., 404, 500).

Implementation:
```typescript
Copy code
// error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.status === 404) {
          errorMessage = 'Resource not found!';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error!';
        }

        // Display error message using Snackbar
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
Result: Whenever an HTTP error occurs, a user-friendly message is displayed using a Snackbar, improving the user experience.
```

## Request and Response Logging
!!! note "Request and Response Logging"
Scenario: In a large-scale enterprise application, log every HTTP request and response for debugging and auditing purposes.

Implementation:
```typescript
Copy code
// logging.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request:', req);

    return next.handle(req).pipe(
      tap(event => {
        console.log('Response:', event);
      })
    );
  }
}
```

## Adding Custom Headers
!!! note "Intersceptors"Adding Custom Headers"
    Scenario: In a healthcare application, every request must include a custom header for compliance with medical data regulations.

Implementation:
```typescript
Copy code
// headers.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-Custom-Header': 'HealthcareApp'
      }
    });

    return next.handle(modifiedReq);
  }
}
Result: Every HTTP request includes the custom header, ensuring compliance with industry standards.
```


