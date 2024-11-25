* Write code with solid Principles
* Follow angular styles guide
* Add tets to new functionalit
* Use descriptive variable names
* use constants for values that do not change
* Prioritize readibility over cleverness or brevity
* commits followed by semantic versioning https://semver.org/
* Consider maintability while writing code
* Breaking up bigger fucntions into multiple smaller ones (gen rule: 75 lines of code is Big)
* Break up big components into smaller more manageable ones
* Minimize complexity
* Making Accesbility, Testing, Codeing Guidelines
* Using Design tokens instead of statc css values


## Apllication load times
 
 * Enable brotic ststic compression for appplications
 * Enable cache busting on each application build, prod build files should in format main.[unique-id].js
 * Lazy load apps as much as possible , which will decrease load time
 * Tree shaking internally dev libraries, try using ng-samurai
 * Consider making load time feels faster using skeleton loading by letting users know ehat is happening on screen
 * Slpit apps if they get too big , remember to build products, not small monoliths