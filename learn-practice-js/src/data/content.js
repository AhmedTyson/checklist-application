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
          "Node.js allows you to run JavaScript outside the browser (on your computer). VS Code is the industry-standard editor. Together, they form the professional JS development environment.",
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
          "Prettier formats your code automatically (making it readable). ESLint catches bugs before you run the code. In a professional team, these two tools are non-negotiable — they enforce code style and catch errors at write-time, not runtime.",
        code: '// .prettierrc\n{\n  "semi": true,\n  "singleQuote": true\n}',
        prompt:
          "Install the 'Prettier' extension in VS Code, create a .prettierrc file, and try 'Format Document' on a messy JS file.",
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
          "The script tag connects your logic file (JS) to your view file (HTML). 'defer' ensures HTML loads before JS runs. Without defer, your JS may try to access DOM elements that don't exist yet — a very common beginner bug.",
        code: '<!DOCTYPE html>\n<body>\n  <script src="app.js" defer></script>\n</body>',
        prompt:
          "Create an index.html and app.js, link them with defer, and log 'Hello World' to the console.",
        resources: [
          {
            label: "MDN: Script Element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
          },
          {
            label: "javascript.info: Scripts",
            url: "https://javascript.info/script-async-defer",
          },
        ],
      },
      {
        title: "Console",
        desc: "Master console.log, .error, .table.",
        explanation:
          "Your primary debugging tool. Use .log() for general output, .table() for arrays/objects in a grid format, .error() for error-level messages (shown in red), and .dir() for inspecting DOM elements as objects instead of HTML.",
        code: "console.log('Text');\nconsole.table([{id:1}, {id:2}]);\nconsole.error('Boom!');",
        prompt:
          "Try console.dir(document.body) in the browser console and compare it to console.log(document.body).",
        resources: [
          {
            label: "MDN: Console API",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Console",
          },
          {
            label: "javascript.info: Debugging",
            url: "https://javascript.info/debugging-chrome",
          },
        ],
      },
      {
        title: "Variables",
        desc: "Understand var vs let vs const.",
        explanation:
          "Const: Default choice. Value cannot be reassigned. Let: Use when value must change (counters, accumulators). Var: Legacy — avoid it because it ignores block scope and hoists unpredictably. Coming from C#, think of const like 'readonly' and let like a normal variable.",
        code: "const pi = 3.14;\nlet score = 0;\nscore = 10; // OK\npi = 3; // Error!",
        prompt:
          "Declare a const array and try pushing to it. Does it error? (No — const prevents reassignment, not mutation).",
        resources: [
          {
            label: "MDN: let",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
          },
          {
            label: "MDN: const",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const",
          },
        ],
      },
      {
        title: "Scope Intro",
        desc: "Block Scope {} vs Global Scope.",
        explanation:
          "Variables defined with let/const inside {} (like if, for) only exist inside those braces. This is called Block Scope. Variables declared outside any block are in Global Scope. Pitfall: 'var' ignores block scope entirely — it's function-scoped, which leads to subtle bugs in loops.",
        code: "{ \n  let secret = '123'; \n}\nconsole.log(secret); // Error: secret is not defined",
        prompt:
          "Write a for loop with 'var' and another with 'let'. Log the counter variable AFTER the loop — observe the difference.",
        resources: [
          {
            label: "MDN: Scope",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope",
          },
          {
            label: "javascript.info: Variables",
            url: "https://javascript.info/variables",
          },
        ],
      },
      {
        title: "Primitives",
        desc: "String, Number, Boolean, BigInt, Symbol.",
        explanation:
          "The 7 primitive types: String, Number, Boolean, null, undefined, BigInt, Symbol. They are immutable — you cannot change the value itself, only replace it. Unlike C# value types, JS primitives also auto-box (temporarily wrap) when you call methods on them (e.g., 'hello'.toUpperCase()).",
        code: "typeof 'hello' // string\ntypeof 42 // number\ntypeof true // boolean\ntypeof Symbol('id') // symbol",
        prompt:
          "Check typeof NaN, typeof null, and typeof undefined. At least one result will surprise you.",
        resources: [
          {
            label: "MDN: Data Structures",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
          },
          {
            label: "javascript.info: Data Types",
            url: "https://javascript.info/types",
          },
        ],
      },
      {
        title: "Empty Values",
        desc: "null vs undefined vs NaN.",
        explanation:
          "Undefined: Variable declared but not assigned — JS's default 'nothing'. Null: Intentionally empty — the developer explicitly says 'no value'. NaN: 'Not a Number' — result of invalid math. Pitfall: typeof null === 'object' is a historical JS bug that will never be fixed.",
        code: "let x; // undefined\nlet y = null; // explicit nothing\nlet z = 10 / 'apple'; // NaN",
        prompt:
          "Check: null == undefined vs null === undefined. Then check NaN === NaN. Document what you find.",
        resources: [
          {
            label: "MDN: null",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null",
          },
          {
            label: "MDN: undefined",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
          },
        ],
      },
      {
        title: "Template Literals",
        desc: "Use backticks `Hello ${name}`.",
        explanation:
          "The modern way to build strings. Supports multi-line text and variable interpolation with ${expression}. You can put any JS expression inside ${} — function calls, math, ternaries. This replaces ugly string concatenation with + signs.",
        code: "const name = 'Ahmed';\nconst msg = `Hello \n${name}!`;",
        prompt:
          "Build a multi-line HTML string using template literals that includes a variable for the page title.",
        resources: [
          {
            label: "MDN: Template Literals",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          },
          {
            label: "javascript.info: Strings",
            url: "https://javascript.info/string",
          },
        ],
      },
      {
        title: "Type Conversion",
        desc: "Explicit casting: Number(), String(), Boolean().",
        explanation:
          "JS is loosely typed — it converts types automatically (coercion), often with surprising results. Always use EXPLICIT conversion: Number('42'), String(100), Boolean(0). parseInt() and parseFloat() parse strings into numbers. Pitfall: Number('') is 0, but Number('abc') is NaN. Coming from C#, think of this as the equivalent of int.Parse() vs Convert.ToInt32().",
        code: "Number('42')    // 42\nString(100)     // '100'\nBoolean(0)      // false\nparseInt('50px') // 50\nparseFloat('3.14m') // 3.14",
        prompt:
          "Convert the string '100' to a number, add 50 to it, then convert the result back to a string. Verify each step with typeof.",
        resources: [
          {
            label: "MDN: Type Conversions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
          },
          {
            label: "javascript.info: Type Conversions",
            url: "https://javascript.info/type-conversions",
          },
        ],
      },
      {
        title: "String Methods",
        desc: "Essential text manipulation.",
        explanation:
          "Strings are immutable — every method returns a NEW string. Key methods: .toUpperCase(), .toLowerCase(), .trim() (removes whitespace), .split(separator) (string to array), .includes(search), .indexOf(search), .slice(start, end), .replace(old, new), .startsWith(), .endsWith(), .padStart(), .repeat(). These are your daily-use tools for processing user input, API data, and text formatting.",
        code: "const raw = '  Hello World  ';\nraw.trim()           // 'Hello World'\nraw.trim().split(' ') // ['Hello', 'World']\n'hello'.includes('ell') // true\n'hello'.slice(1, 4)     // 'ell'",
        prompt:
          "Take a user input string '  Ahmed Tyson  ', trim it, split it into first/last name, and capitalize each name.",
        resources: [
          {
            label: "MDN: String Methods",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
          },
          {
            label: "javascript.info: String Methods",
            url: "https://javascript.info/string#searching-for-a-substring",
          },
        ],
      },
      {
        title: "Arithmetic",
        desc: "+, -, *, /, % (Modulus), ** (Power).",
        explanation:
          "Standard math operators. % (Modulus) gives the remainder of division — the go-to for checking even/odd (n % 2 === 0). ** is exponentiation (same as Math.pow). Pitfall: 0.1 + 0.2 !== 0.3 due to floating-point precision — this is not a JS bug, it's how all languages store decimals in binary.",
        code: "10 % 3 // 1 (remainder)\n2 ** 3 // 8 (power)\n0.1 + 0.2 // 0.30000000000000004",
        prompt:
          "Write a function that checks if a number is even using %, then test it with 0.1 + 0.2 to see floating-point issues.",
        resources: [
          {
            label: "MDN: Arithmetic Operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#arithmetic_operators",
          },
          {
            label: "javascript.info: Operators",
            url: "https://javascript.info/operators",
          },
        ],
      },
      {
        title: "Equality",
        desc: "Always use === over ==.",
        explanation:
          "=== checks value AND type (Strict). == ignores type (Loose) and coerces values blindly, leading to bizarre results. Rule: ALWAYS use === and !== in professional code. The only exception is checking null/undefined with == (null == undefined is true, which can be useful).",
        code: "5 == '5'  // true (Bad — coercion)\n5 === '5' // false (Good — strict)\nnull == undefined // true\nnull === undefined // false",
        prompt:
          "Test these: [] == false, '' == false, 0 == ''. Explain why they are all true with ==.",
        resources: [
          {
            label: "MDN: Strict Equality",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality",
          },
          {
            label: "javascript.info: Comparisons",
            url: "https://javascript.info/comparison",
          },
        ],
      },
      {
        title: "Logic Operators",
        desc: "&& (AND), || (OR), ! (NOT).",
        explanation:
          "Beyond simple boolean logic, these operators do short-circuit evaluation. && returns the first falsy value (or the last value if all truthy). || returns the first truthy value. This makes them useful for default values and guard patterns — not just conditions.",
        code: "const canDrive = hasLicense && age >= 18;\nconst name = input || 'Guest';\n!true // false",
        prompt:
          "Use && as a guard: only call a function if an object exists. Example: user && user.save().",
        resources: [
          {
            label: "MDN: Logical Operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND",
          },
          {
            label: "javascript.info: Logical Operators",
            url: "https://javascript.info/logical-operators",
          },
        ],
      },
      {
        title: "Nullish Coalescing",
        desc: "The ?? operator.",
        explanation:
          "Like || but ONLY falls back if value is null or undefined — not 0, false, or ''. This is critical for setting defaults where 0 or false are valid values. Use ?? for defaults, use || only when you want to treat ALL falsy values as 'missing'.",
        code: "let count = 0;\nlet val = count || 10; // 10 (Bad if 0 is valid)\nlet val2 = count ?? 10; // 0 (Good)",
        prompt:
          "Create a settings object where fontSize can be 0. Use ?? to provide a default of 16 only when fontSize is null/undefined.",
        resources: [
          {
            label: "MDN: Nullish Coalescing",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator",
          },
          {
            label: "javascript.info: Nullish Coalescing",
            url: "https://javascript.info/nullish-coalescing-operator",
          },
        ],
      },
      {
        title: "Conditionals",
        desc: "if, else if, else.",
        explanation:
          "Control flow based on truthy/falsy values. In JS, these are falsy: false, 0, '', null, undefined, NaN. Everything else is truthy (including empty arrays [] and objects {}!). This is different from C# where only booleans work in conditions.",
        code: "if (score > 50) {\n  console.log('Pass');\n} else if (score > 30) {\n  console.log('Retry');\n} else {\n  console.log('Fail');\n}",
        prompt:
          "Write a grade calculator: A (90+), B (80+), C (70+), D (60+), F (below 60).",
        resources: [
          {
            label: "MDN: if...else",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
          },
          {
            label: "javascript.info: Conditionals",
            url: "https://javascript.info/ifelse",
          },
        ],
      },
      {
        title: "Switch",
        desc: "Clean multi-value branching.",
        explanation:
          "Cleaner than many if/else blocks when comparing one value against specific cases. Uses strict equality (===). Pitfall: forgetting 'break' causes fall-through — execution continues into the next case. Sometimes fall-through is intentional, but usually it's a bug.",
        code: "switch(role) {\n  case 'admin': log('Admin'); break;\n  case 'user': log('User'); break;\n  default: log('Guest');\n}",
        prompt:
          "Write a switch that maps day numbers (1-7) to day names. Use fall-through intentionally to group weekdays vs weekend.",
        resources: [
          {
            label: "MDN: Switch",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch",
          },
          {
            label: "javascript.info: Switch",
            url: "https://javascript.info/switch",
          },
        ],
      },
      {
        title: "Ternary Operator",
        desc: "condition ? valueIfTrue : valueIfFalse.",
        explanation:
          "A shortcut for if/else that RETURNS a value — making it perfect for assignments and template literals. Keep it to one level; nested ternaries become unreadable fast. Use it for simple A/B decisions, not complex logic.",
        code: "const status = age >= 18 ? 'Adult' : 'Minor';\nconst label = `User is ${active ? 'online' : 'offline'}`;",
        prompt:
          "Use a ternary inside a template literal to display 'Welcome back, [name]' or 'Hello, Guest' based on whether a name exists.",
        resources: [
          {
            label: "MDN: Conditional Operator",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator",
          },
          {
            label: "javascript.info: Ternary",
            url: "https://javascript.info/ifelse#conditional-operator",
          },
        ],
      },
      {
        title: "Loops",
        desc: "for, while.",
        explanation:
          "Repeat code multiple times. 'for' has three parts: initialization, condition, update. 'while' only has a condition — use it when you don't know how many iterations you need. Always ensure the condition will eventually be false, or you'll create an infinite loop that freezes the browser.",
        code: "for (let i = 0; i < 5; i++) { \n  console.log(i); \n}\n\nlet j = 0;\nwhile (j < 5) { console.log(j); j++; }",
        prompt:
          "Write a for loop that builds an HTML string of <li> items from an array of names.",
        resources: [
          {
            label: "MDN: Loops",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
          },
          {
            label: "javascript.info: Loops",
            url: "https://javascript.info/while-for",
          },
        ],
      },
      {
        title: "Do...While Loop",
        desc: "Execute at least once.",
        explanation:
          "Unlike 'while', the condition is checked AFTER the first execution, guaranteeing the block runs at least once. Useful for user input validation, menus, or retry logic where you need at least one attempt.",
        code: "let i = 0;\ndo {\n  console.log(i);\n  i++;\n} while (i < 5);",
        prompt:
          "Write a do...while loop that generates random numbers until it gets one greater than 0.9.",
        resources: [
          {
            label: "MDN: Do...While",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while",
          },
          {
            label: "javascript.info: Do...While",
            url: "https://javascript.info/while-for#the-do-while-loop",
          },
        ],
      },
      {
        title: "Break & Continue",
        desc: "Loop control flow.",
        explanation:
          "'break' exits the loop immediately. 'continue' skips the rest of the current iteration and moves to the next one. Use break for early exit when you found what you need. Use continue to skip unwanted items without nesting your logic deeper in an if block.",
        code: "for (let i = 0; i < 10; i++) {\n  if (i === 5) break;\n  if (i % 2 === 0) continue;\n  console.log(i); // 1, 3\n}",
        prompt:
          "Loop through an array of users. Use continue to skip inactive users. Use break to stop after finding the first admin.",
        resources: [
          {
            label: "MDN: Break",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break",
          },
          {
            label: "MDN: Continue",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue",
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
          "The core of JS data storage. Keys are always coerced to strings (or Symbols), values can be anything. Objects are like C# dictionaries but with more flexibility. They combine data AND behavior (methods) in one structure.",
        code: "const car = { \n  make: 'Toyota', \n  year: 2020 \n};",
        prompt:
          "Create an object representing yourself with name, age, isLearning, and a greet() method.",
        resources: [
          {
            label: "javascript.info: Objects",
            url: "https://javascript.info/object",
          },
          {
            label: "MDN: Working with Objects",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
          },
        ],
      },
      {
        title: "Access Properties",
        desc: "Dot vs Bracket notation.",
        explanation:
          "Use dot notation (obj.key) for known static keys. Use bracket notation (obj['key']) when the key is dynamic (stored in a variable), has spaces, or starts with a number. Bracket notation is the equivalent of C# dictionary indexer syntax.",
        code: "console.log(car.make);\nconst prop = 'year';\nconsole.log(car[prop]);",
        prompt:
          "Write a function that takes an object and a key name (string) and returns the value. You must use bracket notation.",
        resources: [
          {
            label: "MDN: Property Accessors",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors",
          },
          {
            label: "javascript.info: Property Access",
            url: "https://javascript.info/object#square-brackets",
          },
        ],
      },
      {
        title: "Mutation",
        desc: "Add/Edit/Delete keys.",
        explanation:
          "Objects are mutable even if declared with const (const prevents reassignment of the variable, not mutation of the object). Use Object.freeze() for shallow immutability or Object.assign() for controlled merging. Coming from C#, this is like how 'readonly' on a reference type still allows property changes.",
        code: "const user = { name: 'Ali' };\nuser.name = 'Ahmed'; // OK\nuser.age = 25; // Add new\ndelete user.name; // Remove",
        prompt:
          "Create an object, freeze it with Object.freeze(), then try to modify it. Observe what happens (silent fail in non-strict mode).",
        resources: [
          {
            label: "MDN: Object.freeze",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze",
          },
          {
            label: "javascript.info: Object References",
            url: "https://javascript.info/object-copy",
          },
        ],
      },
      {
        title: "Object Methods",
        desc: "Functions attached to objects.",
        explanation:
          "When a function is stored as an object property, it's called a method. Inside a method, 'this' refers to the object that called it. Use the shorthand syntax in ES6+: greet() {} instead of greet: function() {}.",
        code: "const dog = {\n  name: 'Rex',\n  bark() { console.log(`${this.name}: Woof!`); }\n};\ndog.bark();",
        prompt:
          "Create a calculator object with add, subtract, and result methods that chain together.",
        resources: [
          {
            label: "MDN: Method Definitions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions",
          },
          {
            label: "javascript.info: Object Methods",
            url: "https://javascript.info/object-methods",
          },
        ],
      },
      {
        title: "Destructuring Objects",
        desc: "const { name } = user.",
        explanation:
          "Unpack properties into distinct variables. You can rename ({ name: userName }), set defaults ({ role = 'guest' }), and even destructure nested objects ({ address: { city } }). Essential for clean function parameters and API responses.",
        code: "const user = { id: 1, name: 'Alice' };\nconst { name, id } = user;\nconsole.log(name); // 'Alice'",
        prompt:
          "Destructure an API response object: extract the data, status, and rename 'error' to 'errorMessage' with a default of null.",
        resources: [
          {
            label: "MDN: Destructuring",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
          },
          {
            label: "javascript.info: Destructuring",
            url: "https://javascript.info/destructuring-assignment",
          },
        ],
      },
      {
        title: "Spread Objects",
        desc: "Clone and merge: { ...obj }.",
        explanation:
          "Creates a shallow copy — nested objects are still shared by reference. Great for immutable update patterns (React state). Order matters: later properties override earlier ones. Pitfall: spread does NOT deep clone.",
        code: "const base = { a: 1, b: 2 };\nconst copy = { ...base, b: 3, c: 4 };\n// { a: 1, b: 3, c: 4 }",
        prompt:
          "Clone a user object and override the 'role' property to 'admin' using spread, without modifying the original.",
        resources: [
          {
            label: "MDN: Spread Syntax",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          },
          {
            label: "javascript.info: Spread",
            url: "https://javascript.info/rest-parameters-spread#spread-syntax",
          },
        ],
      },
      {
        title: "Optional Chaining",
        desc: "user?.address?.street.",
        explanation:
          "Safely access deeply nested properties without causing 'Cannot read property of undefined' errors. Returns undefined if any part of the chain is null/undefined. Works with methods too: obj.method?.() and arrays: arr?.[0]. This is similar to C#'s null-conditional operator (?.).",
        code: "const user = {};\nconst city = user?.address?.city; // undefined (no crash)\nconst len = user?.name?.length; // undefined",
        prompt:
          "Write a function that safely extracts a user's first hobby from { hobbies: ['coding'] } — handle missing hobbies array gracefully.",
        resources: [
          {
            label: "MDN: Optional Chaining",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
          },
          {
            label: "javascript.info: Optional Chaining",
            url: "https://javascript.info/optional-chaining",
          },
        ],
      },
      {
        title: "Arrays",
        desc: "Ordered lists [1, 2, 3].",
        explanation:
          "Ordered, zero-indexed collections. Can hold mixed types (unlike C# typed arrays). Arrays are actually objects under the hood — typeof [] is 'object'. Use Array.isArray() to check. The .length property is writable — setting it smaller truncates the array!",
        code: "const colors = ['red', 'green', 'blue'];\nconsole.log(colors[0]); // red\nconsole.log(colors.length); // 3",
        prompt:
          "Create an array of 5 items, then set .length = 3. Log the array and observe the truncation.",
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
        explanation:
          "Unpack items by position (unlike objects which unpack by name). Skip items with commas: [, , third]. Use rest syntax to collect remaining: [first, ...rest]. Great for function return values and swapping variables: [a, b] = [b, a].",
        code: "const coords = [10, 20, 30];\nconst [x, y] = coords;\nconst [, , z] = coords; // skip first two",
        prompt:
          "Swap two variables a=1 and b=2 using array destructuring in one line, without a temp variable.",
        resources: [
          {
            label: "MDN: Array Destructuring",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring",
          },
          {
            label: "javascript.info: Array Destructuring",
            url: "https://javascript.info/destructuring-assignment#array-destructuring",
          },
        ],
      },
      {
        title: "Spread Arrays",
        desc: "Combine lists [...a, ...b].",
        explanation:
          "Create shallow copies or merge arrays. Also converts iterables (strings, Sets, NodeLists) to arrays. Essential for immutable operations — instead of mutating with push(), create a new array: [...arr, newItem].",
        code: "const a = [1, 2];\nconst b = [3, 4];\nconst combined = [...a, ...b]; // [1,2,3,4]\nconst chars = [...'hello']; // ['h','e','l','l','o']",
        prompt:
          "Use spread to add an item to the beginning and end of an array without using unshift() or push().",
        resources: [
          {
            label: "MDN: Spread (Arrays)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals",
          },
          {
            label: "javascript.info: Spread",
            url: "https://javascript.info/rest-parameters-spread",
          },
        ],
      },
      {
        title: "Stack Operations",
        desc: "push, pop, shift, unshift.",
        explanation:
          "Manage array content. push/pop work on the END (fast — O(1)). shift/unshift work on the START (slow — O(n) because every index must be re-calculated). In performance-critical code, avoid shift/unshift on large arrays.",
        code: "const arr = [1];\narr.push(2);    // [1, 2]\narr.pop();      // [1]\narr.unshift(0); // [0, 1]\narr.shift();    // [1]",
        prompt:
          "Implement a simple stack (LIFO) using just push and pop. Then implement a queue (FIFO) using push and shift.",
        resources: [
          {
            label: "MDN: Array.push",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
          },
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
          "slice(start, end) returns a shallow copy of a portion — DOES NOT mutate. splice(start, deleteCount, ...items) modifies the original — DOES mutate. Memory trick: 'slice' is safe (immutable), 'splice' is surgery (mutation).",
        code: "const arr = ['a', 'b', 'c', 'd'];\nconst copy = arr.slice(1, 3); // ['b', 'c']\narr.splice(1, 1, 'x'); // arr is now ['a', 'x', 'c', 'd']",
        prompt:
          "Use splice to remove the 3rd item from an array and insert two new items in its place.",
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
      {
        title: "Object.keys / values / entries",
        desc: "Iterate object properties.",
        explanation:
          "Object.keys(obj) returns an array of key names. Object.values(obj) returns an array of values. Object.entries(obj) returns an array of [key, value] pairs — perfect for iteration. These are the bridge between objects and array methods (map, filter, reduce).",
        code: "const user = { name: 'Ali', age: 25 };\nObject.keys(user)    // ['name', 'age']\nObject.values(user)  // ['Ali', 25]\nObject.entries(user) // [['name','Ali'], ['age',25]]",
        prompt:
          "Use Object.entries() with forEach to log 'key: value' for every property in an object.",
        resources: [
          {
            label: "MDN: Object.keys",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys",
          },
          {
            label: "javascript.info: Object.keys/values/entries",
            url: "https://javascript.info/keys-values-entries",
          },
        ],
      },
      {
        title: "for...of / for...in",
        desc: "Modern iteration.",
        explanation:
          "for...of iterates over VALUES of iterables (arrays, strings, Maps, Sets). for...in iterates over KEYS of objects (including inherited ones — use hasOwnProperty to filter). Rule: use for...of for arrays, for...in for objects. Pitfall: never use for...in on arrays — it iterates indices as strings and includes inherited properties.",
        code: "// for...of — iterate array values\nfor (const color of ['red', 'blue']) {\n  console.log(color);\n}\n// for...in — iterate object keys\nfor (const key in { a: 1, b: 2 }) {\n  console.log(key);\n}",
        prompt:
          "Use for...of to iterate a string character by character. Then use for...in to iterate an object and build a query string 'key=value&key=value'.",
        resources: [
          {
            label: "MDN: for...of",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
          },
          {
            label: "MDN: for...in",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in",
          },
        ],
      },
      {
        title: "Map",
        desc: "Key-value pairs (any type).",
        explanation:
          "Better than plain Objects for hash maps. Keys can be ANY type (objects, functions, numbers), not just strings. Maintains insertion order. Has .size property (unlike objects). Use Map when you need frequent additions/deletions or non-string keys.",
        code: "const map = new Map();\nmap.set('name', 'Alice');\nmap.set(123, 'Number Key');\nconsole.log(map.get(123));\nconsole.log(map.size); // 2",
        prompt:
          "Create a Map that uses DOM elements as keys and stores their original colors as values. Use it to implement an undo-color feature.",
        resources: [
          {
            label: "MDN: Map",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
          },
          {
            label: "javascript.info: Map",
            url: "https://javascript.info/map-set#map",
          },
        ],
      },
      {
        title: "Set",
        desc: "Unique values only.",
        explanation:
          "A collection where each value must be unique. Adding a duplicate is silently ignored. The fastest way to remove duplicates from an array: [...new Set(array)]. Has .add(), .delete(), .has(), and .size. Similar to C# HashSet<T>.",
        code: "const set = new Set([1, 2, 2, 3]);\nconsole.log([...set]); // [1, 2, 3]\nset.has(2); // true\nset.add(4);",
        prompt:
          "Write a function that takes two arrays and returns their unique combined values (union) using Set.",
        resources: [
          {
            label: "MDN: Set",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
          },
          {
            label: "javascript.info: Set",
            url: "https://javascript.info/map-set#set",
          },
        ],
      },
      {
        title: "Symbol",
        desc: "Unique, immutable identifiers.",
        explanation:
          "A primitive type for creating unique identifiers. Every Symbol() is guaranteed unique — even Symbol('id') !== Symbol('id'). Used for: (1) unique object keys that won't collide with other properties, (2) well-known symbols like Symbol.iterator that define object behavior (making objects iterable). Not enumerable in for...in or Object.keys().",
        code: "const id = Symbol('userId');\nconst user = { [id]: 42, name: 'Ali' };\nconsole.log(user[id]); // 42\nconsole.log(Object.keys(user)); // ['name'] (Symbol hidden)\n\n// Well-known symbols:\nconst range = {\n  *[Symbol.iterator]() {\n    for (let i = 1; i <= 3; i++) yield i;\n  }\n};\nfor (const n of range) console.log(n); // 1, 2, 3",
        prompt:
          "Create an object with both regular properties and Symbol keys. Iterate over it with for...in and Object.keys() — observe that Symbol keys are hidden.",
        resources: [
          {
            label: "MDN: Symbol",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
          },
          {
            label: "javascript.info: Symbol",
            url: "https://javascript.info/symbol",
          },
        ],
      },
      {
        title: "WeakMap / WeakSet",
        desc: "Memory-safe collections.",
        explanation:
          "Like Map/Set but keys (WeakMap) or values (WeakSet) must be objects, and they are held WEAKLY — if the object has no other references, it is garbage collected automatically. No .size, no iteration. Use cases: (1) storing metadata about DOM elements without memory leaks, (2) private data associated with objects, (3) caching computed results.",
        code: "const cache = new WeakMap();\nfunction expensiveCalc(obj) {\n  if (cache.has(obj)) return cache.get(obj);\n  const result = /* heavy computation */ obj.value * 2;\n  cache.set(obj, result);\n  return result;\n}\nlet data = { value: 21 };\nexpensiveCalc(data); // computed\nexpensiveCalc(data); // from cache\ndata = null; // cache entry auto-removed by GC!",
        prompt:
          "Use a WeakMap to cache DOM element measurements. When elements are removed from the DOM, the cache entries are automatically cleaned up.",
        resources: [
          {
            label: "MDN: WeakMap",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
          },
          {
            label: "javascript.info: WeakMap/WeakSet",
            url: "https://javascript.info/weakmap-weakset",
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
        desc: "Loop with side effects.",
        explanation:
          "Executes a function for every item. Returns undefined — cannot chain or collect results. Use for side effects only (logging, saving to DB, updating DOM). You CANNOT break out of forEach — use for...of if you need early exit.",
        code: "const names = ['Ali', 'Sam'];\nnames.forEach((name, index) => {\n  console.log(`${index}: ${name}`);\n});",
        prompt:
          "Use forEach to create a <li> element for each item in an array and append it to a <ul>.",
        resources: [
          {
            label: "MDN: forEach",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          },
          {
            label: "javascript.info: Array Methods",
            url: "https://javascript.info/array-methods",
          },
        ],
      },
      {
        title: "map",
        desc: "Transform every item.",
        explanation:
          "Creates a NEW array by transforming every item — one-to-one mapping. The original array is untouched. The callback receives (item, index, array). This is the functional equivalent of a for loop that builds a new array. Essential for React/UI rendering.",
        code: "const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);\n// [2, 4, 6]",
        prompt:
          "Map an array of user objects [{name, age}] to an array of HTML card strings using template literals.",
        resources: [
          {
            label: "MDN: map",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          },
          {
            label: "Scrimba: Array map",
            url: "https://scrimba.com/learn/javascript",
          },
        ],
      },
      {
        title: "filter",
        desc: "Select a subset.",
        explanation:
          "Creates a NEW array with only items where the callback returns true. Does not mutate. Callback receives (item, index, array). Chain with map for powerful data pipelines: filter first, then transform.",
        code: "const scores = [10, 50, 90, 30];\nconst passing = scores.filter(s => s > 40);\n// [50, 90]",
        prompt:
          "Filter an array of product objects to find only those in stock (inStock: true) AND under $50.",
        resources: [
          {
            label: "MDN: filter",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          },
          {
            label: "javascript.info: filter",
            url: "https://javascript.info/array-methods#filter",
          },
        ],
      },
      {
        title: "reduce",
        desc: "Aggregate to one value.",
        explanation:
          "The most powerful array method. Accumulates values into a single result — a sum, an object, a string, another array, anything. Takes (accumulator, currentItem, index, array) and an initial value. If you can write it with a loop, you can write it with reduce. Pitfall: always provide an initial value (second argument) to avoid errors on empty arrays.",
        code: "const nums = [1, 2, 3];\nconst sum = nums.reduce((acc, n) => acc + n, 0);\n// 6",
        prompt:
          "Use reduce to count how many times each word appears in an array, returning an object like { hello: 2, world: 1 }.",
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
        desc: "Get first matching item.",
        explanation:
          "Returns the FIRST item that matches the condition. Stops searching immediately after finding one (efficient). Returns undefined if nothing matches. Use find when you expect one result (like finding a user by ID).",
        code: "const users = [{id:1, name:'Ali'}, {id:2, name:'Sam'}];\nconst user = users.find(u => u.id === 2);\n// {id:2, name:'Sam'}",
        prompt:
          "Write a function findByEmail(users, email) that returns the user object matching the email, or undefined.",
        resources: [
          {
            label: "MDN: find",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
          },
          {
            label: "javascript.info: find",
            url: "https://javascript.info/array-methods#find-and-findindex",
          },
        ],
      },
      {
        title: "findIndex",
        desc: "Get index of match.",
        explanation:
          "Like find(), but returns the INDEX instead of the item. Returns -1 if not found. Essential when you need to update or remove an item using splice(), or when you need the position for any other reason.",
        code: "const users = [{id:1}, {id:2}, {id:3}];\nconst idx = users.findIndex(u => u.id === 2);\n// 1\nif (idx !== -1) users.splice(idx, 1);",
        prompt:
          "Find the index of a todo item by its id, then use splice to replace it with an updated version.",
        resources: [
          {
            label: "MDN: findIndex",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex",
          },
          {
            label: "javascript.info: findIndex",
            url: "https://javascript.info/array-methods#find-and-findindex",
          },
        ],
      },
      {
        title: "some / every",
        desc: "Boolean array checks.",
        explanation:
          "some(): returns true if AT LEAST ONE item passes the test (like C# .Any()). every(): returns true if ALL items pass (like C# .All()). Both short-circuit — some stops at the first true, every stops at the first false.",
        code: "const ages = [10, 20, 30];\nages.some(a => a >= 18);  // true\nages.every(a => a >= 18); // false",
        prompt:
          "Check if a shopping cart has any out-of-stock items (some), and if all items have a valid price (every).",
        resources: [
          {
            label: "MDN: some",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
          },
          {
            label: "MDN: every",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every",
          },
        ],
      },
      {
        title: "sort",
        desc: "Sort correctly with comparator.",
        explanation:
          "Default sort converts everything to strings and sorts alphabetically — '10' comes before '2'! ALWAYS provide a compare function: (a, b) => a - b for ascending numbers. sort() MUTATES the original array. Use [...arr].sort() or arr.toSorted() (ES2023) for immutable sorting.",
        code: "const nums = [10, 2, 5];\nnums.sort((a, b) => a - b); // [2, 5, 10]\n// Immutable sort (ES2023):\nconst sorted = nums.toSorted((a, b) => b - a);",
        prompt:
          "Sort an array of {name, date} objects by date (newest first). Use new Date() for comparison.",
        resources: [
          {
            label: "MDN: sort",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          },
          {
            label: "javascript.info: sort",
            url: "https://javascript.info/array-methods#sort-fn",
          },
        ],
      },
      {
        title: "includes",
        desc: "Check value existence.",
        explanation:
          "Simple boolean check for primitive values in an array. Does NOT work for objects (compares by reference, not value). For objects, use find() or some() instead. Also works on strings: 'hello'.includes('ell').",
        code: "const pets = ['cat', 'dog'];\npets.includes('cat'); // true\npets.includes('fish'); // false",
        prompt:
          "Write a function isAllowed(role) that checks if a role is in the allowed list ['admin', 'editor', 'moderator'].",
        resources: [
          {
            label: "MDN: includes",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
          },
          {
            label: "javascript.info: includes",
            url: "https://javascript.info/array-methods#includes",
          },
        ],
      },
      {
        title: "flat / flatMap",
        desc: "Flatten nested arrays.",
        explanation:
          "flat(depth) flattens nested arrays by the specified depth (default 1). flat(Infinity) fully flattens any depth. flatMap() is map() + flat(1) in one step — maps each item then flattens the result. Common use case: API responses with nested arrays of comments, categories, etc.",
        code: "const nested = [[1, 2], [3, [4, 5]]];\nnested.flat();     // [1, 2, 3, [4, 5]]\nnested.flat(Infinity); // [1, 2, 3, 4, 5]\n\n['hello world', 'foo bar'].flatMap(s => s.split(' '));\n// ['hello', 'world', 'foo', 'bar']",
        prompt:
          "Given an array of users where each user has a 'tags' array, use flatMap to get a single array of all unique tags.",
        resources: [
          {
            label: "MDN: flat",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
          },
          {
            label: "MDN: flatMap",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap",
          },
        ],
      },
      {
        title: "Method Chaining",
        desc: "Fluent data pipelines.",
        explanation:
          "Chain array methods for readable data transformation. Read it top-to-bottom like a pipeline: start with raw data → filter the relevant items → transform the shape → sort the result. This is the functional programming style that replaces complex for loops with declarative, readable code.",
        code: "const result = users\n  .filter(u => u.active)\n  .map(u => u.name)\n  .sort()\n  .join(', ');",
        prompt:
          "Chain filter, map, and reduce: from an array of products, get only in-stock items, extract their prices, and calculate the total.",
        resources: [
          {
            label: "Video: HOF Chaining",
            url: "https://www.youtube.com/watch?v=rRgD1yVwIvE",
          },
          {
            label: "Exercism: Array Methods",
            url: "https://exercism.org/tracks/javascript/concepts/array-analysis",
          },
        ],
      },
      {
        title: "Array.from()",
        desc: "Convert array-likes to real arrays.",
        explanation:
          "Creates a real Array from any iterable or array-like object (NodeLists, strings, arguments, Set, Map). Accepts an optional mapping function as second argument — combines creation + transformation in one step. Essential for working with DOM querySelectorAll results and generating sequences.",
        code: "// NodeList to Array\nconst divs = Array.from(document.querySelectorAll('div'));\n\n// String to char array\nArray.from('hello'); // ['h', 'e', 'l', 'l', 'o']\n\n// Generate a range\nArray.from({ length: 5 }, (_, i) => i + 1);\n// [1, 2, 3, 4, 5]\n\n// Deduplicate\nArray.from(new Set([1, 1, 2, 3])); // [1, 2, 3]",
        prompt:
          "Use Array.from() to generate: (1) an array of numbers 1-100, (2) alphabet letters a-z using charCodeAt, (3) a 5x5 grid (array of arrays).",
        resources: [
          {
            label: "MDN: Array.from()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          },
          {
            label: "javascript.info: Iterables",
            url: "https://javascript.info/iterable",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 4: Functions & Logic",
    description:
      "Defining behavior, reusable code blocks, and advanced patterns.",
    items: [
      {
        title: "Function Declaration",
        desc: "function name() {}",
        explanation:
          "Hoisted — can be called before its definition in the code. This is the standard, most readable way to define reusable logic. Named functions also show up in stack traces, making debugging easier.",
        code: "sayHi(); // Works! (hoisted)\n\nfunction sayHi() {\n  console.log('Hi');\n}",
        prompt:
          "Write a function that calculates Body Mass Index (BMI) given weight (kg) and height (m).",
        resources: [
          {
            label: "MDN: Functions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
          },
          {
            label: "javascript.info: Functions",
            url: "https://javascript.info/function-basics",
          },
        ],
      },
      {
        title: "Function Expression",
        desc: "const fn = function() {}",
        explanation:
          "NOT hoisted — must be defined before use. Assigns an anonymous (or named) function to a variable. Use when you need to pass a function as a value (callbacks), conditionally define functions, or create IIFEs.",
        code: "const sayHi = function() {\n  console.log('Hi');\n};\nsayHi();",
        prompt:
          "Create two function expressions: one for add and one for subtract. Store them in an object as methods.",
        resources: [
          {
            label: "MDN: Function Expressions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function",
          },
          {
            label: "javascript.info: Function Expressions",
            url: "https://javascript.info/function-expressions",
          },
        ],
      },
      {
        title: "Arrow Functions",
        desc: "const fn = () => {}",
        explanation:
          "Modern, concise syntax. Does NOT bind its own 'this' — it inherits from the surrounding scope (lexical this). Perfect for callbacks and array methods. Avoid using as object methods where you need 'this' to refer to the object.",
        code: "const add = (a, b) => a + b;\nconst greet = name => `Hello ${name}`;\nconst log = () => console.log('done');",
        prompt:
          "Convert a traditional function that uses 'this' inside an object to an arrow function and observe how 'this' breaks.",
        resources: [
          {
            label: "MDN: Arrow Functions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
          },
          {
            label: "javascript.info: Arrow Functions",
            url: "https://javascript.info/arrow-functions-basics",
          },
        ],
      },
      {
        title: "Implicit Return",
        desc: "One-liner arrow functions.",
        explanation:
          "Arrow functions without {} automatically return the expression result. To implicitly return an object literal, wrap it in parentheses: () => ({ key: value }). This is a common gotcha — without parentheses, JS thinks {} is a code block.",
        code: "const square = n => n * n;\nconst makeUser = (name) => ({ name, role: 'user' });\n// Note the () around the object!",
        prompt:
          "Write a one-liner arrow function that takes an array and returns its length. Then write one that returns an object with {count: array.length}.",
        resources: [
          {
            label: "javascript.info: Arrow Shortcuts",
            url: "https://javascript.info/arrow-functions-basics",
          },
          {
            label: "MDN: Arrow Functions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body",
          },
        ],
      },
      {
        title: "Default Parameters",
        desc: "fn(a = defaultValue)",
        explanation:
          "Provide fallback values when an argument is missing or explicitly undefined. Works left-to-right — later defaults can use earlier parameters. Pitfall: passing null does NOT trigger the default (only undefined does). Similar to C# optional parameters.",
        code: "function greet(name = 'Guest', greeting = `Hello ${name}`) {\n  console.log(greeting);\n}\ngreet(); // 'Hello Guest'",
        prompt:
          "Create a createUser function with defaults: role='user', active=true, createdAt=new Date().",
        resources: [
          {
            label: "MDN: Default Parameters",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters",
          },
          {
            label: "javascript.info: Default Values",
            url: "https://javascript.info/function-basics#default-values",
          },
        ],
      },
      {
        title: "Rest Parameters",
        desc: "function(...args)",
        explanation:
          "Collects all remaining arguments into a real array. Must be the last parameter. Replaces the legacy 'arguments' object (which is array-like but not a real array). Use with destructuring: function(first, ...rest) {}.",
        code: "function sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4); // 10",
        prompt:
          "Create a function that takes a required 'action' string and any number of 'items', then logs '[action]: item1, item2, ...'.",
        resources: [
          {
            label: "MDN: Rest Parameters",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters",
          },
          {
            label: "javascript.info: Rest Parameters",
            url: "https://javascript.info/rest-parameters-spread#rest-parameters",
          },
        ],
      },
      {
        title: "Higher-Order Functions",
        desc: "Functions as values.",
        explanation:
          "A function that takes another function as an argument OR returns a function. This is the foundation of functional programming in JS. map(), filter(), reduce(), addEventListener() — all are higher-order functions. In C#, this is equivalent to passing Action<T> or Func<T> delegates.",
        code: "// Takes a function as argument\nfunction repeat(n, action) {\n  for (let i = 0; i < n; i++) action(i);\n}\nrepeat(3, console.log); // 0, 1, 2\n\n// Returns a function\nfunction multiplier(factor) {\n  return n => n * factor;\n}\nconst double = multiplier(2);\ndouble(5); // 10",
        prompt:
          "Write a higher-order function 'unless(condition, thenDo)' that calls thenDo() only when condition is false.",
        resources: [
          {
            label: "javascript.info: Higher-Order Functions",
            url: "https://javascript.info/function-expressions#callback-functions",
          },
          {
            label: "Exercism: Higher-Order Functions",
            url: "https://exercism.org/tracks/javascript/concepts/callbacks",
          },
        ],
      },
      {
        title: "Callbacks",
        desc: "Functions passed as arguments.",
        explanation:
          "A callback is a function you pass to another function to be called later. This is the oldest async pattern in JS — before Promises existed, everything used callbacks. Pitfall: nested callbacks create 'Callback Hell' (pyramid of doom), which is why Promises were invented.",
        code: "function fetchData(url, onSuccess, onError) {\n  // simulate async\n  setTimeout(() => {\n    const ok = Math.random() > 0.3;\n    ok ? onSuccess('Data!') : onError('Failed');\n  }, 1000);\n}\nfetchData('/api', console.log, console.error);",
        prompt:
          "Write a function processArray(arr, callback) that applies callback to each item and returns a new array of results.",
        resources: [
          {
            label: "MDN: Callback Function",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function",
          },
          {
            label: "javascript.info: Callbacks",
            url: "https://javascript.info/callbacks",
          },
        ],
      },
      {
        title: "IIFE",
        desc: "Immediately Invoked Function Expression.",
        explanation:
          "A function that runs the moment it is defined: (function() { ... })(). Used to create a private scope — variables inside don't leak to global. Was essential before ES6 modules existed. You'll still see it in legacy code and library patterns.",
        code: "(function() {\n  const secret = 'hidden';\n  console.log('Runs immediately!');\n})();\n// secret is not accessible here",
        prompt:
          "Create an IIFE that initializes a counter module with increment(), decrement(), and getCount() methods — all using closure.",
        resources: [
          {
            label: "MDN: IIFE",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/IIFE",
          },
          {
            label: "javascript.info: IIFE",
            url: "https://javascript.info/var#iife",
          },
        ],
      },
      {
        title: "Context (this)",
        desc: "Dynamic object reference.",
        explanation:
          "In standard functions, 'this' depends on HOW the function is called, not WHERE it is defined. obj.method() → this = obj. Standalone call → this = undefined (strict) or window (sloppy). Arrow functions don't have their own 'this' — they inherit it. This is the #1 source of confusion in JS.",
        code: "const user = {\n  name: 'Ali',\n  say() { console.log(this.name); }\n};\nuser.say(); // 'Ali'\nconst fn = user.say;\nfn(); // undefined! (lost context)",
        prompt:
          "Extract a method from an object, assign it to a variable, and call it. Observe how 'this' is lost. Then fix it using bind().",
        resources: [
          {
            label: "MDN: this",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          },
          {
            label: "javascript.info: this",
            url: "https://javascript.info/object-methods#this-in-methods",
          },
        ],
      },
      {
        title: "call / apply / bind",
        desc: "Explicit this control.",
        explanation:
          "call(thisArg, arg1, arg2) — invokes immediately with given this. apply(thisArg, [args]) — same but args as array. bind(thisArg) — returns a NEW function with this permanently set. Use bind for event handlers and callbacks where this gets lost.",
        code: "function greet(greeting) {\n  console.log(`${greeting}, ${this.name}`);\n}\nconst user = { name: 'Ali' };\ngreet.call(user, 'Hello');   // 'Hello, Ali'\ngreet.apply(user, ['Hi']);   // 'Hi, Ali'\nconst bound = greet.bind(user);\nbound('Hey'); // 'Hey, Ali'",
        prompt:
          "Create a function logInfo() that uses 'this'. Use bind to permanently attach it to a user object, then pass the bound version as a callback to setTimeout.",
        resources: [
          {
            label: "MDN: bind",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind",
          },
          {
            label: "javascript.info: call/apply/bind",
            url: "https://javascript.info/bind",
          },
        ],
      },
      {
        title: "Recursion",
        desc: "Functions calling themselves.",
        explanation:
          "A function that calls itself with a smaller input until reaching a base case (exit condition). Essential for: tree traversal, nested data (comments, file systems), and many algorithms. Every recursion MUST have a base case or it causes a stack overflow. Any recursion can be rewritten as a loop, but recursion is often more elegant for nested structures.",
        code: "function countdown(n) {\n  if (n <= 0) return; // base case\n  console.log(n);\n  countdown(n - 1); // recursive call\n}\ncountdown(5); // 5, 4, 3, 2, 1",
        prompt:
          "Write a recursive function deepFlatten(arr) that flattens a nested array of any depth: [1, [2, [3, [4]]]] → [1, 2, 3, 4].",
        resources: [
          {
            label: "javascript.info: Recursion",
            url: "https://javascript.info/recursion",
          },
          {
            label: "Exercism: Recursion",
            url: "https://exercism.org/tracks/javascript/concepts/recursion",
          },
        ],
      },
      {
        title: "Generators & Iterators",
        desc: "function*, yield, lazy sequences.",
        explanation:
          "Generator functions (function*) can pause and resume execution using 'yield'. They return an iterator object with a .next() method. Each .next() call runs until the next yield and returns { value, done }. Use for: lazy evaluation (infinite sequences), custom iterables, and async flow control. Memory-efficient — values are produced on demand.",
        code: "function* range(start, end) {\n  for (let i = start; i <= end; i++) {\n    yield i;\n  }\n}\nconst gen = range(1, 5);\ngen.next(); // { value: 1, done: false }\ngen.next(); // { value: 2, done: false }\n\n// Works with for...of\nfor (const n of range(1, 3)) console.log(n);\n// 1, 2, 3\n\n// Infinite sequence\nfunction* ids() {\n  let id = 1;\n  while (true) yield id++;\n}",
        prompt:
          "Create a generator function fibonacci() that yields the Fibonacci sequence infinitely. Use it to get the first 10 Fibonacci numbers.",
        resources: [
          {
            label: "MDN: Generators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator",
          },
          {
            label: "javascript.info: Generators",
            url: "https://javascript.info/generators",
          },
        ],
      },
      {
        title: "Currying",
        desc: "Transform f(a, b) into f(a)(b).",
        explanation:
          "Converting a function with multiple arguments into a sequence of functions, each taking a single argument. Enables partial application — pre-fill some arguments and reuse the rest. Used heavily in functional programming, middleware patterns, and configuration. This is a senior-level pattern seen in libraries like Lodash, Ramda, and Redux.",
        code: "// Manual currying\nconst add = (a) => (b) => a + b;\nadd(2)(3); // 5\nconst addFive = add(5);\naddFive(10); // 15\n\n// Practical: configurable logger\nconst log = (level) => (module) => (msg) =>\n  console.log(`[${level}] ${module}: ${msg}`);\nconst errorLog = log('ERROR')('Auth');\nerrorLog('Login failed'); // [ERROR] Auth: Login failed",
        prompt:
          "Create a curried multiply(a)(b)(c) function. Then create a 'double' function by partially applying multiply(2). Test: double(3)(4) should return 24.",
        resources: [
          {
            label: "javascript.info: Currying",
            url: "https://javascript.info/currying-partials",
          },
          {
            label: "MDN: Closures (foundation)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
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
          "The browser parses HTML into a tree of objects called the DOM (Document Object Model). Every HTML element becomes a node object with properties and methods. JS can read and modify this tree, which instantly updates the page. Think of it as the runtime representation of your HTML, similar to how C# has an object graph.",
        code: "console.dir(document.body);\nconsole.log(document.documentElement); // <html>",
        prompt:
          "Open DevTools, go to Console, and explore document.body.children. Navigate through the tree to find a specific element.",
        resources: [
          {
            label: "MDN: DOM Introduction",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
          },
          {
            label: "javascript.info: DOM Tree",
            url: "https://javascript.info/dom-nodes",
          },
        ],
      },
      {
        title: "Selection",
        desc: "querySelector / querySelectorAll.",
        explanation:
          "Find elements using CSS selectors. querySelector() returns the FIRST match (or null). querySelectorAll() returns ALL matches as a static NodeList. Always prefer these over getElementById/getElementsByClassName — they are more flexible and consistent.",
        code: "const btn = document.querySelector('.submit-btn');\nconst items = document.querySelectorAll('li');\nconst input = document.querySelector('input[type=\"email\"]');",
        prompt:
          "Select all links with class 'nav-link' and log their href attributes using querySelectorAll and forEach.",
        resources: [
          {
            label: "MDN: querySelector",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
          },
          {
            label: "javascript.info: Searching Elements",
            url: "https://javascript.info/searching-elements-dom",
          },
        ],
      },
      {
        title: "Text Content",
        desc: "innerText vs textContent vs innerHTML.",
        explanation:
          "textContent: fast, returns ALL text (including hidden). innerText: slower, returns only VISIBLE text. innerHTML: parses HTML strings — DANGEROUS with user input (XSS attacks). Rule: use textContent for safe text, innerHTML only with trusted data, never with user input.",
        code: "h1.textContent = 'Welcome Back!';\n// SAFE: escapes HTML\np.textContent = '<b>Bold</b>'; // shows literal '<b>Bold</b>'\n// DANGEROUS with user input:\ndiv.innerHTML = '<b>Bold</b>'; // renders actual bold",
        prompt:
          "Create a function that safely displays user-submitted text in a div using textContent (not innerHTML) to prevent XSS.",
        resources: [
          {
            label: "MDN: textContent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
          },
          {
            label: "javascript.info: innerHTML",
            url: "https://javascript.info/basic-dom-node-properties#innerhtml-the-contents",
          },
        ],
      },
      {
        title: "Styles",
        desc: "element.style & getComputedStyle.",
        explanation:
          "element.style sets INLINE styles (highest specificity). Property names are camelCase: backgroundColor, not background-color. getComputedStyle(el) reads the FINAL computed style including CSS file rules. Prefer classList.toggle() for styling — inline styles are harder to maintain.",
        code: "box.style.backgroundColor = 'red';\nbox.style.display = 'none';\nconst computed = getComputedStyle(box);\nconsole.log(computed.fontSize);",
        prompt:
          "Write a function that reads the current background color of an element and toggles it between two colors on click.",
        resources: [
          {
            label: "MDN: HTMLElement.style",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style",
          },
          {
            label: "javascript.info: Styles",
            url: "https://javascript.info/styles-and-classes",
          },
        ],
      },
      {
        title: "Classes",
        desc: "classList API.",
        explanation:
          "The cleanest way to change styles with JS. add(), remove(), toggle(), contains(), replace(). toggle() is especially useful — it adds a class if missing, removes if present. This is the professional approach: define styles in CSS, toggle classes in JS.",
        code: "el.classList.add('active');\nel.classList.remove('hidden');\nel.classList.toggle('dark-mode');\nel.classList.contains('active'); // true",
        prompt:
          "Build a dark mode toggle: on button click, toggle a 'dark' class on document.body that changes background and text colors via CSS.",
        resources: [
          {
            label: "MDN: classList",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
          },
          {
            label: "javascript.info: Styles and Classes",
            url: "https://javascript.info/styles-and-classes#classname-and-classlist",
          },
        ],
      },
      {
        title: "Creation",
        desc: "createElement + build in memory.",
        explanation:
          "Create new HTML elements from scratch in JS memory. Set all properties (className, textContent, src) BEFORE inserting into the DOM — this avoids unnecessary repaints. Build complex elements using multiple createElement calls and appendChild chains.",
        code: "const card = document.createElement('div');\ncard.className = 'card';\ncard.textContent = 'Hello!';\n// Not visible yet — still in memory",
        prompt:
          "Create a complete card element with an image, title, and description — all in JS. Don't insert it yet.",
        resources: [
          {
            label: "MDN: createElement",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
          },
          {
            label: "javascript.info: Creating Elements",
            url: "https://javascript.info/modifying-document#creating-an-element",
          },
        ],
      },
      {
        title: "Insertion",
        desc: "append / prepend / before / after.",
        explanation:
          "append() — adds to the END (accepts nodes and strings). prepend() — adds to the START. before()/after() — insert as siblings. appendChild() is the older version, only accepts nodes. insertAdjacentHTML() inserts raw HTML strings at specific positions.",
        code: "document.body.append(card);\nlist.prepend(newItem);\nelement.before(heading);\nelement.after(divider);",
        prompt:
          "Build a todo list: create an input and button. On click, create a new <li> and prepend it to the list.",
        resources: [
          {
            label: "MDN: append",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/append",
          },
          {
            label: "javascript.info: Modifying Document",
            url: "https://javascript.info/modifying-document",
          },
        ],
      },
      {
        title: "Removal",
        desc: "element.remove().",
        explanation:
          "Removes an element from the DOM. The element still exists in memory (in your variable) — you can re-insert it later. To remove all children: parent.innerHTML = '' (fast but destroys event listeners) or loop with removeChild().",
        code: "const ad = document.querySelector('.ad');\nad.remove();\n// Remove all children:\nlist.innerHTML = '';",
        prompt:
          "Add a 'delete' button to each list item that removes itself from the DOM when clicked.",
        resources: [
          {
            label: "MDN: remove",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/remove",
          },
          {
            label: "javascript.info: Removing Nodes",
            url: "https://javascript.info/modifying-document#removal-of-nodes",
          },
        ],
      },
      {
        title: "Attributes",
        desc: "getAttribute / setAttribute.",
        explanation:
          "Read or modify any HTML attribute (href, src, id, class, custom). getAttribute returns the HTML attribute value (always a string). Some attributes have direct DOM properties (el.id, el.src) — prefer those for standard attributes. Use get/setAttribute for custom attributes.",
        code: "img.setAttribute('src', 'pic.jpg');\nimg.setAttribute('alt', 'A photo');\nconst href = link.getAttribute('href');",
        prompt:
          "Select all images on a page and add a 'loading=\"lazy\"' attribute to each one using setAttribute.",
        resources: [
          {
            label: "MDN: setAttribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute",
          },
          {
            label: "javascript.info: Attributes",
            url: "https://javascript.info/dom-attributes-and-properties",
          },
        ],
      },
      {
        title: "Data Attributes",
        desc: "data-* and the dataset API.",
        explanation:
          "Custom HTML attributes starting with data- store metadata on elements. Access them in JS via element.dataset. The attribute data-user-id becomes dataset.userId (camelCase). This is the clean way to pass data from HTML to JS without abusing IDs or classes.",
        code: "<button data-action=\"delete\" data-item-id=\"42\">Delete</button>\n\nconst btn = document.querySelector('button');\nconsole.log(btn.dataset.action);  // 'delete'\nconsole.log(btn.dataset.itemId);  // '42'",
        prompt:
          "Create a list of products where each <li> has data-price and data-category attributes. Write JS that filters visible items by category using dataset.",
        resources: [
          {
            label: "MDN: data-* attributes",
            url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes",
          },
          {
            label: "javascript.info: Dataset",
            url: "https://javascript.info/dom-attributes-and-properties#non-standard-attributes-dataset",
          },
        ],
      },
      {
        title: "DOM Traversal",
        desc: "Navigate parent, child, sibling.",
        explanation:
          "Move from an element to its relatives. parentElement, children, firstElementChild, lastElementChild, nextElementSibling, previousElementSibling. Use 'Element' versions (not 'Node' versions) to skip text nodes and comments. Essential for event delegation and dynamic UIs.",
        code: "const item = document.querySelector('li');\nconst list = item.parentElement;\nconst next = item.nextElementSibling;\nconst first = list.firstElementChild;",
        prompt:
          "Select the middle item in a list and highlight its previous and next siblings by adding a CSS class.",
        resources: [
          {
            label: "MDN: Node relationships",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Node",
          },
          {
            label: "javascript.info: DOM Navigation",
            url: "https://javascript.info/dom-navigation",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 6: Events & Interaction",
    description: "Making pages interactive with event handling.",
    items: [
      {
        title: "Event Listeners",
        desc: "addEventListener pattern.",
        explanation:
          "The standard way to react to user interaction. addEventListener is preferred over onclick because: (1) you can attach multiple listeners to the same event, (2) you can remove them with removeEventListener, (3) you have capture/bubble options. Always clean up listeners in Single Page Apps to avoid memory leaks.",
        code: "const btn = document.querySelector('#submit');\nbtn.addEventListener('click', () => {\n  console.log('Clicked!');\n});\n// Cleanup:\nbtn.removeEventListener('click', handler);",
        prompt:
          "Add a click listener to a button. After 3 clicks, remove the listener so the button no longer responds.",
        resources: [
          {
            label: "MDN: addEventListener",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          },
          {
            label: "javascript.info: Events",
            url: "https://javascript.info/introduction-browser-events",
          },
        ],
      },
      {
        title: "Mouse Events",
        desc: "click, dblclick, mouseenter, mouseleave.",
        explanation:
          "click: single click. dblclick: double click. mouseenter/mouseleave: hover in/out (don't bubble — use mouseover/mouseout if you need bubbling). The event object gives coordinates: e.clientX/Y (viewport), e.pageX/Y (document), e.offsetX/Y (element).",
        code: "card.addEventListener('mouseenter', () => {\n  card.classList.add('hovered');\n});\ncard.addEventListener('mouseleave', () => {\n  card.classList.remove('hovered');\n});",
        prompt:
          "Build a color picker: on mousemove over a div, change its background color based on the cursor's X/Y position.",
        resources: [
          {
            label: "MDN: MouseEvent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
          },
          {
            label: "javascript.info: Mouse Events",
            url: "https://javascript.info/mouse-events-basics",
          },
        ],
      },
      {
        title: "Keyboard Events",
        desc: "keydown, keyup.",
        explanation:
          "keydown fires when a key is pressed (and repeats if held). keyup fires when released. Use e.key for the character ('a', 'Enter', 'Escape'), not the deprecated e.keyCode. For keyboard shortcuts, check e.ctrlKey, e.shiftKey, e.altKey in combination with e.key.",
        code: "document.addEventListener('keydown', e => {\n  if (e.key === 'Escape') closeModal();\n  if (e.ctrlKey && e.key === 's') {\n    e.preventDefault(); // stop browser save\n    save();\n  }\n});",
        prompt:
          "Create a keyboard shortcut: Ctrl+K opens a search bar, Escape closes it.",
        resources: [
          {
            label: "MDN: KeyboardEvent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
          },
          {
            label: "javascript.info: Keyboard Events",
            url: "https://javascript.info/keyboard-events",
          },
        ],
      },
      {
        title: "Form Events",
        desc: "submit, input, change.",
        explanation:
          "submit: fires on form submission — ALWAYS call e.preventDefault() to stop page reload. input: fires on every keystroke (live). change: fires when field loses focus after modification. Use 'input' for live search, 'change' for dropdowns/checkboxes.",
        code: "form.addEventListener('submit', e => {\n  e.preventDefault();\n  const data = new FormData(form);\n  console.log(data.get('email'));\n});",
        prompt:
          "Build a live search: listen for 'input' on a text field and filter a list of items as the user types.",
        resources: [
          {
            label: "MDN: FormData",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/FormData",
          },
          {
            label: "javascript.info: Form Events",
            url: "https://javascript.info/forms-submit",
          },
        ],
      },
      {
        title: "Event Object (e)",
        desc: "Details of the event.",
        explanation:
          "Automatically passed to your callback. Contains: e.target (the element that triggered), e.currentTarget (the element the listener is on), e.type (event name), e.preventDefault() (stop default behavior), e.stopPropagation() (stop bubbling). e.target vs e.currentTarget is crucial for delegation patterns.",
        code: "btn.addEventListener('click', (e) => {\n  console.log(e.target);        // clicked element\n  console.log(e.currentTarget); // element with listener\n  console.log(e.type);          // 'click'\n});",
        prompt:
          "Log e.target.tagName inside a parent div's click listener. Click different child elements and observe the output.",
        resources: [
          {
            label: "MDN: Event Object",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Event",
          },
          {
            label: "javascript.info: Event Object",
            url: "https://javascript.info/introduction-browser-events#event-object",
          },
        ],
      },
      {
        title: "Bubbling & Capturing",
        desc: "Event propagation.",
        explanation:
          "Events travel in 3 phases: Capturing (top → target), Target (the element itself), Bubbling (target → top). By default, listeners fire in the bubbling phase. Use e.stopPropagation() to stop bubbling. Use { capture: true } option to listen during capture phase. Understanding this is key to event delegation.",
        code: "// Bubbling: child click also triggers parent\ndiv.addEventListener('click', () => log('div'));\ndiv.querySelector('button').addEventListener('click', (e) => {\n  log('button');\n  e.stopPropagation(); // stops bubbling\n});",
        prompt:
          "Create 3 nested divs. Add click listeners to all 3. Click the innermost and observe the bubbling order. Then stop propagation at the middle div.",
        resources: [
          {
            label: "javascript.info: Bubbling",
            url: "https://javascript.info/bubbling-and-capturing",
          },
          {
            label: "MDN: Event Propagation",
            url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling",
          },
        ],
      },
      {
        title: "Event Delegation",
        desc: "One listener for many elements.",
        explanation:
          "Attach ONE listener to a parent instead of separate listeners on each child. Use e.target to identify which child was clicked. Benefits: (1) works for dynamically added elements, (2) uses less memory, (3) simpler code. This is the professional pattern for lists, tables, and any dynamic UI.",
        code: "list.addEventListener('click', e => {\n  if (e.target.matches('li')) {\n    e.target.classList.toggle('done');\n  }\n  if (e.target.matches('.delete-btn')) {\n    e.target.closest('li').remove();\n  }\n});",
        prompt:
          "Build a dynamic todo list using a single delegated listener on the <ul>. Handle both 'complete' and 'delete' actions.",
        resources: [
          {
            label: "javascript.info: Delegation",
            url: "https://javascript.info/event-delegation",
          },
          {
            label: "MDN: Event Delegation",
            url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling#event_delegation",
          },
        ],
      },
      {
        title: "Page Lifecycle Events",
        desc: "DOMContentLoaded, load, beforeunload.",
        explanation:
          "DOMContentLoaded: fires when HTML is parsed (before images/CSS finish loading) — use this to initialize JS safely. load: fires when EVERYTHING (images, stylesheets) finishes loading. beforeunload: fires when user tries to leave — use for 'unsaved changes' warnings. Use DOMContentLoaded for most JS init, load only for image-dependent logic.",
        code: "document.addEventListener('DOMContentLoaded', () => {\n  console.log('DOM ready — safe to query elements');\n});\n\nwindow.addEventListener('load', () => {\n  console.log('All resources loaded');\n});\n\nwindow.addEventListener('beforeunload', (e) => {\n  e.preventDefault(); // triggers 'Leave site?' dialog\n});",
        prompt:
          "Log timestamps for DOMContentLoaded and load events. Observe the time difference on a page with large images.",
        resources: [
          {
            label: "MDN: DOMContentLoaded",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event",
          },
          {
            label: "javascript.info: Page Lifecycle",
            url: "https://javascript.info/onload-ondomcontentloaded",
          },
        ],
      },
      {
        title: "Scroll & Resize Events",
        desc: "React to scrolling and window resize.",
        explanation:
          "scroll fires rapidly as the user scrolls — ALWAYS debounce or throttle it to avoid performance issues. Use window.scrollY for vertical position. IntersectionObserver is the modern, performant alternative for scroll-based triggers. resize fires when the window size changes — also throttle it.",
        code: "// Debounced scroll handler\nlet timeout;\nwindow.addEventListener('scroll', () => {\n  clearTimeout(timeout);\n  timeout = setTimeout(() => {\n    console.log('Scroll position:', window.scrollY);\n  }, 100);\n});\n\n// Modern: IntersectionObserver\nconst observer = new IntersectionObserver(entries => {\n  entries.forEach(e => {\n    if (e.isIntersecting) e.target.classList.add('visible');\n  });\n});\nobserver.observe(document.querySelector('.section'));",
        prompt:
          "Build a 'back to top' button that only appears when the user scrolls past 300px. Use scroll event with debouncing.",
        resources: [
          {
            label: "MDN: Scroll Event",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event",
          },
          {
            label: "MDN: IntersectionObserver",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
          },
        ],
      },
      {
        title: "Debounce & Throttle",
        desc: "Rate-limiting event handlers.",
        explanation:
          "Debounce: waits until the user STOPS triggering the event for X ms, then fires once (search input, resize). Throttle: fires at most once every X ms, regardless of how often the event triggers (scroll, mousemove). Both are essential for performance. Without them, scroll/input handlers can fire hundreds of times per second.",
        code: "// Debounce: fires AFTER user stops typing\nfunction debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\nconst search = debounce(query => fetchResults(query), 300);\n\n// Throttle: fires at most once per interval\nfunction throttle(fn, limit) {\n  let waiting = false;\n  return (...args) => {\n    if (waiting) return;\n    fn(...args);\n    waiting = true;\n    setTimeout(() => waiting = false, limit);\n  };\n}\nwindow.addEventListener('scroll', throttle(handleScroll, 100));",
        prompt:
          "Implement both debounce and throttle from scratch. Test debounce with a search input and throttle with scroll position logging.",
        resources: [
          {
            label: "javascript.info: Debounce",
            url: "https://javascript.info/task/debounce",
          },
          {
            label: "javascript.info: Throttle",
            url: "https://javascript.info/task/throttle",
          },
        ],
      },
      {
        title: "Custom Events",
        desc: "Create and dispatch your own events.",
        explanation:
          "Create custom events with new CustomEvent('name', { detail: data }). Dispatch them with element.dispatchEvent(event). Listen with addEventListener as usual. Use for: component communication, decoupling modules, and building event-driven architectures. The 'detail' property carries custom data.",
        code: "// Create and dispatch\nconst event = new CustomEvent('userLoggedIn', {\n  detail: { username: 'Ali', role: 'admin' },\n  bubbles: true\n});\ndocument.dispatchEvent(event);\n\n// Listen\ndocument.addEventListener('userLoggedIn', (e) => {\n  console.log(`Welcome ${e.detail.username}!`);\n});",
        prompt:
          "Build a simple event bus: create a module that dispatches custom events for 'cart:add', 'cart:remove', and 'cart:clear'. Listen for them and update a cart counter.",
        resources: [
          {
            label: "MDN: CustomEvent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent",
          },
          {
            label: "javascript.info: Custom Events",
            url: "https://javascript.info/dispatch-events",
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
          "JS is single-threaded — it can only do one thing at a time. Long tasks (network requests, file reads) must happen asynchronously to avoid freezing the UI. The Event Loop coordinates this: synchronous code runs first, then async callbacks (microtasks before macrotasks). This is fundamentally different from C#'s multi-threaded model.",
        code: "console.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);\n// Output: 1, 3, 2 (async runs AFTER sync)",
        prompt:
          "Predict the output order of: console.log('A'), setTimeout(() => log('B'), 0), Promise.resolve().then(() => log('C')), console.log('D'). Then verify.",
        resources: [
          {
            label: "Video: Event Loop (Philip Roberts)",
            url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
          },
          {
            label: "javascript.info: Event Loop",
            url: "https://javascript.info/event-loop",
          },
        ],
      },
      {
        title: "Timers",
        desc: "setTimeout / setInterval.",
        explanation:
          "setTimeout(fn, ms) — runs fn once after delay. setInterval(fn, ms) — runs fn repeatedly. Both return an ID for cancellation. Pitfall: setInterval doesn't wait for the previous callback to finish — if the callback is slow, intervals can pile up. Use recursive setTimeout for guaranteed spacing.",
        code: "const id = setTimeout(() => log('Delayed'), 1000);\nclearTimeout(id);\n\nconst interval = setInterval(() => tick(), 1000);\nclearInterval(interval);",
        prompt:
          "Build a countdown timer that displays 10, 9, 8... 0, then shows 'Time's up!' and stops the interval.",
        resources: [
          {
            label: "MDN: setTimeout",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout",
          },
          {
            label: "MDN: setInterval",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/setInterval",
          },
        ],
      },
      {
        title: "Promises",
        desc: "Container for a future value.",
        explanation:
          "An object representing a value that will be available now, later, or never. States: pending → fulfilled (resolved) or rejected. Chain with .then(onSuccess) and .catch(onError). .finally() runs regardless of outcome. Always attach .catch() to handle errors — unhandled promise rejections crash Node.js.",
        code: "const p = new Promise((resolve, reject) => {\n  const ok = true;\n  if (ok) resolve('Success');\n  else reject(new Error('Fail'));\n});\np.then(val => log(val))\n .catch(err => log(err))\n .finally(() => log('Done'));",
        prompt:
          "Create a function wait(ms) that returns a Promise that resolves after the given milliseconds. Use it with async/await.",
        resources: [
          {
            label: "MDN: Using Promises",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
          },
          {
            label: "javascript.info: Promises",
            url: "https://javascript.info/promise-basics",
          },
        ],
      },
      {
        title: "Async / Await",
        desc: "Syntactic sugar over Promises.",
        explanation:
          "Makes async code look synchronous — much easier to read than .then() chains. 'async' marks a function that returns a Promise. 'await' pauses execution until the Promise resolves. Pitfall: await only works inside async functions (or at the top level of ES modules). Error handling with try/catch replaces .catch().",
        code: "async function getData() {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Failed:', err);\n  }\n}",
        prompt:
          "Rewrite a .then().then().catch() chain using async/await with try/catch. Compare readability.",
        resources: [
          {
            label: "MDN: async function",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          },
          {
            label: "javascript.info: Async/Await",
            url: "https://javascript.info/async-await",
          },
        ],
      },
      {
        title: "Fetch API",
        desc: "Network requests.",
        explanation:
          "Built-in way to make HTTP requests. Returns a Promise. Important: fetch doesn't reject on HTTP errors (404, 500) — only on network failures. You MUST check res.ok or res.status. The response body is a stream — call .json(), .text(), or .blob() to read it (also returns a Promise).",
        code: "const res = await fetch('https://api.example.com/data');\nif (!res.ok) throw new Error(`HTTP ${res.status}`);\nconst data = await res.json();\n\n// POST request:\nawait fetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Ali' })\n});",
        prompt:
          "Fetch data from JSONPlaceholder API (/users), handle errors properly (check res.ok), and display the data in a list.",
        resources: [
          {
            label: "MDN: Using Fetch",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          },
          {
            label: "javascript.info: Fetch",
            url: "https://javascript.info/fetch",
          },
        ],
      },
      {
        title: "Error Handling",
        desc: "try / catch / finally.",
        explanation:
          "Gracefully handle failures. try block runs the risky code. catch(error) handles the failure — error.message has the description. finally runs regardless (cleanup, hide loading spinners). For async: use try/catch with await. For Promises: use .catch(). Throw custom errors with: throw new Error('message').",
        code: "try {\n  const data = await riskyOperation();\n  process(data);\n} catch (error) {\n  console.error('Failed:', error.message);\n  showErrorUI(error);\n} finally {\n  hideLoadingSpinner();\n}",
        prompt:
          "Write an async function that fetches data, shows a loading spinner during the request, and always hides it in finally — even if the request fails.",
        resources: [
          {
            label: "MDN: try...catch",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          },
          {
            label: "javascript.info: Error Handling",
            url: "https://javascript.info/try-catch",
          },
        ],
      },
      {
        title: "JSON",
        desc: "Serialization format.",
        explanation:
          "JSON.stringify(obj) converts objects to JSON strings (for storage or network). JSON.parse(str) converts JSON strings back to objects. The language of APIs — nearly every REST API speaks JSON. Pitfall: JSON.stringify skips functions, undefined, and Symbol values. Use the replacer parameter for custom serialization.",
        code: "const str = JSON.stringify({ id: 1, name: 'Ali' });\n// '{\"id\":1,\"name\":\"Ali\"}'\nconst obj = JSON.parse(str);\n// { id: 1, name: 'Ali' }\n\n// Pretty print:\nJSON.stringify(data, null, 2);",
        prompt:
          "Save a complex object (with nested arrays) to localStorage using JSON.stringify, then retrieve and parse it back.",
        resources: [
          {
            label: "MDN: JSON",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
          },
          {
            label: "javascript.info: JSON",
            url: "https://javascript.info/json",
          },
        ],
      },
      {
        title: "Promise.all",
        desc: "Parallel execution.",
        explanation:
          "Run multiple promises simultaneously and wait for ALL to complete. Returns an array of results in the same order. If ANY promise rejects, the entire Promise.all rejects (fast-fail). Much faster than awaiting sequentially when requests are independent.",
        code: "const [users, posts, comments] = await Promise.all([\n  fetch('/api/users').then(r => r.json()),\n  fetch('/api/posts').then(r => r.json()),\n  fetch('/api/comments').then(r => r.json())\n]);",
        prompt:
          "Fetch user profile and user posts simultaneously using Promise.all. Measure the time vs fetching them sequentially.",
        resources: [
          {
            label: "MDN: Promise.all",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
          },
          {
            label: "javascript.info: Promise.all",
            url: "https://javascript.info/promise-api#promise-all",
          },
        ],
      },
      {
        title: "Promise Combinators",
        desc: "race, allSettled, any.",
        explanation:
          "Promise.race(): resolves/rejects with the FIRST promise to settle (useful for timeouts). Promise.allSettled(): waits for ALL promises and returns status of each — never rejects (great for batch operations). Promise.any(): resolves with the FIRST fulfilled promise, ignores rejections (useful for redundant sources).",
        code: "// Timeout pattern with race\nconst result = await Promise.race([\n  fetch('/api/data'),\n  new Promise((_, reject) =>\n    setTimeout(() => reject('Timeout!'), 5000)\n  )\n]);\n\n// Never fails — get status of all\nconst results = await Promise.allSettled([\n  fetch('/api/a'), fetch('/api/b'), fetch('/api/c')\n]);\n// [{status:'fulfilled', value:...}, {status:'rejected', reason:...}]",
        prompt:
          "Implement a fetch with a 3-second timeout using Promise.race. If the timeout wins, show an error message.",
        resources: [
          {
            label: "MDN: Promise.race",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race",
          },
          {
            label: "MDN: Promise.allSettled",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled",
          },
        ],
      },
      {
        title: "AbortController",
        desc: "Cancel fetch requests.",
        explanation:
          "AbortController lets you cancel in-progress fetch requests. Create a controller, pass its signal to fetch, and call controller.abort() to cancel. Essential for: cancelling outdated search requests (user types faster than API responds), cleanup on component unmount in SPAs, and implementing timeouts. The abort reason appears in the catch block.",
        code: "const controller = new AbortController();\n\ntry {\n  const res = await fetch('/api/search?q=hello', {\n    signal: controller.signal\n  });\n  const data = await res.json();\n} catch (err) {\n  if (err.name === 'AbortError') {\n    console.log('Request was cancelled');\n  }\n}\n\n// Cancel it:\ncontroller.abort();",
        prompt:
          "Build a search input that cancels the previous fetch request when the user types a new character. Use AbortController with debounce.",
        resources: [
          {
            label: "MDN: AbortController",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          },
          {
            label: "javascript.info: Fetch Abort",
            url: "https://javascript.info/fetch-abort",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 8: Under the Hood",
    description: "Deep dive into execution context, memory, and the engine.",
    items: [
      {
        title: "Call Stack",
        desc: "LIFO Execution.",
        explanation:
          "JavaScript records where in the program we are using a stack data structure (LIFO — Last In, First Out). When a function is called, it's pushed onto the stack. When it returns, it's popped off. If the stack gets too deep (infinite recursion), you get 'Maximum call stack size exceeded'. Use console.trace() to see the current stack.",
        code: "function a() { b(); }\nfunction b() { c(); }\nfunction c() { console.trace(); }\na();\n// Shows: c → b → a → (anonymous)",
        prompt:
          "Write three functions that call each other. Use console.trace() in the deepest one to visualize the stack.",
        resources: [
          {
            label: "MDN: Call Stack",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Call_stack",
          },
          {
            label: "javascript.info: Execution Context",
            url: "https://javascript.info/recursion#execution-context-and-stack",
          },
        ],
      },
      {
        title: "Hoisting",
        desc: "Variable lifting.",
        explanation:
          "During compilation, JS moves declarations (not assignments) to the top of their scope. var declarations are hoisted and initialized to undefined. let/const are hoisted but NOT initialized — accessing them before declaration causes a ReferenceError (Temporal Dead Zone). Function declarations are fully hoisted (you can call them before they appear in code).",
        code: "console.log(x); // undefined (var hoisted)\nvar x = 5;\n\nconsole.log(y); // ReferenceError! (TDZ)\nlet y = 10;\n\nsayHi(); // Works! (function declaration hoisted)\nfunction sayHi() { console.log('Hi'); }",
        prompt:
          "Predict the output of code that mixes var, let, and function declarations at different positions. Verify your predictions.",
        resources: [
          {
            label: "MDN: Hoisting",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
          },
          { label: "javascript.info: var", url: "https://javascript.info/var" },
        ],
      },
      {
        title: "Closures",
        desc: "Functions remember their scope.",
        explanation:
          "A function retains access to variables from its outer (enclosing) scope, even after the outer function has finished executing. This 'backpack' of remembered variables is a closure. Used for: data privacy, factory functions, memoization, and maintaining state in callbacks. This is one of the most powerful and tested concepts in JS interviews.",
        code: "function makeCounter() {\n  let count = 0;\n  return {\n    increment: () => ++count,\n    getCount: () => count\n  };\n}\nconst counter = makeCounter();\ncounter.increment(); // 1\ncounter.increment(); // 2\ncounter.getCount();  // 2\n// 'count' is private — no direct access",
        prompt:
          "Create a function createMultiplier(factor) that returns a function which multiplies any number by that factor. Make multipliers for 2, 3, and 5.",
        resources: [
          {
            label: "MDN: Closures",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
          },
          {
            label: "javascript.info: Closures",
            url: "https://javascript.info/closure",
          },
        ],
      },
      {
        title: "Scope Chain",
        desc: "Variable lookup path.",
        explanation:
          "When JS encounters a variable, it looks up the scope chain: local scope → outer function scope → ... → global scope. If not found anywhere, it throws ReferenceError. Each function creates a new scope. Understanding this chain explains why closures work and why inner functions can access outer variables but not vice versa.",
        code: "const global = 'I am global';\n\nfunction outer() {\n  const outerVar = 'I am outer';\n  \n  function inner() {\n    const innerVar = 'I am inner';\n    console.log(innerVar);  // found locally\n    console.log(outerVar);  // found in outer scope\n    console.log(global);    // found in global scope\n  }\n  inner();\n}\nouter();",
        prompt:
          "Create 3 nested functions. In the innermost, access a variable from each level. Then try to access an inner variable from an outer function — observe the error.",
        resources: [
          {
            label: "javascript.info: Variable Scope",
            url: "https://javascript.info/closure#lexical-environment",
          },
          {
            label: "MDN: Scope",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope",
          },
        ],
      },
      {
        title: "Event Loop",
        desc: "The async engine.",
        explanation:
          "The mechanism that coordinates sync code, microtasks (Promises, queueMicrotask), and macrotasks (setTimeout, setInterval, I/O). Order: (1) Run all sync code, (2) Run ALL microtasks, (3) Run ONE macrotask, (4) Repeat. This is why Promise.then() runs before setTimeout(..., 0) even though both are async.",
        code: "console.log('1 - sync');\n\nsetTimeout(() => console.log('2 - macrotask'), 0);\n\nPromise.resolve().then(() => console.log('3 - microtask'));\n\nconsole.log('4 - sync');\n// Output: 1, 4, 3, 2",
        prompt:
          "Write code that uses console.log, setTimeout, Promise.resolve().then(), and queueMicrotask(). Predict the output order, then verify.",
        resources: [
          {
            label: "Video: Event Loop (Philip Roberts)",
            url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
          },
          {
            label: "javascript.info: Event Loop",
            url: "https://javascript.info/event-loop",
          },
        ],
      },
      {
        title: "Reference vs Value",
        desc: "Memory and copying.",
        explanation:
          "Primitives (string, number, boolean) are copied by value — changing the copy doesn't affect the original. Objects (including arrays, functions) are passed by reference — the variable holds a pointer to the same memory location. Assigning an object to another variable creates a second pointer to the SAME object, not a copy.",
        code: "// By Value (Primitives)\nlet a = 5;\nlet b = a;\nb = 10;\nconsole.log(a); // 5 (unchanged)\n\n// By Reference (Objects)\nlet obj1 = { x: 1 };\nlet obj2 = obj1;\nobj2.x = 99;\nconsole.log(obj1.x); // 99 (CHANGED!)",
        prompt:
          "Create a function that takes an object and accidentally mutates it. Then fix it by spreading the object first to create a copy.",
        resources: [
          {
            label: "javascript.info: Object Copy",
            url: "https://javascript.info/object-copy",
          },
          {
            label: "MDN: Structured Clone",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/structuredClone",
          },
        ],
      },
      {
        title: "Prototypal Inheritance",
        desc: "The real mechanism behind classes.",
        explanation:
          "Every JS object has a hidden [[Prototype]] link to another object. When you access a property that doesn't exist on an object, JS looks up the prototype chain (similar to scope chain but for properties). Classes are syntactic sugar over this system. Object.create(proto) creates an object with the specified prototype. Understanding this explains how methods like .toString() work on every object.",
        code: "const animal = {\n  speak() { console.log(`${this.name} speaks`); }\n};\nconst dog = Object.create(animal);\ndog.name = 'Rex';\ndog.speak(); // 'Rex speaks' (found on prototype)\n\n// Check the chain:\nconsole.log(dog.__proto__ === animal); // true\nconsole.log(Object.getPrototypeOf(dog)); // animal",
        prompt:
          "Create a prototype chain: vehicle → car → electricCar. Add a method to each level and call them all from electricCar.",
        resources: [
          {
            label: "MDN: Inheritance and the Prototype Chain",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain",
          },
          {
            label: "javascript.info: Prototypal Inheritance",
            url: "https://javascript.info/prototype-inheritance",
          },
        ],
      },
      {
        title: "Strict Mode",
        desc: "'use strict' — safer JavaScript.",
        explanation:
          "Opt-in to a restricted variant of JS that catches common mistakes. Add 'use strict'; at the top of a file or function. Effects: (1) prevents accidental globals (assigning undeclared variables throws an error), (2) makes 'this' undefined in standalone functions instead of window, (3) forbids duplicate parameter names, (4) prevents deleting variables. ES modules and classes are strict mode by default.",
        code: "'use strict';\n\nx = 10; // ReferenceError! (no accidental globals)\n\nfunction test() {\n  console.log(this); // undefined (not window)\n}\n\n// function bad(a, a) {} // SyntaxError! (duplicate params)\n\n// In modules: strict mode is automatic\n// import/export files are always strict",
        prompt:
          "Write a script without 'use strict' that accidentally creates a global variable. Then add strict mode and observe the error.",
        resources: [
          {
            label: "MDN: Strict Mode",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          },
          {
            label: "javascript.info: Strict Mode",
            url: "https://javascript.info/strict-mode",
          },
        ],
      },
      {
        title: "Proxy & Reflect",
        desc: "Meta-programming objects.",
        explanation:
          "Proxy wraps an object and intercepts operations (get, set, delete, has, etc.) — letting you define custom behavior. Reflect provides default implementations for the same operations. Use cases: validation, logging, reactivity systems (Vue.js 3 uses Proxy for its reactivity), API wrappers, and observables. This is an advanced concept but important for understanding modern frameworks.",
        code: "const user = { name: 'Ali', age: 25 };\n\nconst proxy = new Proxy(user, {\n  get(target, prop) {\n    console.log(`Reading ${prop}`);\n    return Reflect.get(target, prop);\n  },\n  set(target, prop, value) {\n    if (prop === 'age' && value < 0) {\n      throw new Error('Age must be positive');\n    }\n    return Reflect.set(target, prop, value);\n  }\n});\n\nproxy.name;     // logs: 'Reading name' → 'Ali'\nproxy.age = -1; // throws Error!",
        prompt:
          "Create a Proxy that logs every property read and write. Then create a Proxy that makes an object read-only — any set operation throws an error.",
        resources: [
          {
            label: "MDN: Proxy",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy",
          },
          {
            label: "javascript.info: Proxy",
            url: "https://javascript.info/proxy",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 9: OOP",
    description: "Object Oriented Programming patterns in JavaScript.",
    items: [
      {
        title: "Classes",
        desc: "Blueprints for objects.",
        explanation:
          "Syntactic sugar over prototypes — a clean, familiar syntax for creating object templates. The constructor() method initializes properties. Methods defined in the class body are added to the prototype (shared across instances, memory-efficient). Classes are NOT hoisted — you must define them before use.",
        code: "class User {\n  constructor(name, email) {\n    this.name = name;\n    this.email = email;\n  }\n  greet() {\n    return `Hi, I'm ${this.name}`;\n  }\n}\nconst user = new User('Ali', 'ali@mail.com');",
        prompt:
          "Create a 'Product' class with name, price, and quantity. Add methods: getTotalValue(), applyDiscount(percent), and toString().",
        resources: [
          {
            label: "MDN: Classes",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
          },
          {
            label: "javascript.info: Classes",
            url: "https://javascript.info/class",
          },
        ],
      },
      {
        title: "Inheritance",
        desc: "extends / super.",
        explanation:
          "Create specialized classes based on generic ones. 'extends' sets up the prototype chain. 'super()' in the constructor calls the parent's constructor (MUST be called before using 'this'). 'super.method()' calls a parent method. Don't inherit more than 2-3 levels deep — prefer composition for complex hierarchies.",
        code: "class Admin extends User {\n  constructor(name, email, level) {\n    super(name, email); // MUST call super first\n    this.level = level;\n  }\n  promote() {\n    this.level++;\n  }\n}",
        prompt:
          "Create an Animal class, then extend it with Dog and Cat classes. Each should override a speak() method. Test with polymorphism.",
        resources: [
          {
            label: "MDN: extends",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends",
          },
          {
            label: "javascript.info: Class Inheritance",
            url: "https://javascript.info/class-inheritance",
          },
        ],
      },
      {
        title: "Static Methods",
        desc: "Methods on the class itself.",
        explanation:
          "Functions that belong to the class, not instances. Called as ClassName.method(), not instance.method(). Use for: factory methods, utility helpers, and operations that don't need instance data. Similar to C# static methods. Example: Array.isArray(), Object.keys(), JSON.parse().",
        code: "class MathUtils {\n  static add(a, b) { return a + b; }\n  static random(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  }\n}\nMathUtils.add(1, 2); // 3\n// new MathUtils().add() — ERROR",
        prompt:
          "Create a 'Validator' class with static methods: isEmail(str), isStrongPassword(str), and isURL(str).",
        resources: [
          {
            label: "MDN: static",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static",
          },
          {
            label: "javascript.info: Static Methods",
            url: "https://javascript.info/static-properties-methods",
          },
        ],
      },
      {
        title: "Getters / Setters",
        desc: "Smart properties.",
        explanation:
          "Run code when reading (get) or writing (set) a property. From the outside, they look like regular properties, but internally they are function calls. Use getters for computed values. Use setters for validation. Don't make getters expensive (no API calls) — they should feel instant.",
        code: "class User {\n  constructor(first, last) {\n    this.first = first;\n    this.last = last;\n  }\n  get fullName() {\n    return `${this.first} ${this.last}`;\n  }\n  set age(val) {\n    if (val < 0) throw new Error('Age must be positive');\n    this._age = val;\n  }\n}",
        prompt:
          "Create a Temperature class with value in Celsius. Add a getter 'fahrenheit' that converts, and a setter 'fahrenheit' that converts back.",
        resources: [
          {
            label: "MDN: get",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get",
          },
          {
            label: "javascript.info: Getters/Setters",
            url: "https://javascript.info/property-accessors",
          },
        ],
      },
      {
        title: "Private Fields (#)",
        desc: "True encapsulation.",
        explanation:
          "Fields prefixed with # are truly private — cannot be accessed or modified from outside the class. Not even subclasses can access them. This is real encapsulation (unlike the _convention which is just a naming hint). Available in modern JS (ES2022). Also supports private methods: #privateMethod() {}.",
        code: "class BankAccount {\n  #balance = 0;  // truly private\n  \n  deposit(amount) {\n    if (amount <= 0) throw new Error('Invalid');\n    this.#balance += amount;\n  }\n  get balance() {\n    return this.#balance;\n  }\n}\nconst acc = new BankAccount();\nacc.deposit(100);\nacc.balance;    // 100 (via getter)\nacc.#balance;   // SyntaxError! Private",
        prompt:
          "Build a 'PasswordManager' class with a private #passwords Map. Add methods: store(site, password), retrieve(site), and list() (shows sites only, not passwords).",
        resources: [
          {
            label: "MDN: Private Fields",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties",
          },
          {
            label: "javascript.info: Private Fields",
            url: "https://javascript.info/private-protected-properties-methods#private",
          },
        ],
      },
      {
        title: "Composition vs Inheritance",
        desc: "'Has-a' over 'Is-a'.",
        explanation:
          "Instead of deep inheritance chains (Dog extends Animal extends LivingThing), compose objects from smaller, focused pieces. 'A Car HAS an engine' (composition) is often better than 'ElectricCar IS a Car IS a Vehicle' (inheritance). Mixins and factory functions enable composition. Rule of thumb: inherit for clear 'is-a' relationships (max 2 levels), compose for everything else.",
        code: "// Composition with mixins\nconst canFly = (obj) => ({\n  ...obj,\n  fly() { console.log(`${obj.name} is flying`); }\n});\n\nconst canSwim = (obj) => ({\n  ...obj,\n  swim() { console.log(`${obj.name} is swimming`); }\n});\n\nconst duck = canSwim(canFly({ name: 'Donald' }));\nduck.fly();  // 'Donald is flying'\nduck.swim(); // 'Donald is swimming'",
        prompt:
          "Create a character builder using composition: combine abilities (canAttack, canHeal, canCast) to create Warrior, Healer, and Mage characters without inheritance.",
        resources: [
          {
            label: "Video: Composition vs Inheritance",
            url: "https://www.youtube.com/watch?v=wfMtDGfHWpA",
          },
          {
            label: "javascript.info: Mixins",
            url: "https://javascript.info/mixins",
          },
        ],
      },
      {
        title: "Design Patterns",
        desc: "Factory, Observer, Singleton.",
        explanation:
          "Reusable solutions to common software problems. Factory: a function that creates objects without 'new' (flexible, testable). Singleton: ensures only ONE instance exists (config, cache, DB connection). Observer: an object (subject) maintains a list of dependents (observers) and notifies them of changes (the pattern behind addEventListener and state management). Knowing these patterns elevates you from 'coder' to 'engineer'.",
        code: "// Factory Pattern\nfunction createUser(name, role) {\n  return {\n    name,\n    role,\n    greet() { return `Hi, I'm ${name}`; }\n  };\n}\n\n// Observer Pattern\nclass EventEmitter {\n  #listeners = {};\n  on(event, fn) {\n    (this.#listeners[event] ??= []).push(fn);\n  }\n  emit(event, data) {\n    (this.#listeners[event] ?? []).forEach(fn => fn(data));\n  }\n}\nconst bus = new EventEmitter();\nbus.on('login', user => console.log(`${user} logged in`));\nbus.emit('login', 'Ali');",
        prompt:
          "Implement all 3: (1) a Factory that creates User or Admin objects based on a role parameter, (2) a Singleton config manager, (3) an Observer (EventEmitter) with on, off, and emit methods.",
        resources: [
          {
            label: "Patterns.dev: Design Patterns",
            url: "https://www.patterns.dev/vanilla/factory-pattern",
          },
          {
            label: "javascript.info: Observer Pattern",
            url: "https://javascript.info/dispatch-events",
          },
        ],
      },
    ],
  },
  {
    title: "Stage 10: Tools & Storage",
    description: "Browser APIs, Modules, and essential developer tools.",
    items: [
      {
        title: "Modules",
        desc: "import / export.",
        explanation:
          "Split code into separate files for maintainability. Named exports: export { fn } / import { fn } from './file.js'. Default export: export default fn / import fn from './file.js'. Use type='module' in script tag. Modules are strict mode by default and have their own scope (no global pollution).",
        code: "// math.js\nexport const add = (a, b) => a + b;\nexport default function multiply(a, b) { return a * b; }\n\n// app.js\nimport multiply, { add } from './math.js';",
        prompt:
          "Split a monolithic file into 3 modules: data.js (constants), utils.js (helper functions), app.js (main logic). Wire them together with imports.",
        resources: [
          {
            label: "MDN: Modules",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
          },
          {
            label: "javascript.info: Modules",
            url: "https://javascript.info/modules-intro",
          },
        ],
      },
      {
        title: "LocalStorage",
        desc: "Persistent browser storage.",
        explanation:
          "Save key-value data in the browser that persists across sessions (survives refresh and browser close). Only stores strings — use JSON.stringify/parse for objects. ~5MB limit per origin. Synchronous API (blocks the thread) — don't store large data. There is no expiration — data stays until explicitly removed or user clears browser data.",
        code: "// Save\nlocalStorage.setItem('theme', 'dark');\nlocalStorage.setItem('user', JSON.stringify({ id: 1 }));\n\n// Read\nconst theme = localStorage.getItem('theme');\nconst user = JSON.parse(localStorage.getItem('user'));\n\n// Remove\nlocalStorage.removeItem('theme');\nlocalStorage.clear(); // remove ALL",
        prompt:
          "Build a theme toggle that saves the user's preference to localStorage and restores it on page reload.",
        resources: [
          {
            label: "MDN: LocalStorage",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
          },
          {
            label: "javascript.info: LocalStorage",
            url: "https://javascript.info/localstorage",
          },
        ],
      },
      {
        title: "sessionStorage",
        desc: "Per-tab temporary storage.",
        explanation:
          "Same API as localStorage (setItem, getItem, removeItem) but data is cleared when the tab is closed. Each tab gets its own isolated storage. Use for: temporary form data, wizard/multi-step processes, or anything that shouldn't persist after the browsing session ends.",
        code: "// Save per-tab data\nsessionStorage.setItem('step', '3');\nsessionStorage.setItem('formDraft', JSON.stringify(formData));\n\n// Read\nconst step = sessionStorage.getItem('step');\n\n// Gone when tab closes — no manual cleanup needed",
        prompt:
          "Build a multi-step form wizard that saves progress to sessionStorage. When the user returns to a step, restore their previous input.",
        resources: [
          {
            label: "MDN: sessionStorage",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage",
          },
          {
            label: "javascript.info: sessionStorage",
            url: "https://javascript.info/localstorage#sessionstorage",
          },
        ],
      },
      {
        title: "Dates",
        desc: "Date Object.",
        explanation:
          "Handling time is hard. The Date object provides basics: new Date() (now), new Date('2024-01-15') (specific date). Key methods: .getFullYear(), .getMonth() (0-indexed!), .getDate(), .getTime() (milliseconds since 1970), .toISOString(), .toLocaleDateString(). Pitfall: months are 0-indexed (January = 0). For serious date work, consider libraries like date-fns or Temporal (upcoming native API).",
        code: "const now = new Date();\nconsole.log(now.getFullYear()); // 2026\nconsole.log(now.getMonth());    // 0-11 (0 = January!)\nconsole.log(now.toISOString()); // '2026-02-13T...'\n\n// Difference in days\nconst diff = (new Date('2026-12-31') - now) / (1000*60*60*24);",
        prompt:
          "Write a function daysUntil(dateString) that returns the number of days between now and a future date. Handle past dates gracefully.",
        resources: [
          {
            label: "MDN: Date",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
          },
          {
            label: "javascript.info: Date",
            url: "https://javascript.info/date",
          },
        ],
      },
      {
        title: "Math Lib",
        desc: "Built-in math utilities.",
        explanation:
          "Static methods on the Math object — no need to instantiate. Key methods: Math.random() (0 to <1), Math.floor/ceil/round, Math.max/min(...values), Math.abs(), Math.sqrt(), Math.pow(base, exp), Math.trunc() (removes decimal). Random integer in range: Math.floor(Math.random() * (max - min + 1)) + min.",
        code: "Math.floor(Math.random() * 10) + 1; // 1-10\nMath.max(5, 10, 3);  // 10\nMath.min(5, 10, 3);  // 3\nMath.abs(-42);       // 42\nMath.round(3.7);     // 4\nMath.trunc(3.7);     // 3",
        prompt:
          "Write a function randomColor() that generates a random hex color string like '#3a7bf2'. Use Math.random and .toString(16).",
        resources: [
          {
            label: "MDN: Math",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math",
          },
          {
            label: "javascript.info: Number Methods",
            url: "https://javascript.info/number",
          },
        ],
      },
      {
        title: "Regular Expressions",
        desc: "Pattern matching.",
        explanation:
          "Powerful text search patterns. Create with /pattern/flags or new RegExp(). Key flags: g (global — find all), i (case-insensitive), m (multiline). Key methods: regex.test(str) returns boolean, str.match(regex) returns matches, str.replace(regex, replacement). Use online tools like regex101.com to build and test patterns.",
        code: "const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\nemailRegex.test('test@email.com'); // true\n\nconst nums = 'abc123def456'.match(/\\d+/g);\n// ['123', '456']\n\n'Hello World'.replace(/world/i, 'JS');\n// 'Hello JS'",
        prompt:
          "Write regex patterns to: (1) validate a phone number, (2) extract all hashtags from a tweet, (3) replace multiple spaces with a single space.",
        resources: [
          {
            label: "MDN: Regular Expressions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
          },
          { label: "Interactive: Regex101", url: "https://regex101.com/" },
        ],
      },
      {
        title: "Error Types",
        desc: "TypeError, ReferenceError, SyntaxError.",
        explanation:
          "Reading error messages is a critical skill. TypeError: wrong type used (calling non-function, accessing property of undefined). ReferenceError: variable doesn't exist in any scope. SyntaxError: code structure is invalid (missing bracket, illegal token). RangeError: value out of range (infinite recursion). Know these by name to debug faster.",
        code: "// TypeError\nnull.toString(); // Cannot read properties of null\nundefined();     // undefined is not a function\n\n// ReferenceError\nconsole.log(x);  // x is not defined\n\n// SyntaxError (caught at parse time)\n// const obj = { , }; // Unexpected token\n\n// RangeError\nnew Array(-1); // Invalid array length",
        prompt:
          "Write code that intentionally triggers each error type (TypeError, ReferenceError, RangeError). Catch each with try/catch and log the error.constructor.name.",
        resources: [
          {
            label: "MDN: Error Types",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#error_types",
          },
          {
            label: "javascript.info: Custom Errors",
            url: "https://javascript.info/custom-errors",
          },
        ],
      },
      {
        title: "Debugger & Breakpoints",
        desc: "Professional debugging workflow.",
        explanation:
          "The 'debugger;' keyword pauses execution and opens DevTools at that line. Breakpoints in DevTools Sources panel do the same without code changes. Step through code line-by-line (F10), step into functions (F11), step out (Shift+F11). Watch expressions let you monitor variables. Conditional breakpoints only pause when a condition is true. This is 10x faster than console.log debugging.",
        code: "function processOrder(order) {\n  debugger; // Pauses here when DevTools is open\n  const total = order.items.reduce((s, i) => s + i.price, 0);\n  const tax = total * 0.14;\n  return { total, tax, grand: total + tax };\n}",
        prompt:
          "Set a breakpoint inside a loop. Use the Watch panel to monitor a variable. Use the Call Stack panel to see which function called the current one.",
        resources: [
          {
            label: "Chrome: Debugging Guide",
            url: "https://developer.chrome.com/docs/devtools/javascript/",
          },
          {
            label: "javascript.info: Debugging in Chrome",
            url: "https://javascript.info/debugging-chrome",
          },
        ],
      },
      {
        title: "structuredClone",
        desc: "Modern deep cloning.",
        explanation:
          "The built-in way to deep clone objects (ES2022). Handles nested objects, arrays, Maps, Sets, Dates, and RegExp correctly. Replaces the old JSON.parse(JSON.stringify()) hack which fails on Dates, undefined, functions, and circular references. structuredClone also handles circular references. Limitation: cannot clone functions or DOM elements.",
        code: "const original = {\n  name: 'Ali',\n  scores: [10, 20],\n  meta: { created: new Date() }\n};\n\nconst clone = structuredClone(original);\nclone.scores.push(30);\nclone.meta.created.setFullYear(2000);\n\nconsole.log(original.scores);       // [10, 20] (unchanged!)\nconsole.log(original.meta.created);  // still 2026",
        prompt:
          "Clone a complex nested object using both JSON.parse(JSON.stringify()) and structuredClone(). Include a Date property and compare the results — observe how JSON approach breaks the Date.",
        resources: [
          {
            label: "MDN: structuredClone",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/structuredClone",
          },
          {
            label: "javascript.info: structuredClone",
            url: "https://javascript.info/object-copy#structuredclone",
          },
        ],
      },
      {
        title: "The BOM",
        desc: "Browser Object Model.",
        explanation:
          "The window object is the global context in browsers. It gives access to the browser environment beyond the document: window.location (URL manipulation), window.history (back/forward navigation), window.navigator (browser info), window.innerWidth/Height (viewport size), window.scrollTo() (scroll control). These APIs are not available in Node.js.",
        code: "// URL info\nconsole.log(location.href);     // full URL\nconsole.log(location.hostname); // domain\n\n// Navigation\nhistory.back();  // go back\nhistory.pushState({}, '', '/new-page'); // change URL without reload\n\n// Window\nconsole.log(window.innerWidth);\nwindow.scrollTo({ top: 0, behavior: 'smooth' });",
        prompt:
          "Build a function that reads the current URL search params (?key=value), modifies one, and updates the URL without reloading using history.pushState.",
        resources: [
          {
            label: "javascript.info: BOM",
            url: "https://javascript.info/browser-environment",
          },
          {
            label: "MDN: Window",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Window",
          },
        ],
      },
    ],
  },
];
