/**
 * Mock for Webpack require() of assets
 * This helps Vitest handle require('~/assets/...') in Vue components
 */

// Create a Proxy that returns a stub for any asset path
const assetMock = new Proxy(
  {},
  {
    get: (_target, prop) => {
      if (prop === 'default' || prop === '__esModule') {
        return 'test-file-stub'
      }
      return 'test-file-stub'
    }
  }
)

export default assetMock
