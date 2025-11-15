/**
 * Vitest setup file
 * This file runs before all tests
 */

import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock Nuxt components and plugins
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn()
}

// Configure Vue Test Utils
config.stubs = {
  ...config.stubs,
  NuxtLink: {
    template: '<a><slot /></a>',
    props: ['to']
  }
}

// Mock Webpack require for assets
// This intercepts require('~/assets/...') calls
const originalRequire = typeof require !== 'undefined' ? require : undefined
if (originalRequire) {
  const Module = require('module')
  const originalResolveFilename = Module._resolveFilename

  Module._resolveFilename = function (request: string, ...args: any[]) {
    if (request.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)) {
      return '/test-file-stub.svg'
    }
    return originalResolveFilename.call(this, request, ...args)
  }
}
