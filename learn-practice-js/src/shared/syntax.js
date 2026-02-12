export const syntax = {
  // Simple Auto-Formatter
  format: (code) => {
    if (!code) return "";
    // 1. Remove existing indentation to start fresh
    const lines = code
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l);

    let indentLevel = 0;
    const indentSize = 2; // 2 spaces

    return lines
      .map((line) => {
        // Dedent closing braces
        if (line.startsWith("}") || line.startsWith("]"))
          indentLevel = Math.max(0, indentLevel - 1);

        const indent = " ".repeat(indentLevel * indentSize);
        const formatted = indent + line;

        // Indent opening braces
        if (line.endsWith("{") || line.endsWith("[")) indentLevel++;

        return formatted;
      })
      .join("\n");
  },

  highlight: (code) => {
    if (!code) return "";

    // Pre-format the code structure
    let html = syntax.format(code);

    // Global HTML Escape
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const tokens = {};
    let tokenIndex = 0;

    const storeToken = (content, type) => {
      const key = `__TOKEN_${tokenIndex++}__`;
      tokens[key] = `<span class="token ${type}">${content}</span>`;
      return key;
    };

    // --- STEP 1: Mask Strings, Comments, Entities first ---

    // 1. Strings
    html = html.replace(/(['"`])(.*?)\1/g, (match) => {
      if (match.includes("__TOKEN_")) return match; // Avoid double masking
      return storeToken(match, "string");
    });

    // 2. Comments
    html = html.replace(/(\/\/.*)/g, (match) => {
      if (match.includes("__TOKEN_")) return match;
      return storeToken(match, "comment");
    });

    // 3. HTML Entities
    html = html.replace(/(&lt;|&gt;|&amp;)/g, (match) => {
      return storeToken(match, "operator");
    });

    // --- STEP 2: Mask everything else (Keywords, Numbers, etc) ---
    // CRITICAL: Use storeToken for EVERYTHING to avoid regex identifying html attributes as operators.

    const keywords = [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "extends",
      "new",
      "this",
      "super",
      "import",
      "export",
      "default",
      "await",
      "async",
      "try",
      "catch",
    ];

    // Keywords
    const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
    html = html.replace(keywordRegex, (match) => storeToken(match, "keyword"));

    // Booleans
    html = html.replace(/\b(true|false|null|undefined)\b/g, (match) =>
      storeToken(match, "boolean"),
    );

    // Numbers
    html = html.replace(/\b(\d+)\b/g, (match) => storeToken(match, "number"));

    // Built-ins
    html = html.replace(
      /\b(console|document|window|Math|JSON|localStorage|fetch)\b/g,
      (match) => storeToken(match, "builtin"),
    );

    // Methods (.method())
    html = html.replace(
      /\.([a-zA-Z]\w*)\b(?=\()/g,
      (match, name) => `.${storeToken(name, "function")}`,
    );

    // Function Definitions
    html = html.replace(
      /\bfunction\s+([a-zA-Z]\w*)\b/g,
      (match, name) => `function ${storeToken(name, "function")}`,
    );

    // Operators
    html = html.replace(/(\+|\-|\*|\/|\%|\=|\!|\&|\||\?|\:|\.|,|;)/g, (match) =>
      storeToken(match, "operator"),
    );

    // Punctuation
    html = html.replace(/(\{|\}|\(|\)|\[|\])/g, (match) =>
      storeToken(match, "punctuation"),
    );

    // --- STEP 3: Restore Tokens ---
    Object.keys(tokens).forEach((key) => {
      html = html.replace(key, tokens[key]);
    });

    return html;
  },
};
