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
          "Node.js allows you to run JavaScript outside the browser (on your computer). VS Code is the industry-standard editor.",
        code: "node -v\n# v20.x.x (Should output version)",
        prompt: "Open your terminal and check your node version.",
        resources: [
          { label: "Download Node.js", url: "https://nodejs.org/" },
          {
            label: "VS Code Setup Guide",
            url: "https://code.visualstudio.com/docs/setup/setup-overview",
          },
        ],
      },
      {
        title: "Tooling",
        desc: "Install ESLint & Prettier extensions.",
        explanation:
          "Prettier formats your code automatically (making it readable). ESLint catches bugs before you run the code.",
        code: '// .prettierrc\n{\n  "semi": true,\n  "singleQuote": true\n}',
        prompt:
          "Install the 'Prettier' extension in VS Code and try 'Format Document'.",
        resources: [
          {
            label: "Prettier - VS Code",
            url: "https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode",
          },
          {
            label: "ESLint - VS Code",
            url: "https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint",
          },
        ],
      },
      {
        title: "Hello World",
        desc: "Connect app.js to index.html.",
        explanation:
          "The script tag connects your logic file (JS) to your view file (HTML). 'defer' ensures HTML loads before JS runs.",
        code: '<!DOCTYPE html>\n<body>\n  <script src="app.js" defer></script>\n</body>',
        prompt: "Remove 'defer' and place the script in <head>. What happens?",
        resources: [
          {
            label: "MDN: Script Element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
          },
        ],
      },
      {
        title: "Console",
        desc: "Master console.log, .error, .table.",
        explanation:
          "Your primary debugging tool. logical objects are easier to read with .table() and .dir().",
        code: "console.log('Text');\nconsole.table([{id:1}, {id:2}]);\nconsole.error('Boom!');",
        prompt: "Try console.dir(document.body) in the browser console.",
        resources: [
          {
            label: "MDN: Console API",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Console",
          },
        ],
      },
      {
        title: "Variables",
        desc: "Understand var vs let vs const.",
        explanation:
          "Const: Default. Value cannot be reassigned. Let: Use when value changes. Var: Legacy (avoid).",
        code: "const pi = 3.14;\nlet score = 0;\nscore = 10; // OK\npi = 3; // Error!",
        prompt:
          "What happens if you declare a const without a value? (const x;)",
        resources: [
          {
            label: "MDN: let vs const",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
          },
        ],
      },
      {
        title: "Scope Intro",
        desc: "Block Scope {} vs Global Scope.",
        explanation:
          "Variables defined with let/const inside {} (like if, for) only exist inside those braces.",
        code: "{ \n  let secret = '123'; \n}\nconsole.log(secret); // Error: secret is not defined",
        prompt: "Can 'var' escape a block? Try it. (Hint: Yes)",
        resources: [
          {
            label: "MDN: Block Scope",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope",
          },
        ],
      },
      {
        title: "Primitives",
        desc: "String, Number, Boolean.",
        explanation:
          "The basic building blocks. They are immutable (cannot be changed, only replaced).",
        code: "typeof 'hello' // string\ntypeof 42 // number\ntypeof true // boolean",
        prompt: "What is typeof NaN?",
        resources: [
          {
            label: "MDN: Data Structures",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
          },
        ],
      },
      {
        title: "Empty Values",
        desc: "null vs undefined vs NaN.",
        explanation:
          "Undefined: Variable declared but not assigned. Null: Intentionally empty. NaN: Invalid math.",
        code: "let x; // undefined\nlet y = null; // explicit nothing\nlet z = 10 / 'apple'; // NaN",
        prompt: "Check: null == undefined vs null === undefined.",
        resources: [
          {
            label: "MDN: null",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null",
          },
        ],
      },
      {
        title: "Template Literals",
        desc: "Use backticks `Hello ${name}`.",
        explanation:
          "The modern way to build strings. Supports multi-line and variable interpolation.",
        code: "const name = 'Ahmed';\nconst msg = `Hello \n${name}!`;",
        prompt: "Try to create a multi-line string using single quotes ' '.",
        resources: [
          {
            label: "MDN: Template Literals",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          },
        ],
      },
      {
        title: "Arithmetic",
        desc: "+, -, *, /, % (Modulus).",
        explanation:
          "Standard math. % (Modulus) gives the remainder of division, useful for checking parity.",
        code: "10 % 3 // 1 (10 / 3 = 3 remainder 1)\n2 ** 3 // 8 (Exponentiation)",
        prompt: "How do you check if a number is even using %?",
        resources: [
          {
            label: "MDN: Arithmetic Operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators",
          },
        ],
      },
      {
        title: "Equality",
        desc: "Always use === over ==.",
        explanation:
          "=== checks value AND type (Strict). == ignores type (Loose) converts values blindly.",
        code: "5 == '5' // true (Bad)\n5 === '5' // false (Good)",
        prompt: "Check [] == []. Why is it false?",
        resources: [
          {
            label: "MDN: Strict Equality",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality",
          },
        ],
      },
      {
        title: "Logic Operators",
        desc: "&& (AND), || (OR), ! (NOT).",
        explanation:
          "Combine conditions. && returns first falsy. || returns first truthy.",
        code: "const canDrive = hasLicense && age >= 18;\nconst name = input || 'Guest';",
        prompt: "What is the result of 'false || 10'?",
        resources: [
          {
            label: "MDN: Logical Operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_b_OR",
          },
        ],
      },
      {
        title: "Nullish Coalescing",
        desc: "The ?? operator.",
        explanation:
          "Like || but only falls back if value is null or undefined (not 0 or false).",
        code: "let count = 0;\nlet val = count || 10; // 10 (Bad if 0 is valid)\nlet val2 = count ?? 10; // 0 (Good)",
        prompt: "Why is ?? better for setting default numbers?",
        resources: [
          {
            label: "MDN: Nullish Coalescing",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator",
          },
        ],
      },
      {
        title: "Conditionals",
        desc: "if, else if, else.",
        explanation: "Control flow based on truthy/falsy values.",
        code: "if (score > 50) {\n  console.log('Pass');\n} else {\n  console.log('Fail');\n}",
        prompt:
          "Can you write an if statement without curly braces? (Yes, but risky).",
        resources: [
          {
            label: "MDN: if...else",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
          },
        ],
      },
      {
        title: "Switch",
        desc: "Pattern matching.",
        explanation: "Cleaner than many if/else blocks for specific values.",
        code: "switch(role) {\n  case 'admin': log('Admin'); break;\n  case 'user': log('User'); break;\n  default: log('Guest');\n}",
        prompt: "What happens if you remove a 'break' statement?",
        resources: [
          {
            label: "MDN: Switch",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch",
          },
        ],
      },
      {
        title: "Ternary Operator",
        desc: "condition ? true : false.",
        explanation:
          "A shortcut for if/else that returns a value. Great for assignments.",
        code: "const status = age >= 18 ? 'Adult' : 'Minor';",
        prompt: "Try nesting ternaries. Does it remain readable? (Hint: No).",
        resources: [
          {
            label: "MDN: Conditional Operator",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator",
          },
        ],
      },
      {
        title: "Loops",
        desc: "for, while.",
        explanation:
          "Repeat code multiple times. 'for' checks definition, condition, update.",
        code: "for (let i=0; i<5; i++) { \n  console.log(i); \n}",
        prompt: "How do you break out of a loop early? (break)",
        resources: [
          {
            label: "MDN: Loops",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
          },
        ],
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
        explanation:
          "The core of JS data storage. Keys are strings, values can be anything.",
        code: "const car = { \n  make: 'Toyota', \n  year: 2020 \n};",
        prompt:
          "Create an object representing yourself with name, age, and isLearning.",
        resources: [
          {
            label: "Javascript.info: Objects",
            url: "https://javascript.info/object",
          },
        ],
      },
      {
        title: "Access Properties",
        desc: "Dot vs Bracket notation.",
        explanation:
          "Use dot (obj.key) usually. Use brackets (obj['key']) when key is a variable or has spaces.",
        code: "console.log(car.make);\nconst prop = 'year';\nconsole.log(car[prop]);",
        prompt: "Try to access a property that doesn't exist. What do you get?",
        resources: [
          {
            label: "MDN: Property Accessors",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors",
          },
        ],
      },
      {
        title: "Mutation",
        desc: "Add/Edit/Delete keys.",
        explanation:
          "Objects are mutable (changeable) even if declared with const.",
        code: "const user = { name: 'Ali' };\nuser.name = 'Ahmed'; // OK\nuser.age = 25; // Add new\ndelete user.name; // Remove",
        prompt:
          "How do you prevent an object from being mutated? (Object.freeze).",
        resources: [
          {
            label: "MDN: Object.freeze",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze",
          },
        ],
      },
      {
        title: "Object Methods",
        desc: "Functions attached to objects.",
        explanation:
          "Data and behavior together. 'this' refers to the object itself.",
        code: "const dog = {\n  bark: function() { console.log('Woof'); }\n};\ndog.bark();",
        prompt: "Create a method that prints 'Hello, I am [name]'.",
        resources: [
          {
            label: "MDN: Method Definitions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions",
          },
        ],
      },
      {
        title: "Destructuring Objects",
        desc: "const { name } = user.",
        explanation: "Unpack properties into distinct variables properly.",
        code: "const user = { id: 1, name: 'Alice' };\nconst { name, id } = user;\nconsole.log(name);",
        prompt: "Destructure and rename a property: { name: userName }.",
        resources: [
          {
            label: "MDN: Destructuring",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
          },
        ],
      },
      {
        title: "Spread Objects",
        desc: "Clone and merge: { ...obj }.",
        explanation:
          "Create a copy of an object, optionally defining new properties.",
        code: "const base = { a: 1 };\nconst copy = { ...base, b: 2 };",
        prompt: "Does spread perform a deep copy or shallow copy?",
        resources: [
          {
            label: "MDN: Spread Syntax",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          },
        ],
      },
      {
        title: "Optional Chaining",
        desc: "user?.address?.street.",
        explanation:
          "Stop errors when accessing nested properties that might not exist.",
        code: "const user = {};\n// No Error, returns undefined\nconst city = user?.address?.city;",
        prompt:
          "Try accessing a nested property on undefined without ?. (Crash!)",
        resources: [
          {
            label: "MDN: Optional Chaining",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
          },
        ],
      },
      {
        title: "Arrays",
        desc: "Ordered lists [1, 2, 3].",
        explanation: "Store multiple values in a single variable.",
        code: "const colors = ['red', 'green', 'blue'];\nconsole.log(colors[0]); // red",
        prompt: "Can an array hold mixed types? (e.g. string and number)",
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
        explanation: "Unpack items by position/index.",
        code: "const coords = [10, 20];\nconst [x, y] = coords;",
        prompt: "How do you skip the first item? const [, second] = list.",
        resources: [
          {
            label: "MDN: Array Destructuring",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring",
          },
        ],
      },
      {
        title: "Spread Arrays",
        desc: "Combine lists [...a, ...b].",
        explanation: "Combine arrays or create shallow copies.",
        code: "const a = [1, 2];\nconst b = [3, 4];\nconst combined = [...a, ...b];",
        prompt: "Use spread to convert a string into an array of characters.",
        resources: [
          {
            label: "MDN: Spread (Arrays)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals",
          },
        ],
      },
      {
        title: "Stack Operations",
        desc: "push, pop, shift, unshift.",
        explanation:
          "Manage list content. Push/Pop (End) is fast. Shift/Unshift (Start) is slow (re-indexing).",
        code: "const arr = [1];\narr.push(2); // [1, 2]\narr.pop(); // [1]",
        prompt: "Which is faster: push or unshift? Why?",
        resources: [
          {
            label: "Video: Stack vs Queue",
            url: "https://www.youtube.com/watch?v=wjI1WNcIntg",
          },
        ],
      },
      {
        title: "Slice vs Splice",
        desc: "Copy (slice) vs Mutate (splice).",
        explanation:
          "Slice returns a safe copy. Splice changes the original array (removing/adding items).",
        code: "const arr = ['a', 'b', 'c'];\nconst copy = arr.slice(0, 2);\narr.splice(1, 1); // remove 'b'",
        prompt: "Use splice to remove the 2nd item from an array.",
        resources: [
          {
            label: "MDN: Slice",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          },
          {
            label: "MDN: Splice",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 3: Functional Programming",
    description: "Mastering Array Methods (The 'Clean Code' Way).",
    items: [
      {
        title: "forEach",
        desc: "Loop execution.",
        explanation:
          "Execute a function for every item. Cannot return values. Use for side effects (logging, saving).",
        code: "const names = ['Ali', 'Sam'];\nnames.forEach(n => console.log(n));",
        prompt: "Can you 'break' (stop) a forEach loop? (No).",
        resources: [
          {
            label: "MDN: forEach",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          },
        ],
      },
      {
        title: "map",
        desc: "Transform items.",
        explanation:
          "Create a NEW array by transforming every item. One-to-one mapping.",
        code: "const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);",
        prompt: "Map an array of names to HTML <li> tags.",
        resources: [
          {
            label: "MDN: map",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          },
        ],
      },
      {
        title: "filter",
        desc: "Select subset.",
        explanation:
          "Create a NEW array with only items that pass the test (return true).",
        code: "const score = [10, 50, 90];\nconst passing = score.filter(s => s > 40);",
        prompt: "Filter a list of objects to find active users.",
        resources: [
          {
            label: "MDN: filter",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          },
        ],
      },
      {
        title: "reduce",
        desc: "Aggregate to one value.",
        explanation:
          "The most powerful method. Accumulate values into a single result (sum, object, string).",
        code: "const nums = [1, 2, 3];\nconst sum = nums.reduce((acc, n) => acc + n, 0);",
        prompt: "Use reduce to count occurrences of items in an array.",
        resources: [
          {
            label: "MDN: reduce",
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
        desc: "Get single item.",
        explanation:
          "Returns the first item that matches. Stops looking after finding one.",
        code: "const users = [{id:1}, {id:2}];\nconst u = users.find(u => u.id === 2);",
        prompt: "What does find return if nothing matches? (undefined)",
        resources: [
          {
            label: "MDN: find",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
          },
        ],
      },
      {
        title: "some / every",
        desc: "Boolean check.",
        explanation: "Some: True if ANY match. Every: True if ALL match.",
        code: "const ages = [10, 20, 30];\nconst allAdults = ages.every(a => a >= 18); // false",
        prompt: "Check if an array contains any negative numbers.",
        resources: [
          {
            label: "MDN: some",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
          },
        ],
      },
      {
        title: "sort",
        desc: "Sort correctly.",
        explanation:
          "Default sort converts to string! Always verify with a compare function.",
        code: "const nums = [10, 2, 5];\n// Bad: nums.sort() -> [10, 2, 5]\n// Good:\nnums.sort((a, b) => a - b);",
        prompt: "Sort an array of objects by a 'date' property.",
        resources: [
          {
            label: "MDN: sort",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          },
        ],
      },
      {
        title: "includes",
        desc: "Check existence.",
        explanation: "Simple boolean check for primitive values.",
        code: "const pets = ['cat', 'dog'];\npets.includes('cat'); // true",
        prompt:
          "Does includes work for objects? [{a:1}].includes({a:1})? (No, different refs).",
        resources: [
          {
            label: "MDN: includes",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
          },
        ],
      },
      {
        title: "Method Chaining",
        desc: "Fluent pipelines.",
        explanation:
          "Combine methods for readable data transformation pipelines.",
        code: "users\n  .filter(u => u.active)\n  .map(u => u.name)\n  .sort();",
        prompt: "Filter even numbers, square them, then sum them.",
        resources: [
          {
            label: "Video: HOF Chaining",
            url: "https://www.youtube.com/watch?v=rRgD1yVwIvE",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 4: Functions & Logic",
    description: "Defining behavior and reusable code blocks.",
    items: [
      {
        title: "Function Declaration",
        desc: "function name() {}",
        explanation:
          "Hoisted (can specify before definition). Standard way to define logic.",
        code: "sayHi(); // Works!\n\nfunction sayHi() {\n  console.log('Hi');\n}",
        prompt: "Write a function that calculates Body Mass Index (BMI).",
        resources: [
          {
            label: "MDN: Functions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
          },
        ],
      },
      {
        title: "Function Expression",
        desc: "const fn = function() {}",
        explanation: "Not hoisted. Assigning a function to a variable.",
        code: "const sayHi = function() {\n  console.log('Hi');\n};",
        prompt:
          "Why might you use an expression over a declaration? (Callbacks, IIFEs).",
        resources: [
          {
            label: "MDN: Function Expressions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function",
          },
        ],
      },
      {
        title: "Arrow Functions",
        desc: "const fn = () => {}",
        explanation: "Modern, concise syntax. Does not bind its own 'this'.",
        code: "const add = (a, b) => a + b;",
        prompt: "Convert a standard function to an arrow function.",
        resources: [
          {
            label: "MDN: Arrow Functions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
          },
        ],
      },
      {
        title: "Implicit Return",
        desc: "One-liners.",
        explanation:
          "Arrow functions with no {} automatically return the result.",
        code: "const square = n => n * n;\n// Same as:\n// const square = n => { return n * n; }",
        prompt: "How do you implicitly return an object? ({ a: 1 })",
        resources: [
          {
            label: "Guide: Arrow Shortcuts",
            url: "https://javascript.info/arrow-functions-basics",
          },
        ],
      },
      {
        title: "Default Parameters",
        desc: "fn(a = 1)",
        explanation:
          "Provide fallback values if argument is missing/undefined.",
        code: "function greet(name = 'Guest') {\n  console.log(`Hello ${name}`);\n}",
        prompt:
          "What happens if you pass 'null' to a default parameter? (It uses null, not default).",
        resources: [
          {
            label: "MDN: Default Parameters",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters",
          },
        ],
      },
      {
        title: "Rest Parameters",
        desc: "function(...args)",
        explanation: "Collect infinite number of arguments into an array.",
        code: "function sum(...nums) {\n  return nums.reduce((a, b) => a + b);\n}",
        prompt:
          "Create a function 'logAll' that prints all arguments passed to it.",
        resources: [
          {
            label: "MDN: Rest Parameters",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters",
          },
        ],
      },
      {
        title: "Context (this)",
        desc: "Dynamic references.",
        explanation:
          "In standard functions, 'this' depends on HOW the function is called (obj.method vs plain call).",
        code: "const user = {\n  name: 'Ali',\n  say: function() { console.log(this.name); }\n};",
        prompt:
          "What happens if you assign obj.method to a variable and call it?",
        resources: [
          {
            label: "MDN: this",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 5: DOM Manipulation",
    description: "Interacting with the webpage (The View).",
    items: [
      {
        title: "DOM Structure",
        desc: "Tree of Nodes.",
        explanation:
          "The HTML is parsed into a tree of objects that JS can reading/modify.",
        code: "console.dir(document.body);",
        prompt: "Visualize the tree structure of a <ul> with 3 <li> items.",
        resources: [
          {
            label: "MDN: DOM Introduction",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
          },
        ],
      },
      {
        title: "Selection",
        desc: "querySelector.",
        explanation:
          "Find elements using CSS selectors. Returns the first match.",
        code: "const btn = document.querySelector('.submit-btn');\nconst list = document.querySelectorAll('li');",
        prompt: "Select an input field with type='text'.",
        resources: [
          {
            label: "MDN: querySelector",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
          },
        ],
      },
      {
        title: "Text Content",
        desc: "innerText vs textContent.",
        explanation:
          "Change the text inside an element. textContent is faster, innerText respects visual styling.",
        code: "h1.textContent = 'Welcome Back!';",
        prompt: "Try innerHTML = '<b>Hi</b>'. Be careful of security (XSS).",
        resources: [
          {
            label: "MDN: textContent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
          },
        ],
      },
      {
        title: "Styles",
        desc: "element.style.",
        explanation: "Modify inline CSS styles directly.",
        code: "box.style.backgroundColor = 'red';\nbox.style.display = 'none';",
        prompt: "Hide an element using JS.",
        resources: [
          {
            label: "MDN: HTMLElement.style",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style",
          },
        ],
      },
      {
        title: "Classes",
        desc: "classList UI.",
        explanation:
          "The cleanest way to change styles: add/remove/toggle CSS classes.",
        code: "el.classList.add('active');\nel.classList.toggle('hidden');",
        prompt: "Create a dark mode toggle by adding a class to the body.",
        resources: [
          {
            label: "MDN: classList",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
          },
        ],
      },
      {
        title: "Creation",
        desc: "createElement.",
        explanation: "Create new HTML elements from scratch in memory.",
        code: "const div = document.createElement('div');\ndiv.className = 'card';",
        prompt: "Create a new image tag and set its src.",
        resources: [
          {
            label: "MDN: createElement",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
          },
        ],
      },
      {
        title: "Insertion",
        desc: "appendChild / append.",
        explanation:
          "Attach the Created element to the DOM so it becomes visible.",
        code: "document.body.appendChild(div);",
        prompt: "What is the difference between append() and appendChild()?",
        resources: [
          {
            label: "MDN: append",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/append",
          },
        ],
      },
      {
        title: "Removal",
        desc: "remove().",
        explanation: "Delete an element from the page.",
        code: "const ad = document.querySelector('.ad');\nad.remove();",
        prompt: "Remove all items from a list.",
        resources: [
          {
            label: "MDN: remove",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/remove",
          },
        ],
      },
      {
        title: "Attributes",
        desc: "getAttribute / setAttribute.",
        explanation:
          "Read or modify HTML attributes (href, src, id, custom data).",
        code: "img.setAttribute('src', 'pic.jpg');",
        prompt: "Get the value of a data-id attribute.",
        resources: [
          {
            label: "MDN: Attributes",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 6: Events & Interaction",
    description: "Responding to user behavior.",
    items: [
      {
        title: "Event Listeners",
        desc: "addEventListener.",
        explanation:
          "The correct way to handle clicks, inputs, keypresses. Do not use onclick HTML attributes.",
        code: "btn.addEventListener('click', () => {\n  console.log('Clicked!');\n});",
        prompt: "Add a listener that only runs once ({once: true}).",
        resources: [
          {
            label: "MDN: addEventListener",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          },
        ],
      },
      {
        title: "Mouse Events",
        desc: "click, mouseenter.",
        explanation: "Handle basic pointer interactions.",
        code: "box.addEventListener('mouseenter', showTooltip);",
        prompt: "Log coordinates when the mouse moves.",
        resources: [
          {
            label: "MDN: MouseEvent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
          },
        ],
      },
      {
        title: "Keyboard Events",
        desc: "keydown, keyup.",
        explanation: "Listen for typing. Keydown fires repeatedly if held.",
        code: "input.addEventListener('keydown', e => {\n  if (e.key === 'Enter') submit();\n});",
        prompt: "Detect if the 'Escape' key is pressed.",
        resources: [
          {
            label: "MDN: KeyboardEvent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
          },
        ],
      },
      {
        title: "Form Events",
        desc: "submit, input, change.",
        explanation: "Handle form submission and live typing.",
        code: "form.addEventListener('submit', e => {\n  e.preventDefault(); // Stop reload\n  save();\n});",
        prompt: "Listen for changes on a checkbox input.",
        resources: [
          {
            label: "MDN: Form submission",
            url: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript",
          },
        ],
      },
      {
        title: "Event Object (e)",
        desc: "Details of the event.",
        explanation:
          "Passed to your callback. Contains target (element), key (typed), coordinates, etc.",
        code: "btn.addEventListener('click', (e) => {\n  console.log(e.target); // The button\n});",
        prompt: "Log the e.target.value inside an input listener.",
        resources: [
          {
            label: "MDN: Event Object",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Event",
          },
        ],
      },
      {
        title: "Bubbling & Capturing",
        desc: "Event propagation.",
        explanation: "Events bubble UP from specific element to parents.",
        code: "div.addEventListener('click', fn); // Fires even if child button clicked",
        prompt: "How do you stop bubbling? e.stopPropagation()",
        resources: [
          {
            label: "Javascript.info: Bubbling",
            url: "https://javascript.info/bubbling-and-capturing",
          },
        ],
      },
      {
        title: "Event Delegation",
        desc: "Optimization pattern.",
        explanation:
          "Attach ONE listener to a parent instead of 100 listeners on children.",
        code: "list.addEventListener('click', e => {\n  if (e.target.matches('li')) deleteItem();\n});",
        prompt: "Implement delegation for a dynamic Todo list.",
        resources: [
          {
            label: "Javascript.info: Delegation",
            url: "https://javascript.info/event-delegation",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 7: Async Javascript",
    description: "Promises, Fetch APIs, and handling time.",
    items: [
      {
        title: "Sync vs Async",
        desc: "Understanding the thread.",
        explanation:
          "JS is single-threaded. Long tasks (network) must happen asynchronously to avoid freezing the UI.",
        code: "console.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);\n// Output: 1, 3, 2",
        prompt: "Why does the timeout log last even with 0ms?",
        resources: [
          {
            label: "Video: Event Loop",
            url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
          },
        ],
      },
      {
        title: "Timers",
        desc: "setTimeout / setInterval.",
        explanation: "Schedule code for later.",
        code: "const id = setInterval(() => tick(), 1000);\nclearInterval(id);",
        prompt: "Create a countdown timer.",
        resources: [
          {
            label: "MDN: setTimeout",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout",
          },
        ],
      },
      {
        title: "Promises",
        desc: "The container for future value.",
        explanation:
          "An object representing a value that may be available now, later, or never.",
        code: "const p = new Promise((resolve, reject) => {\n  if (ok) resolve('Success');\n  else reject('Fail');\n});",
        prompt: "Chain .then() to handle a resolved promise.",
        resources: [
          {
            label: "MDN: Promises",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
          },
        ],
      },
      {
        title: "Async / Await",
        desc: "Syntactic Sugar.",
        explanation:
          "Makes async code look synchronous. Easier to read than .then() chains.",
        code: "async function getData() {\n  const res = await fetch(url);\n  const data = await res.json();\n}",
        prompt: "Rewrite a .then() chain using async/await.",
        resources: [
          {
            label: "MDN: Async functions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          },
        ],
      },
      {
        title: "Fetch API",
        desc: "Network requests.",
        explanation:
          "Built-in way to get data from servers (APIs). Returns a Promise.",
        code: "fetch('https://api.example.com/data')\n  .then(res => res.json())\n  .then(data => console.log(data));",
        prompt: "Fetch data from JSONPlaceholder API.",
        resources: [
          {
            label: "MDN: Using Fetch",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          },
        ],
      },
      {
        title: "Error Handling",
        desc: "try / catch.",
        explanation: "Gracefully handle failures in async functions.",
        code: "try {\n  await riskyOperation();\n} catch (error) {\n  console.error('Failed', error);\n}",
        prompt: "Handle a network error (offline) in a fetch request.",
        resources: [
          {
            label: "MDN: try...catch",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          },
        ],
      },
      {
        title: "JSON",
        desc: "Serialization.",
        explanation:
          "Convert Objects to Strings (stringify) and Strings to Objects (parse). The language of APIs.",
        code: "const str = JSON.stringify({id: 1});\nconst obj = JSON.parse(str);",
        prompt: "Deep clone an object using JSON methods.",
        resources: [
          {
            label: "MDN: JSON",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 8: Under the Hood",
    description: "Deep dive into execution context and memory.",
    items: [
      {
        title: "Call Stack",
        desc: "LIFO Execution.",
        explanation:
          "JavaScript records where in the program we are. One function calls another, stacking up.",
        code: "function a() { b(); }\nfunction b() { console.trace(); }\na();",
        prompt: "Cause a stack overflow recursion error.",
        resources: [
          {
            label: "MDN: Call Stack",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Call_stack",
          },
        ],
      },
      {
        title: "Hoisting",
        desc: "Variable lifting.",
        explanation:
          "Variables (var) and function declarations are moved to the top of their scope during compilation.",
        code: "console.log(x); // undefined (hoisted)\nvar x = 5;",
        prompt: "What happens with let/const? (Temporal Dead Zone).",
        resources: [
          {
            label: "MDN: Hoisting",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
          },
        ],
      },
      {
        title: "Closures",
        desc: "Backpack of data.",
        explanation:
          "A function remembers its outer variables even after the outer function has finished.",
        code: "function makeCounter() {\n  let count = 0;\n  return () => count++;\n}",
        prompt: "Create a private variable using closure.",
        resources: [
          {
            label: "MDN: Closures",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
          },
        ],
      },
      {
        title: "Event Loop",
        desc: "Async engine.",
        explanation:
          "How JS Handles callbacks, microtasks (Promises), and macrotasks (setTimeout).",
        code: "Promise.resolve().then(() => log(1));\nsetTimeout(() => log(2));\nlog(3);\n// 3, 1, 2",
        prompt: "Explain the difference between Microtask and Macrotask.",
        resources: [
          {
            label: "Video: Event Loop",
            url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
          },
        ],
      },
      {
        title: "Reference vs Value",
        desc: "Memory management.",
        explanation:
          "Primitives are copied by value. Objects are passed by reference (pointer).",
        code: "let a = {id:1}; \nlet b = a;\nb.id = 2;\n// a.id is now 2!",
        prompt: "How do you copy an object properly?",
        resources: [
          {
            label: "Explained: Value vs Reference",
            url: "https://javascript.info/object-copy",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 9: OOP",
    description: "Object Oriented Programming patterns.",
    items: [
      {
        title: "Classes",
        desc: "Blueprints.",
        explanation:
          "Syntactic sugar over prototypes. Templates for creating objects.",
        code: "class User {\n  constructor(name) { this.name = name; }\n  sayHi() { log(this.name); }\n}",
        prompt: "Create a class 'Car' with a 'drive' method.",
        resources: [
          {
            label: "MDN: Classes",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
          },
        ],
      },
      {
        title: "Inheritance",
        desc: "extends / super.",
        explanation: "Create specialized classes based on generic ones.",
        code: "class Admin extends User {\n  delete() { ... }\n}",
        prompt: "Override a parent method in a child class.",
        resources: [
          {
            label: "MDN: Inheritance",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends",
          },
        ],
      },
      {
        title: "Static Methods",
        desc: "methods on class.",
        explanation:
          "Functions that belong to the class, not the instance. Utility helpers.",
        code: "class MathUtils {\n  static add(a, b) { return a + b; }\n}\nMathUtils.add(1, 2);",
        prompt: "Create a static factory method.",
        resources: [
          {
            label: "MDN: static",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static",
          },
        ],
      },
      {
        title: "Getters / Setters",
        desc: "Smart properties.",
        explanation: "Run code when reading or writing a property.",
        code: "class User {\n  get fullName() { return `${this.first} ${this.last}`; }\n}",
        prompt: "Use a setter to validate input (e.g. age > 0).",
        resources: [
          {
            label: "MDN: Getters",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 10: Tools & Storage",
    description: "Browser APIs and Modules.",
    items: [
      {
        title: "Modules",
        desc: "import / export.",
        explanation: "Split code into files. Use type='module' in HTML.",
        code: "import { sum } from './math.js';\nexport const pi = 3.14;",
        prompt: "Export a function as default.",
        resources: [
          {
            label: "MDN: Modules",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
          },
        ],
      },
      {
        title: "LocalStorage",
        desc: "Persist data.",
        explanation:
          "Save data in browser. Persists after refresh. only stores strings.",
        code: "localStorage.setItem('theme', 'dark');\nconst t = localStorage.getItem('theme');",
        prompt: "Save a complex object to localStorage.",
        resources: [
          {
            label: "MDN: LocalStorage",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
          },
        ],
      },
      {
        title: "Dates",
        desc: "Date Object.",
        explanation: "Handling time is hard. Date object provides basics.",
        code: "const now = new Date();\nconsole.log(now.toISOString());",
        prompt: "Get the current year from a date object.",
        resources: [
          {
            label: "MDN: Date",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
          },
        ],
      },
      {
        title: "Math Lib",
        desc: "Math.random etc.",
        explanation: "Built-in simple math utilities.",
        code: "const random = Math.floor(Math.random() * 10) + 1;",
        prompt: "Calculate the square root of 144.",
        resources: [
          {
            label: "MDN: Math",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math",
          },
        ],
      },
      {
        title: "Regular Expressions",
        desc: "Pattern matching.",
        explanation: "Powerful search patterns for text.",
        code: "const emailRegex = /^[a-z]+@[a-z]+\\.[a-z]+$/;\nemailRegex.test('test@email.com');",
        prompt: "Write a regex to find all numbers in a string.",
        resources: [
          {
            label: "MDN: Regular Expressions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
          },
        ],
      },
    ],
  },
];
