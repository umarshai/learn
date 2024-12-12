# HTML5 Interview Questions

<details>
<summary>What is HTML5? How is it different from HTML4?</summary>

HTML5 is the latest version of HTML, designed to improve multimedia handling, semantic markup, and web applications without relying on external plugins (like Flash).

**Differences from HTML4:**
- Introduced semantic elements like `<header>`, `<footer>`, `<article>`, and `<section>`.
- Supports multimedia elements like `<audio>` and `<video>`.
- Includes new APIs like Web Storage, Canvas, and Geolocation.
- Provides better error handling and browser compatibility.

</details>

<details>
<summary>What are some new semantic elements introduced in HTML5?</summary>

- `<header>`: Represents the introductory content or navigational links.
- `<footer>`: Represents footer content like author information, copyright, etc.
- `<article>`: Represents self-contained content.
- `<section>`: Defines sections in a document.
- `<aside>`: Represents content tangentially related to the main content.
- `<main>`: Represents the main content of a document.

</details>

<details>
<summary>What are HTML5 Web Storage APIs? How are they different from cookies?</summary>

HTML5 provides two Web Storage APIs for client-side data storage:
- **localStorage**: Stores data with no expiration date.
- **sessionStorage**: Stores data for the session (cleared when the browser is closed).

**Differences from Cookies:**
- Larger storage capacity (5MB per domain compared to ~4KB for cookies).
- Stored only on the client-side, reducing server load.
- Faster because it doesn’t send data with every HTTP request.

</details>

<details>
<summary>Explain the purpose of the `<canvas>` element in HTML5.</summary>

The `<canvas>` element is used for drawing graphics via JavaScript. It allows developers to create:
- 2D/3D graphics
- Animations
- Game graphics

Example:
```html
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 150, 80);
</script>
```

</details>

<details>
<summary>What is the difference between `<audio>` and `<video>` tags in HTML5?</summary>

- **`<audio>`**: Embeds audio content.
- **`<video>`**: Embeds video content.

Both support attributes like `controls`, `autoplay`, and `loop`. Example:
```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<video controls width="400">
  <source src="video.mp4" type="video/mp4">
  Your browser does not support the video element.
</video>
```

</details>

<details>
<summary>What is the purpose of the `<datalist>` tag in HTML5?</summary>

The `<datalist>` tag is used to provide a list of predefined options for an `<input>` element. It improves user experience by offering suggestions as the user types.

Example:
```html
<input list="browsers" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>
```

</details>

<details>
<summary>What is the difference between `<progress>` and `<meter>` tags?</summary>

- **`<progress>`**: Represents the completion progress of a task (e.g., file upload).
- **`<meter>`**: Represents a scalar measurement within a known range (e.g., disk usage).

Examples:
```html
<progress value="70" max="100"></progress>

<meter value="0.6" min="0" max="1"></meter>
```

</details>

<details>
<summary>What is the purpose of the HTML5 Geolocation API?</summary>

The Geolocation API allows a website to access the user’s location (with their consent). Commonly used in applications like maps and location-based services.

Example:
```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(`Latitude: ${position.coords.latitude}`);
    console.log(`Longitude: ${position.coords.longitude}`);
  });
} else {
  console.log('Geolocation is not supported by this browser.');
}
```

</details>

<details>
<summary>What is the purpose of the `required` attribute in HTML5 forms?</summary>

The `required` attribute ensures that the user fills in a field before submitting the form. It enhances form validation without needing JavaScript.

Example:
```html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Submit</button>
</form>
```

</details>

<details>
<summary>What are custom elements in HTML5?</summary>

Custom elements are a feature of the Web Components specification that allows developers to define their own HTML tags with custom behavior.

Key parts:
- **Custom element classes**: Define custom HTML elements using JavaScript.
- **Shadow DOM**: Encapsulates styles and scripts to avoid conflicts.
- **HTML templates**: Provide reusable structures.

Example:
```javascript
class MyElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<p>Hello from custom element!</p>`;
  }
}
customElements.define('my-element', MyElement);
```

Usage:
```html
<my-element></my-element>
```

</details>

<details>
<summary>How does the `<picture>` tag improve image responsiveness?</summary>

The `<picture>` tag allows developers to define multiple image sources for different screen sizes or resolutions. This improves responsiveness by serving the most appropriate image based on the user’s device or browser.

Example:
```html
<picture>
  <source srcset="image-small.jpg" media="(max-width: 600px)">
  <source srcset="image-medium.jpg" media="(max-width: 1200px)">
  <img src="image-large.jpg" alt="Responsive example">
</picture>
```

- The browser selects the first `<source>` that matches the media query.
- If no `<source>` matches, the `<img>` tag acts as a fallback.

</details>

<details>
<summary>What is the purpose of the `<template>` tag in HTML5?</summary>

The `<template>` tag is used to define HTML fragments that are not rendered until they are explicitly added to the DOM via JavaScript. It is commonly used for reusable components.

Example:
```html
<template id="my-template">
  <div class="template-content">
    <p>This content will be rendered dynamically.</p>
  </div>
</template>

<script>
  const template = document.getElementById('my-template');
  const content = template.content.cloneNode(true);
  document.body.appendChild(content);
</script>
```

</details>

<details>
<summary>What is the purpose of the `<mark>` tag in HTML5?</summary>

The `<mark>` tag is used to highlight text, typically to indicate relevance or a match in search results.

Example:
```html
<p>The <mark>highlighted text</mark> is important.</p>
```

</details>

<details>
<summary>What are some common global attributes in HTML5?</summary>

Global attributes can be used on any HTML element. Examples include:
- `class`: Assigns one or more class names.
- `id`: Assigns a unique identifier.
- `style`: Inline CSS styles.
- `title`: Specifies extra information displayed as a tooltip.
- `data-*`: Custom data attributes for embedding data.

Example:
```html
<div id="unique" class="example" data-info="custom-data">Example content</div>
```

</details>
