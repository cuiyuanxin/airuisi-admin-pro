module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
        '@unocss',
        '.eslintrc-auto-import.json'
    ],
    plugins: ["vue", "@typescript-eslint", "prettier"],
    rules: {
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
        'no-multiple-empty-lines': ['error', {max: 1}], // 不允许多个空行
        'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
        'prefer-const': 'off', // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
        'no-irregular-whitespace': 'off', // 禁止不规则的空白
        'vue/custom-event-name-casing': 'off', // 为自定义事件名称强制使用特定大小写

        '@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
        '@typescript-eslint/ban-ts-ignore': 'off', // 禁止使用 @ts-ignore
        '@typescript-eslint/explicit-function-return-type': 'off', // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式类型声明
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        '@typescript-eslint/no-var-requires': 'off', // 不允许在 import 语句中使用 require 语句
        '@typescript-eslint/no-empty-function': 'off', // 禁止空函数
        '@typescript-eslint/no-use-before-define': 'off', // 禁止在变量定义之前使用它们
        '@typescript-eslint/ban-ts-comment': 'off', // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
        '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
        '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
        '@typescript-eslint/explicit-module-boundary-types': 'off', // 要求导出函数和类的公共类方法的显式返回和参数类型
        '@typescript-eslint/no-unused-vars': [ // 禁止定义未使用的变量
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'no-unused-vars': [ //不能有声明后未被使用的变量或参数
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'space-before-function-paren': [0, 'always'],//函数定义时括号前面要不要有空格
        'vue/attributes-order': 'off', // vue api使用顺序，强制执行属性顺序
        'vue/one-component-per-file': 'off', // 强制每个组件都应该在自己的文件中
        'vue/html-closing-bracket-newline': 'off', // 在标签的右括号之前要求或禁止换行
        'vue/max-attributes-per-line': 'off', // 强制每行的最大属性数
        'vue/multiline-html-element-content-newline': 'off', // 在多行元素的内容之前和之后需要换行符
        'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容之前和之后需要换行符
        'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
        'vue/require-default-prop': 'off', // 此规则要求为每个 prop 为必填时，必须提供默认值
        'vue/script-setup-uses-vars': 'off', // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        // 要求使用 === 和 !==
        'eqeqeq': 'warn',
        // 禁止空格和 tab 的混合缩进
        'no-mixed-spaces-and-tabs': 'warn',
        'object-curly-spacing': ["error", "always"],
        'quotes': [
            2,
            'single',
            {
                'avoidEscape': true,
                'allowTemplateLiterals': true
            }
        ],
        'semi': [
            2,
            'never',
            {
                'beforeStatementContinuationChars': 'never'
            }
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 关闭驼峰命名规则
        'vue/multi-word-component-names': 0,
        '@unocss/blocklist': 'warn'
    },
}
