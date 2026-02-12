export const contentData = [
  {
    title: "Stage 1: Environment & Basics",
    description:
      "The mental model of JavaScript. Variables, execution flow, and basic types.",
    items: [
      {
        title: "Setup",
        desc: "Install Node.js & VS Code.",
        explanation:
          "Node.js is the runtime. VS Code is the editor. Together they form your lab.",
        code: "node -v\n# v20.x.x",
        prompt: "Open your terminal and check your node version.",
        resources: [
          { label: "Node.js Download", url: "https://nodejs.org/" },
          {
            label: "VS Code Setup",
            url: "https://code.visualstudio.com/docs/setup/setup-overview",
          },
        ],
      },
      {
        title: "Tooling",
        desc: "Install ESLint & Prettier extensions.",
        explanation:
          "Prettier formats your code automatically. ESLint catches bugs.",
        code: '// .prettierrc\n{\n  "semi": true,\n  "singleQuote": true\n}',
        prompt:
          "Install the extensions and try 'Format Document' on a messy file.",
      },
      {
        title: "Hello World",
        desc: "Connect app.js to index.html.",
        explanation: "The script tag connects your logic to the view.",
        code: '<script src="app.js" defer></script>',
        prompt:
          "Why do we use the 'defer' attribute? Remove it and see what happens if script is in head.",
      },
      {
        title: "Console",
        desc: "Master console.log, .error, .table.",
        explanation: "Your primary debugging tool.",
        code: "console.table([{a:1}, {a:2}]);",
        prompt:
          "Try console.dir(document.body). How is it different from console.log?",
      },
      {
        title: "Variables",
        desc: "Understand var vs let vs const.",
        explanation:
          "Always use const by default. Use let only when values change. Never use var.",
        code: "const pi = 3.14;\nlet age = 20;\nage = 21;",
        prompt: "What happens if you declare a const without a value? const x;",
      },
      {
        title: "Scope Intro",
        desc: "Block Scope {} vs Global Scope.",
        explanation: "Variables defined inside {} stay inside {}.",
        code: "{ let x = 10; }\nconsole.log(x); // Error",
        prompt: "Can 'var' escape a block? Try it.",
        resources: [
          {
            label: "MDN: Variable Scope",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope",
          },
        ],
      },
      {
        title: "Primitives",
        desc: "String, Number, Boolean.",
        explanation: "The basic building blocks of data.",
        code: "typeof 'hello' // string\ntypeof true // boolean",
        prompt: "What is typeof NaN?",
      },
      {
        title: "Empty Values",
        desc: "null vs undefined vs NaN.",
        explanation:
          "Undefined = 'I don't know yet'. Null = 'I know it is nothing'.",
        code: "let x;\nconsole.log(x); // undefined\nlet y = null;",
        prompt: "Is null == undefined? Is null === undefined?",
      },
      {
        title: "Template Literals",
        desc: "Use backticks `Hello ${name}`.",
        explanation: "Embed expressions inside strings.",
        code: "const name = 'Ahmed';\nconst msg = `Hello ${name}`;",
        prompt:
          "Try to support multi-line strings without backticks. It is painful.",
      },
      {
        title: "Math",
        desc: "+, -, *, /, % (Modulus).",
        explanation: "Basic arithmetic sequences.",
        code: "10 % 3 // 1 (Remainder)",
        prompt: "How do you check if a number is even using %?",
      },
      {
        title: "Equality",
        desc: "Always use === over ==.",
        explanation:
          "=== checks value AND type. == checks value only (type coercion).",
        code: "5 == '5' // true\n5 === '5' // false",
        prompt: "Check [] == []. Why is it false?",
      },
      {
        title: "Logic",
        desc: "&& (AND), || (OR), ! (NOT).",
        explanation: "Combining boolean conditions.",
        code: "if (isUser && isLoggedIn) { ... }",
        prompt: "What is the result of 'false || 10'?",
      },
      {
        title: "Modern Logic",
        desc: "Nullish Coalescing ??.",
        explanation:
          "?? only checks for null/undefined. || checks for any falsy value (0, '').",
        code: "let x = 0;\nlet val = x ?? 10; // 0\nlet val2 = x || 10; // 10",
        prompt: "Why is ?? better for setting default numbers?",
      },
      {
        title: "Conditionals",
        desc: "if, else if, else.",
        explanation: "Control flow.",
        code: "if (x > 10) { ... }",
        prompt: "Can you write an if statement without curly braces?",
      },
      {
        title: "Switch",
        desc: "When to use switch (true) patterns.",
        explanation: "Useful for multiple discrete cases.",
        code: "switch(role) {\n  case 'admin': ...\n  case 'user': ...\n}",
        prompt: "What happens if you forget 'break'?",
      },
      {
        title: "Ternary",
        desc: "condition ? true : false.",
        explanation: "One-line if/else for returning values.",
        code: "const status = age > 18 ? 'Adult' : 'Minor';",
        prompt: "Try nesting ternaries. Does it remain readable? (Hint: No).",
      },
      {
        title: "Loops",
        desc: "for loop basics.",
        explanation: "Repeating tasks.",
        code: "for (let i=0; i<5; i++) { ... }",
        prompt: "How do you break out of a loop early?",
      },
    ],
  },
  {
    title: "Stage 2: Data Structures",
    description: "Organizing data with Objects and Arrays.",
    items: [
      {
        title: "Objects",
        desc: "Create { key: value }.",
        explanation: "Grouping related data.",
        code: "const car = { make: 'Toyota', year: 2020 };",
        prompt: "Create an object representing yourself.",
        resources: [
          {
            label: "Javascript.info: Objects",
            url: "https://javascript.info/object",
          },
        ],
      },
      {
        title: "Access",
        desc: "Dot notation vs Bracket notation.",
        explanation: "Use dot for known keys. Use brackets for dynamic keys.",
        code: "obj.key\nobj['key-with-dash']",
        prompt: "Access a property using a variable key.",
      },
      {
        title: "Mutation",
        desc: "Add/Edit/Delete object properties.",
        explanation: "Objects are mutable.",
        code: "user.name = 'New Name';\ndelete user.age;",
        prompt:
          "How do you prevent an object from being mutated? (Object.freeze).",
      },
      {
        title: "Methods",
        desc: "Functions inside objects.",
        explanation: "Behavior associated with data.",
        code: "const duck = {\n  quack: () => console.log('Quack')\n}",
        prompt: "Call the method you created.",
      },
      {
        title: "Destructuring Objects",
        desc: "const { name } = user.",
        explanation: "Extracting properties into variables.",
        code: "const { id, title } = post;",
        prompt: "Destructure and rename a property at the same time.",
      },
      {
        title: "Spread Objects",
        desc: "const copy = { ...user }.",
        explanation: "Cloning or merging objects.",
        code: "const updated = { ...user, active: true };",
        prompt: "Does spread perform a deep copy or shallow copy?",
      },
      {
        title: "Optional Chaining",
        desc: "user?.address?.street.",
        explanation: "Safely access nested properties without crashing.",
        code: "const city = user?.address?.city;",
        prompt: "Try accessing a property on undefined without ?.",
      },
      {
        title: "Arrays",
        desc: "Create [1, 2, 3].",
        explanation: "Ordered lists of data.",
        code: "const numbers = [1, 5, 9];",
        prompt: "Can an array hold mixed types?",
        resources: [
          {
            label: "Exercism: Arrays",
            url: "https://exercism.org/tracks/javascript/concepts/arrays",
          },
          {
            label: "MDN: Arrays",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
          },
        ],
      },
      {
        title: "Destructuring Arrays",
        desc: "const [first, second] = list.",
        explanation: "Unpacking array items by position.",
        code: "const [x, y] = coordinates;",
        prompt: "How do you skip the second item?",
      },
      {
        title: "Spread Arrays",
        desc: "const combined = [...arr1, ...arr2].",
        explanation: "Combining lists.",
        code: "const all = [...old, ...newItems];",
        prompt: "Use spread to convert a string into an array of characters.",
      },
      {
        title: "Stack Ops",
        desc: "push, pop, shift, unshift.",
        explanation: "Adding/removing from ends.",
        code: "arr.push(1); // Add to end\narr.pop(); // Remove from end",
        prompt: "Which is slower: push or unshift? Why?",
      },
      {
        title: "Slicing",
        desc: "slice (copy) vs splice (mutate).",
        explanation: "Slice creates a new array. Splice modifies the original.",
        code: "const top3 = users.slice(0, 3);",
        prompt: "Use splice to remove the 2nd item from an array.",
      },
    ],
  },
  {
    title: "Stage 3: Functional Programming",
    description: "Mastering Array Methods.",
    items: [
      {
        title: "forEach",
        desc: "Loop without returning.",
        explanation: "Just iterates. Use for side effects.",
        code: "users.forEach(u => console.log(u));",
        prompt: "Can you return a value from forEach?",
      },
      {
        title: "map",
        desc: "Transform simple data.",
        explanation: "1-to-1 transformation of a list.",
        code: "const ids = users.map(u => u.id);",
        prompt: "Map an array of numbers to their squares.",
        resources: [
          {
            label: "MDN: Array.prototype.map()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          },
        ],
      },
      {
        title: "filter",
        desc: "Select specific items.",
        explanation: "Returns a subset of the array.",
        code: "const adults = users.filter(u => u.age >= 18);",
        prompt: "Filter a list of strings to only those longer than 5 chars.",
      },
      {
        title: "reduce",
        desc: "Aggregate data.",
        explanation: "Boil an array down to a single value.",
        code: "const sum = nums.reduce((acc, n) => acc + n, 0);",
        prompt: "Use reduce to turn an array of keys into an object.",
        resources: [
          {
            label: "MDN: Array.prototype.reduce()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce",
          },
          {
            label: "Video: Reduce in 100 Seconds",
            url: "https://www.youtube.com/watch?v=tVCZaXHeT-4",
          },
        ],
      },
      {
        title: "find",
        desc: "Get the first specific item.",
        explanation: "Returns the item itself, not an array.",
        code: "const admin = users.find(u => u.role === 'admin');",
        prompt: "What does find return if nothing matches?",
      },
      {
        title: "some/every",
        desc: "Boolean checks on lists.",
        explanation: "Check if any or all items match.",
        code: "const hasAdmin = users.some(u => u.isAdmin);",
        prompt: "Check if every number in a list is positive.",
      },
      {
        title: "sort",
        desc: "Sorting numbers properly.",
        explanation: "Default sort converts to string!",
        code: "nums.sort((a, b) => a - b);",
        prompt: "Sort an array of objects by a 'date' property.",
      },
      {
        title: "includes",
        desc: "Check existence.",
        explanation: "Simple check for primitive values.",
        code: "tags.includes('new');",
        prompt: "Does includes work for objects?",
      },
      {
        title: "Chaining",
        desc: ".filter().map() patterns.",
        explanation: "Combining operations for elegant data flow.",
        code: "users.filter(isActive).map(toCard);",
        prompt: "Filter even numbers, then square them, then sum them.",
      },
    ],
  },
  {
    title: "Stage 4: Functions & Logic",
    description: "Defining behavior and logic blocks.",
    items: [
      {
        title: "Declarations",
        desc: "function name() {}",
        explanation: "Hoisted functions.",
        code: "function add(a,b) { return a+b; }",
        resources: [
          {
            label: "MDN: Functions Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
          },
        ],
      },
      {
        title: "Expressions",
        desc: "const name = function() {}",
        explanation: "Not hoisted.",
        code: "const add = function(a,b) { return a+b; }",
      },
      {
        title: "Arrows",
        desc: "const name = () => {}",
        explanation: "Concise syntax.",
        code: "const add = (a,b) => a+b;",
        resources: [
          {
            label: "MDN: Arrow Functions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
          },
        ],
      },
      {
        title: "Implicit Return",
        desc: "One-line return.",
        explanation: "No curly braces needed.",
        code: "const double = n => n*2;",
      },
      {
        title: "Defaults",
        desc: "function(a = 10)",
        explanation: "Fallback values.",
        code: "function greet(name = 'Guest') {}",
      },
      {
        title: "Rest Params",
        desc: "function(...args)",
        explanation: "Collect arguments into an array.",
        code: "function sum(...nums) {}",
      },
      {
        title: "this (Standard)",
        desc: "Dynamic context.",
        explanation: "Depends on how function is called.",
        code: "obj.method() // this is obj",
      },
      {
        title: "this (Arrow)",
        desc: "Lexical context.",
        explanation: "Inherits this from parent.",
        code: "const method = () => console.log(this);",
      },
      {
        title: "Bind/Call/Apply",
        desc: "Manual this.",
        explanation: "Controlling context.",
        code: "fn.call(ctx, arg1);",
      },
    ],
  },
  {
    title: "Stage 5: DOM Manipulation",
    description: "Interacting with the browser structure.",
    items: [
      {
        title: "DOM Tree",
        desc: "Understanding structure.",
        explanation: "Hierarchy of nodes.",
        code: "document.body.children",
        resources: [
          {
            label: "MDN: Document Object Model",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
          },
        ],
      },
      {
        title: "Selection (New)",
        desc: "querySelector.",
        explanation: "CSS selectors in JS.",
        code: "document.querySelector('.btn')",
      },
      {
        title: "Text",
        desc: "textContent vs innerHTML.",
        explanation: "Safe text vs HTML parsing.",
        code: "el.textContent = 'Hello';",
      },
      {
        title: "Style",
        desc: "element.style.",
        explanation: "Inline styles.",
        code: "el.style.color = 'red';",
      },
      {
        title: "Classes",
        desc: "classList methods.",
        explanation: "Adding/removing classes.",
        code: "el.classList.add('active');",
      },
      {
        title: "Creation",
        desc: "createElement.",
        explanation: "Making new nodes.",
        code: "const div = document.createElement('div');",
      },
      {
        title: "Insertion",
        desc: "appendChild.",
        explanation: "Adding nodes to DOM.",
        code: "parent.appendChild(child);",
      },
      {
        title: "Removal",
        desc: "element.remove().",
        explanation: "Deleting nodes.",
        code: "el.remove();",
      },
      {
        title: "Events",
        desc: "See Stage 6.",
        explanation: "Interaction.",
        code: "",
      },
      {
        title: "Attributes",
        desc: "dataset.",
        explanation: "Custom data attributes.",
        code: "el.dataset.id",
      },
    ],
  },
  {
    title: "Stage 6: Events & Interaction",
    description: "Handling user input.",
    items: [
      {
        title: "Listeners",
        desc: "addEventListener.",
        explanation: "Attaching behavior.",
        code: "btn.addEventListener('click', fn);",
        resources: [
          {
            label: "MDN: addEventListener",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          },
        ],
      },
      {
        title: "Mouse",
        desc: "click, mouseenter.",
        explanation: "Mouse events.",
        code: "",
      },
      {
        title: "Keyboard",
        desc: "keydown, keyup.",
        explanation: "Typing events.",
        code: "e.key === 'Enter'",
      },
      {
        title: "Forms",
        desc: "submit, input.",
        explanation: "Handling forms.",
        code: "form.addEventListener('submit', fn);",
      },
      {
        title: "Prevention",
        desc: "e.preventDefault().",
        explanation: "Stopping default browser behavior.",
        code: "e.preventDefault(); // No reload",
      },
      {
        title: "Event Object",
        desc: "Understanding e.",
        explanation: "Details about the event.",
        code: "(e) => console.log(e)",
      },
      {
        title: "Delegation",
        desc: "Parent listening.",
        explanation: "Efficient event handling.",
        code: "list.addEventListener('click', e => ...)",
      },
    ],
  },
  {
    title: "Stage 7: Async Javascript",
    description: "Promises, Fetch, and waiting.",
    items: [
      {
        title: "Sync vs Async",
        desc: "Blocking vs Non-blocking.",
        explanation: "JS is single threaded.",
        code: "",
      },
      {
        title: "Timers",
        desc: "setTimeout.",
        explanation: "Scheduling tasks.",
        code: "setTimeout(() => {}, 1000);",
      },
      {
        title: "Promises",
        desc: "The Promise object.",
        explanation: "Future values.",
        code: "new Promise((res, rej) => ...)",
        resources: [
          {
            label: "MDN: Using Promises",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
          },
          {
            label: "Video: Promises in 100 Seconds",
            url: "https://www.youtube.com/watch?v=RvYYCGs45L4",
          },
        ],
      },
      {
        title: "States",
        desc: "Pending, Resolved, Rejected.",
        explanation: "Lifecycle of a promise.",
        code: "",
      },
      {
        title: "Async/Await",
        desc: "Modern syntax.",
        explanation: "Writing async code synchronously.",
        code: "await fetch(url);",
      },
      {
        title: "Fetch API",
        desc: "fetch('url').",
        explanation: "Network requests.",
        code: "fetch('/api/data')",
        resources: [
          {
            label: "MDN: Fetch API",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          },
        ],
      },
      {
        title: "JSON",
        desc: ".json().",
        explanation: "Parsing response.",
        code: "await res.json()",
      },
      {
        title: "Errors",
        desc: "try/catch.",
        explanation: "Handling failures.",
        code: "try { ... } catch(e) { ... }",
      },
    ],
  },
  {
    title: "Stage 8: Under the Hood",
    description: "How JavaScript actually works.",
    items: [
      {
        title: "Call Stack",
        desc: "LIFO execution.",
        explanation: "Where code runs.",
        code: "",
      },
      {
        title: "Hoisting",
        desc: "Var/Function lifting.",
        explanation: "Declarations move to top.",
        code: "",
      },
      {
        title: "Closures",
        desc: "Remembering scope.",
        explanation: "Functions returning functions.",
        code: "",
      },
      {
        title: "Event Loop",
        desc: "The engine.",
        explanation: "How async works.",
        code: "",
      },
      {
        title: "References",
        desc: "Objects are refs.",
        explanation: "Pointers not values.",
        code: "const a = {}; const b = a;",
      },
    ],
  },
  {
    title: "Stage 9: OOP",
    description: "Classes and Prototypes.",
    items: [
      {
        title: "Classes",
        desc: "class User {}.",
        explanation: "Blueprints.",
        code: "class User {}",
      },
      {
        title: "Constructor",
        desc: "Setup.",
        explanation: "Runs on new.",
        code: "constructor() {}",
      },
      {
        title: "Inheritance",
        desc: "extends.",
        explanation: "Subclasses.",
        code: "class Admin extends User {}",
      },
      {
        title: "Static",
        desc: "static methods.",
        explanation: "Utility functions.",
        code: "static info() {}",
      },
    ],
  },
  {
    title: "Stage 10: Tools",
    description: "Modules, Storage, and Regex.",
    items: [
      {
        title: "Modules",
        desc: "import/export.",
        explanation: "Split code.",
        code: "export const x = 1;",
      },
      {
        title: "LocalStorage",
        desc: "Persistent.",
        explanation: "Save strings.",
        code: "localStorage.setItem('key', 'val')",
      },
      {
        title: "JSON",
        desc: "parse/stringify.",
        explanation: "Object serialization.",
        code: "JSON.stringify(obj)",
      },
      {
        title: "Dates",
        desc: "new Date().",
        explanation: "Time.",
        code: "Date.now()",
      },
      {
        title: "Math",
        desc: "Random/Floor.",
        explanation: "Numbers.",
        code: "Math.random()",
      },
    ],
  },
  // ... Additional stages follow the same pattern
];
