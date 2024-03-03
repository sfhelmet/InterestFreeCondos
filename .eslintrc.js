module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      files: ["**/*.js"], // Match all JavaScript files
      excludedFiles: ["build/**/*.js"], // Exclude files in the build directory
      rules: {
        // Disable ESLint rules for npm run build command
        // You can add specific rules to disable here
        // For example, to disable all rules:
        "no-alert": "off",
        "no-console": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // Your ESLint rules here
  },
};
