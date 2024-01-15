module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:react-hooks/recommended",
      "plugin:react/jsx-runtime",
   ],
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      project: true, // Specify it only for TypeScript files
      tsconfigRootDir: __dirname,
   },
   plugins: ["react-refresh", "@typescript-eslint"],
   overrides: [
      {
         files: ["./**/*.{ts,tsx}"],
         extends: ["plugin:@typescript-eslint/disable-type-checked"],
      },
   ],
   rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
   },
}
