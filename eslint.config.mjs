// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Ваши кастомные правила
    'vue/no-v-html': 'off', // Отключаем правило для использования v-html
    '@typescript-eslint/no-unused-vars': 'warn', // Выводим предупреждение, если переменная не используется
    'import/extensions': [
      'error', 
      'never', // Заменили 'always' на 'never'
      {
        js: 'never', // Не требуем расширение для .js
        jsx: 'never', // Не требуем расширение для .jsx
        ts: 'never', // Не требуем расширение для .ts
        tsx: 'never', // Не требуем расширение для .tsx
        vue: 'never', // Не требуем расширение для .vue
      }
    ],
    'no-console': 'warn', // Предупреждаем о использовании console.log
  },
})
