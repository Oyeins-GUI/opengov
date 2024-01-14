module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:react-hooks/recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
   ],
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      project: ["./tsconfig.json"], // Specify it only for TypeScript files
   },
   plugins: ["react-refresh"],
   rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
   },
}
