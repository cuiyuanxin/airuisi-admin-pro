/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // '@vue/eslint-config-typescript/recommended',
    // '@vue/eslint-config-prettier',
    'prettier',
    // unplugin-auto-import :: generated automatically
    './.eslintrc-auto-import.json',
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // all rules docs https://eslint.org/docs/rules/
    'prettier/prettier': ['error', { semi: false, singleQuote: true, printWidth: 120 }],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 'prettier/prettier': 'error',
    // 禁止出现console
    'no-console': 'warn',
    // 禁用debugger
    'no-debugger': 'warn',
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 'warn',
    // 禁止出现空语句块
    'no-empty': 'warn',
    // 禁止不必要的括号
    'no-extra-parens': 'off',
    // 禁止对 function 声明重新赋值
    'no-func-assign': 'warn',
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'warn',
    // 强制所有控制语句使用一致的括号风格
    curly: 'warn',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 强制尽可能地使用点号
    'dot-notation': 'warn',
    // 要求使用 === 和 !==
    eqeqeq: 'warn',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'warn',
    // 禁止出现空函数
    'no-empty-function': 'warn',
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁止多次声明同一变量
    'no-redeclare': 'warn',
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': 'warn',
    // 禁用不必要的 return await
    'no-return-await': 'warn',
    // 禁止自我赋值
    'no-self-assign': 'warn',
    // 禁止自身比较
    'no-self-compare': 'warn',
    // 禁止不必要的 catch 子句
    'no-useless-catch': 'warn',
    // 禁止多余的 return 语句
    'no-useless-return': 'warn',
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 'off',
    // 允许delete变量
    'no-delete-var': 'off',
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': 'warn',
    // 强制在代码块中使用一致的大括号风格
    'brace-style': 'warn',
    // 强制使用骆驼拼写法命名约定
    camelcase: 'warn',
    // 强制使用一致的缩进
    indent: 'off',
    // 强制可嵌套的块的最大深度4
    'max-depth': 'warn',
    // 强制函数块最多允许的的语句数量20
    'max-statements': ['warn', 100],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 3],
    // 强制函数定义中最多允许的参数数量
    'max-params': ['warn', 3],
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': ['warn', { max: 1 }],
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
    'no-lonely-if': 'warn', // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-mixed-spaces-and-tabs': 'warn', // 禁止空格和 tab 的混合缩进
    'no-multiple-empty-lines': 'warn', // 禁止出现多行空行
    semi: [
      2,
      'never',
      {
        beforeStatementContinuationChars: 'never',
      },
    ], // 禁止出现,要求或禁止使用分号代替 ASI
    'space-before-blocks': 'warn', // 强制在块之前使用一致的空格
    'space-in-parens': 'warn', // 强制在圆括号内使用一致的空格
    'space-infix-ops': 'warn', // 要求操作符周围有空格
    'space-unary-ops': 'warn', // 强制在一元操作符前后使用一致的空格
    'switch-colon-spacing': 'warn', // 强制在 switch 的冒号左右有空格
    'arrow-spacing': 'warn', // 强制箭头函数的箭头前后使用一致的空格
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'prefer-const': 'warn', // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-rest-params': 'warn', // 要求使用剩余参数而不是 arguments
    'no-useless-escape': 'warn', // 禁用不必要的转义字符
    'no-irregular-whitespace': 'warn', // 禁止不规则的空白
    'no-prototype-builtins': 'warn', // 禁止直接调用 Object.prototypes 的内置属性
    'no-fallthrough': 'warn', // 禁止 case 语句落空
    'no-extra-boolean-cast': 'warn', // 禁止不必要的布尔转换
    'no-case-declarations': 'warn', // 不允许在 case 子句中使用词法声明
    'no-async-promise-executor': 'warn', // 禁止使用异步函数作为 Promise executor
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
  },
  // globals: {
  //   defineProps: "readonly",
  //   defineEmits: "readonly",
  //   defineExpose: "readonly",
  //   withDefaults: "readonly",
  // },
}
