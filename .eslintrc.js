module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: "airbnb",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    "cy": true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
    "react",
    "react-hooks"
  ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "one-var": [
      "error",
      { var: "consecutive", let: "consecutive", const: "consecutive" }
    ],
    indent: [
      "error",
      2,
      { VariableDeclarator: { var: 2, let: 2, const: 3 }, SwitchCase: 1 }
    ],
    "jsx-a11y/label-has-for": 0
  }
};
