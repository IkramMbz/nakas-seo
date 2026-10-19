import oxlint from "eslint-plugin-oxlint";

export default [
    {
        ignores: ["dist/**", "node_modules/**", "src/env.d.ts"]
    },
    ...oxlint.configs["flat/eslint"],
    ...oxlint.configs["flat/typescript"],
    ...oxlint.configs["flat/unicorn"],
    ...oxlint.configs["flat/import"],
    ...oxlint.configs["flat/react"]
];
