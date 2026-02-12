# 📜 The Ultimate Javascript Mastery Checklist (200+ Items)

> **The Goal:** From "Hello World" to Senior Front-End Engineer.
> **The Strategy:** Hybrid Learning. We combine the _structure_ of a university course with the _practicality_ of Scrimba/Exercism and the _depth_ of MDN.

---

### ⚙️ Stage 1: Environment & Basics (The Foundation)

_Ref: [Scrimba Unit 1](https://scrimba.com/learn/learnjavascript) | [MDN First Steps](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps)_

- [ ] 1. **Setup**: Install Node.js & VS Code.
- [ ] 2. **Tooling**: Install `ESLint` & `Prettier` extensions.
- [ ] 3. **Hello World**: Connect `app.js` to `index.html`.
- [ ] 4. **Console**: Master `console.log`, `console.error`, `console.table`.
- [ ] 5. **Variables**: Understand `var` vs `let` vs `const` (Use `const` by default).
- [ ] 6. **Scope Intro**: Block Scope `{}` vs Global Scope.
- [ ] 7. **Primitives**: String, Number, Boolean.
- [ ] 8. **Empty Values**: `null` vs `undefined` vs `NaN`.
- [ ] 9. **Template Literals**: Use backticks `` `Hello ${name}` ``.
- [ ] 10. **Math**: `+`, `-`, `*`, `/`, `%` (Modulus).
- [ ] 11. **Equality**: Always use `===` over `==`.
- [ ] 12. **Logic**: `&&` (AND), `||` (OR), `!` (NOT).
- [ ] 13. **Modern Logic**: Nullish Coalescing `??`.
- [ ] 14. **Conditionals**: `if`, `else if`, `else`.
- [ ] 15. **Switch**: When to use `switch (true)` patterns.
- [ ] 16. **Ternary**: `condition ? true : false` (One-line ifs).
- [ ] 17. **Loops**: `for` loop basics.

> **🔥 Challenge: The Passenger Counter**
> Create an app that counts people entering a subway. Use a button to increment, and a save button to log the count. (See our local Lesson 1).

---

### 📦 Stage 2: Data Structures (Objects & Arrays)

_Ref: [Exercism Arrays](https://exercism.org/tracks/javascript/concepts/arrays) | [Javascript.info Objects](https://javascript.info/object)_

- [ ] 18. **Objects**: Create `{ key: value }`.
- [ ] 19. **Access**: Dot notation `obj.prop` vs Bracket `obj["prop"]`.
- [ ] 20. **Mutation**: Add/Edit/Delete object properties.
- [ ] 21. **Methods**: Functions inside objects.
- [ ] 22. **Destructuring Objects**: `const { name } = user`.
- [ ] 23. **Spread Objects**: `const copy = { ...user }`.
- [ ] 24. **Optional Chaining**: `user?.address?.street` (Safety).
- [ ] 25. **Arrays**: Create `[1, 2, 3]`.
- [ ] 26. **Destructuring Arrays**: `const [first, second] = list`.
- [ ] 27. **Spread Arrays**: `const combined = [...arr1, ...arr2]`.
- [ ] 28. **Stack Ops**: `push`, `pop`, `shift`, `unshift`.
- [ ] 29. **Slicing**: `slice` (copy) vs `splice` (mutate).

> **🔥 Challenge: The Contact Book**
> Create an array of objects representing contacts. Write a function that takes a name, searches the array, and returns their phone number. If not found, return "Unknown".

---

### 🛠️ Stage 3: Functional Programming (Array Methods)

\*Ref: [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | **CRITICAL SKILL\***

- [ ] 30. **forEach**: Loop without returning.
- [ ] 31. **map**: Transform simple data (`[1,2]` -> `[2,4]`).
- [ ] 32. **filter**: Select specific items.
- [ ] 33. **reduce**: Aggregate data (Sum, Counts).
- [ ] 34. **find**: Get the first specific item.
- [ ] 35. **some/every**: Boolean checks on lists.
- [ ] 36. **sort**: Sorting numbers properly `(a,b) => a-b`.
- [ ] 37. **includes**: Check existence.
- [ ] 38. **Chaining**: `.filter().map()` patterns.

> **🔥 Challenge: The E-Commerce Filter**
> Given a list of products (name, price, category), write a chain that:
>
> 1. Filters for category "Tech".
> 2. Filters for items under $500.
> 3. Maps them to a string "$99 - Item Name".

---

### 🧩 Stage 4: Functions & Logic

_Ref: [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)_

- [ ] 39. **Declarations**: `function name() {}`.
- [ ] 40. **Expressions**: `const name = function() {}`.
- [ ] 41. **Arrows**: `const name = () => {}`.
- [ ] 42. **Implicit Return**: `const add = (a,b) => a+b`.
- [ ] 43. **Defaults**: `function(a = 10)`.
- [ ] 44. **Rest Params**: `function(...args)`.
- [ ] 45. **'this' (Standard)**: Dynamic context.
- [ ] 46. **'this' (Arrow)**: Lexical context (Inherited).
- [ ] 47. **Bind/Call/Apply**: Manual `this` control.

> **🔥 Challenge: The Calculator Factory**
> Create a function `createCalculator(initialValue)` that returns an object with methods `.add(n)`, `.subtract(n)`, and `.value()`. Use closures to keep the value private.

---

### 🖥️ Stage 5: DOM Manipulation (The Browser)

_Ref: [Scrimba Unit 2](https://scrimba.com/learn/learnjavascript) | [Dom Enlightenment](http://domenlightenment.com/)_

- [ ] 48. **DOM Tree**: Understanding the structure.
- [ ] 49. **Selection (Old)**: `getElementById`.
- [ ] 50. **Selection (New)**: `querySelector` / `querySelectorAll`.
- [ ] 51. **Text**: `textContent` vs `innerHTML`.
- [ ] 52. **Style**: `element.style.color`.
- [ ] 53. **Classes**: `classList.add`, `.remove`, `.toggle`.
- [ ] 54. **Creation**: `createElement`.
- [ ] 55. **Insertion**: `appendChild`, `append`.
- [ ] 56. **Placement**: `insertAdjacentHTML` (Precise insertion).
- [ ] 57. **Removal**: `element.remove()`.
- [ ] 58. **Traversal**: `parentNode`, `children`.
- [ ] 59. **Attributes**: `dataset` (`data-id="1"`).

> **🔥 Challenge: The Dynamic List**
> Create an input field and a button. When clicking the button, append the text as a new list item (`<li>`) to a `<ul>`. Clicking the list item should delete it.

---

### 🖱️ Stage 6: Events & Interaction

_Ref: [MDN Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)_

- [ ] 60. **Listeners**: `addEventListener` (Never use `onclick` in HTML).
- [ ] 61. **Mouse**: `click`, `mouseenter`.
- [ ] 62. **Keyboard**: `keydown`, `keyup` (`e.key`).
- [ ] 63. **Forms**: `submit`, `input`, `change`.
- [ ] 64. **Prevention**: `e.preventDefault()` (Stop form reload).
- [ ] 65. **Event Object**: Understanding `e`.
- [ ] 66. **Targeting**: `e.target` vs `e.currentTarget`.
- [ ] 67. **Bubbling**: How events travel up.
- [ ] 68. **Delegation**: Listen on parent, catch child events (Performance).

> **🔥 Challenge: The Modal**
> Build a Modal (Popup). Clicking a button opens it. Clicking the "X" or the _background_ (overlay) closes it. Use Event Bubbling awareness to ensure clicking the _content_ card doesn't close it.

---

### ⏳ Stage 7: Async Javascript (APIs)

_Ref: [Youtube: Philip Roberts Event Loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ) | [MDN Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)_

- [ ] 69. **Sync vs Async**: Blocking vs Non-blocking.
- [ ] 70. **Timers**: `setTimeout`, `setInterval`.
- [ ] 71. **Callback Hell**: Why we need Promises.
- [ ] 72. **Promises**: The `Promise` object.
- [ ] 73. **States**: Pending, Resolved, Rejected.
- [ ] 74. **Usage**: `.then()`, `.catch()`, `.finally()`.
- [ ] 75. **Async/Await**: Modern syntax sugar.
- [ ] 76. **Error Handling**: `try { ... } catch (e) { ... }`.
- [ ] 77. **Fetch API**: `fetch('url')`.
- [ ] 78. **JSON**: `.json()` parsing.
- [ ] 79. **HTTP Methods**: GET vs POST.
- [ ] 80. **Headers**: Content-Type, Auth tokens.
- [ ] 81. **Status Codes**: 200 (OK), 404 (Not Found), 500 (Server Error).

> **🔥 Challenge: The Github User Finder**
> Build an app where you type a Github username. It fetches their profile from `https://api.github.com/users/{name}` and displays their avatar and bio. Handle 404 errors (User not found).

---

### 🧠 Stage 8: Under the Hood (Advanced)

_Ref: [You Don't Know JS (Book)](https://github.com/getify/You-Dont-Know-JS)_

- [ ] 82. **V8 Engine**: Compilation basics.
- [ ] 83. **Call Stack**: Last In, First Out.
- [ ] 84. **Hoisting**: Var vs Function hoisting.
- [ ] 85. **Scope Chain**: How JS looks for variables.
- [ ] 86. **Closures**: Functions remembering their environment.
- [ ] 87. **Event Loop**: Macrotasks vs Microtasks.
- [ ] 88. **Reference vs Value**: Objects are references!

> **🔥 Challenge: The "Tricky" Interview**
> Explain to a friend (or a rubber duck) exactly correctly why `0.1 + 0.2 !== 0.3` and how `setTimeout(() => {}, 0)` works.

---

### 🏗️ Stage 9: Object Oriented Programming (OOP)

_Ref: [MDN Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)_

- [ ] 89. **Prototypes**: The hidden `__proto__`.
- [ ] 90. **Classes**: `class User {}`.
- [ ] 91. **Constructor**: Initialization.
- [ ] 92. **Inheritance**: `extends` and `super()`.
- [ ] 93. **Encapsulation**: `#privateFields`.
- [ ] 94. **Accessors**: `get` and `set`.
- [ ] 95. **Static**: `static` methods.

> **🔥 Challenge: The Game Character**
> Create a class `Character` with health and strength. Create a subclass `Warrior` that adds a `weapon` property and overrides the `attack()` method.

---

### 🚀 Stage 10: Real World Tools

_Ref: [MDN Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)_

- [ ] 96. **Modules**: ES6 `import` / `export`.
- [ ] 97. **Storage**: `localStorage` (Persistent).
- [ ] 98. **Session**: `sessionStorage` (Temporary).
- [ ] 99. **JSON Tools**: `JSON.parse()`, `JSON.stringify()`.
- [ ] 100. **Dates**: `new Date()`, timestamps.
- [ ] 101. **Math**: `Math.random()`, `Math.floor()`.
- [ ] 102. **Regex**: Basic validation patterns.
- [ ] 103. **Sets**: Unique arrays `new Set()`.
- [ ] 104. **Maps**: Better objects `new Map()`.
- [ ] 105. **Errors**: `throw new Error()`.

> **🔥 Challenge: The Dark Mode Switch**
> Build a toggle switch that changes the site to Dark Mode. Save the user's preference in `localStorage` so it remembers them next time they visit.

---

### 🌀 Stage 11: Advanced Async Patterns

_Ref: [JavaScript.info Async](https://javascript.info/async)_

- [ ] 106. **Promise.all**: Run tasks in parallel (Fail fast).
- [ ] 107. **Promise.race**: First one wins.
- [ ] 108. **Promise.allSettled**: Wait for all, regardless of outcome.
- [ ] 109. **Promise.any**: First success wins.
- [ ] 110. **Generators**: `function*` and `yield`.
- [ ] 111. **Iterators**: Making objects iterable.
- [ ] 112. **Async Iteration**: `for await (let item of items)`.
- [ ] 113. **AbortController**: Cancelling Fetch requests.
- [ ] 114. **Debouncing**: Delaying function execution (Search bars).
- [ ] 115. **Throttling**: Limiting execution rate (Scroll events).

> **🔥 Challenge: The Type-Ahead Search**
> Build a search input that fetches results from an API. Implement `Debounce` so it only fetches 500ms after the user _stops_ typing.

---

### 🛡️ Stage 12: Error Handling & Debugging

_Ref: [MDN Control Flow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)_

- [ ] 116. **Console Tricks**: `console.group`, `console.time`.
- [ ] 117. **Debugger**: Using the `debugger` keyword.
- [ ] 118. **Custom Errors**: `class AppError extends Error`.
- [ ] 119. **Stack Traces**: Reading the red text.
- [ ] 120. **Defensive Coding**: Checking types before execution.
- [ ] 121. **Network Errors**: Handling "You are offline".
- [ ] 122. **Global Handlers**: `window.onerror`.

> **🔥 Challenge: The Robust Form**
> Build a form that validates data. If validation fails, throw a custom `ValidationError`. Catch it and display a red error message below the input.

---

### 🎨 Stage 13: Design Patterns

_Ref: [Patterns.dev](https://www.patterns.dev/)_

- [ ] 123. **Singleton**: Only one instance exists.
- [ ] 124. **Factory**: Function that creates objects.
- [ ] 125. **Observer**: Listeners (like `addEventListener`).
- [ ] 126. **Module**: encapsulating code (IIFE or ES Modules).
- [ ] 127. **Decorator**: Wrapping functions to add behavior.
- [ ] 128. **Proxy**: Intercepting object operations.

> **🔥 Challenge: The Singleton Config**
> Create a `Config` object that cannot be instantiated twice. If someone tries `new Config()` again, return the original instance.

---

### 🌐 Stage 14: Browser APIs (The Powerhouse)

_Ref: [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)_

- [ ] 129. **Geolocation**: `navigator.geolocation`.
- [ ] 130. **Clipboard**: `navigator.clipboard.writeText`.
- [ ] 131. **Notifications**: Requesting permission and sending.
- [ ] 132. **Canvas**: Drawing on the screen.
- [ ] 133. **IntersectionObserver**: Detect when elements enter viewport.
- [ ] 134. **ResizeObserver**: Detect element size changes.
- [ ] 135. **MutationObserver**: Detect DOM changes.
- [ ] 136. **History API**: `pushState` (SPA routing).
- [ ] 137. **URL API**: Parsing query params easily.
- [ ] 138. **Web Workers**: Running code in background threads.

> **🔥 Challenge: Infinite Scroll**
> Use `IntersectionObserver` to load more content automatically when the user scrolls to the bottom of the page.

---

### ♿ Stage 15: Accessibility (A11y)

_Ref: [W3C WAI](https://www.w3.org/WAI/fundamentals/)_

- [ ] 139. **Semantic HTML**: Buttons vs Divs.
- [ ] 140. **Alt Text**: Images for screen readers.
- [ ] 141. **Keyboard Nav**: Focus management (`tabindex`).
- [ ] 142. **ARIA Labels**: `aria-label`, `aria-describedby`.
- [ ] 143. **Live Regions**: `aria-live` for dynamic content.
- [ ] 144. **Contrast**: Colors and readability.
- [ ] 145. **Focus Trapping**: Keeping focus inside modals.

> **🔥 Challenge: The Accessible Modal**
> Refactor your previous Modal. Ensure that when it opens, focus moves _inside_ it. When it closes, focus returns to the button that opened it.

---

### ⚡ Stage 16: Performance Optimization

_Ref: [Web.dev Performance](https://web.dev/learn/performance)_

- [ ] 146. **Minification**: Smaller file sizes.
- [ ] 147. **Code Splitting**: Loading only what's needed.
- [ ] 148. **Lazy Loading**: `loading="lazy"` for images.
- [ ] 149. **Memoization**: Caching function results.
- [ ] 150. **Reflow vs Repaint**: Animation costs.
- [ ] 151. **Layout Thrashing**: Reading/Writing DOM in loops.
- [ ] 152. **Event Delegation**: One listener instead of 100.
- [ ] 153. **Virtual DOM**: Concept behind React/Vue.

> **🔥 Challenge: The Huge List**
> Render a list of 10,000 items. Notice the lag. Now, try to implement "Virtual Scrolling" (only rendering what is visible) to make it smooth.

---

### 🔒 Stage 17: Security Best Practices

_Ref: [OWASP Top 10](https://owasp.org/www-project-top-ten/)_

- [ ] 154. **XSS (Cross Site Scripting)**: Never use `innerHTML` with user input.
- [ ] 155. **Sanitization**: Cleaning inputs.
- [ ] 156. **CSRF**: Cross-Site Request Forgery tokens.
- [ ] 157. **HTTPS**: Why encryption matters.
- [ ] 158. **LocalStorage Risks**: Don't store secrets there.
- [ ] 159. **Dependency Safety**: `npm audit`.
- [ ] 160. **Input Validation**: Never trust the client.

> **🔥 Challenge: The Hacker**
> Create an input field that updates a `div`. Try to inject a `<script>alert('hacked')</script>` into it. Then, write code that prevents this script from running.

---

### 🧪 Stage 18: Testing

_Ref: [Jest Docs](https://jestjs.io/)_

- [ ] 161. **Unit Testing**: Testing individual functions.
- [ ] 162. **Integration Testing**: Testing how modules work together.
- [ ] 163. **E2E Testing**: Cypress/Playwright basics.
- [ ] 164. **Test Runners**: Jest/Vitest.
- [ ] 165. **Assertions**: `expect(a).toBe(b)`.
- [ ] 166. **Mocking**: Faking API calls.
- [ ] 167. **Coverage**: How much code is tested?
- [ ] 168. **TDD**: Test Driven Development.

> **🔥 Challenge: Test the Counter**
> Write a test file for your Lesson 1 Passenger Counter. Mock the DOM to verify the count increases when the button is clicked.

---

### 💎 Stage 19: Modern ES Features (ES6-ES2024)

_Ref: [ES6 Features](https://es6-features.org/)_

- [ ] 169. **Proxies**: `new Proxy()`.
- [ ] 170. **Symbols**: Unique identifiers.
- [ ] 171. **Generators**: `function*`.
- [ ] 172. **BigInt**: For massive numbers `100n`.
- [ ] 173. **WeakMap/WeakSet**: Garbage-collection friendly storage.
- [ ] 174. **Top Level Await**: Await outside async functions.
- [ ] 175. **Dynamic Imports**: `import()`.
- [ ] 176. **Logical Assignment**: `||=`, `&&=`, `??=`.
- [ ] 177. **Array.at()**: Accessing last item `[-1]`.
- [ ] 178. **Object.fromEntries()**: Reverse `Object.entries`.

> **🔥 Challenge: The Magic Object**
> Use a `Proxy` to create an object that logs every time a property is read or written to.

---

### 🧹 Stage 20: Clean Code & Architecture

_Ref: [Clean Code JS](https://github.com/ryanmcdermott/clean-code-javascript)_

- [ ] 179. **Variable Naming**: `isLoggedIn` vs `flag`.
- [ ] 180. **Function Naming**: Verb-Noun (`getUser`).
- [ ] 181. **Magic Numbers**: Avoid them. Use constants.
- [ ] 182. **Single Responsibility**: One function, one job.
- [ ] 183. **DRY**: Don't Repeat Yourself.
- [ ] 184. **Comments**: Why, not What.
- [ ] 185. **Project Structure**: Folder organization.
- [ ] 186. **SOLID**: 5 Principles of OOD.
- [ ] 187. **Refactoring**: Improving without changing behavior.
- [ ] 188. **YAGNI**: You Aren't Gonna Need It.

> **🔥 Challenge: The Cleaner**
> Take a messy 50-line function. Refactor it into 3 small, pure functions with descriptive names.

---

### 🌟 Stage 21: Algorithms & Problem Solving

_Ref: [LeetCode](https://leetcode.com/) | [HackerRank](https://www.hackerrank.com/)_

- [ ] 189. **Big O Notation**: Complexity.
- [ ] 190. **Recursion**: Function calling itself.
- [ ] 191. **Linear Search**: O(n).
- [ ] 192. **Binary Search**: O(log n).
- [ ] 193. **Bubble Sort**: Basic sorting.
- [ ] 194. **Merge/Quick Sort**: Fast sorting.
- [ ] 195. **Hash Tables**: Key-value lookup.
- [ ] 196. **Linked Lists**: Node chains.
- [ ] 197. **Trees**: DOM is a tree!
- [ ] 198. **Graphs**: Social networks.
- [ ] 199. **Sliding Window**: Algorithm pattern.
- [ ] 200. **Two Pointers**: Algorithm pattern.

> **🔥 Challenge: Palindrome Checker**
> Write the most efficient function possible to check if a string is a palindrome (reads same forwards and backwards).

---

### 🎓 Stage 22: Deployment & Git

_Ref: [Git Guide](https://rogerdudler.github.io/git-guide/)_

- [ ] 201. **Git Init**: Starting a repo.
- [ ] 202. **Stage & Commit**: `git add .`, `git commit`.
- [ ] 203. **Branching**: `git branch`.
- [ ] 204. **Merging/PRs**: Pull Requests.
- [ ] 205. **Merge Conflicts**: Resolving them.
- [ ] 206. **Github**: Hosting code.
- [ ] 207. **Netlify/Vercel**: Deploying static sites.
- [ ] 208. **CI/CD**: Introduction to automation.
- [ ] 209. **Semantic Versioning**: v1.0.0.
- [ ] 210. **Open Source**: How to contribute.
