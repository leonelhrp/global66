import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: ['**/__tests__/**/*.{test,spec}.{js,ts}', '**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', '.nuxt', 'dist'],
    server: {
      deps: {
        inline: ['vue', 'vue-template-compiler']
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'components/**/*.vue',
        'pages/**/*.vue',
        'api/**/*.ts',
        'utils/**/*.ts',
        'mixins/**/*.ts'
      ],
      exclude: ['components/**/__tests__/**', '**/*.spec.ts', '**/*.test.ts']
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})
