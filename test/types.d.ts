/**
 * Type definitions for test files
 * This file helps TypeScript understand Vue Test Utils types
 */

import Vue from 'vue'
import { Wrapper as VueWrapper } from '@vue/test-utils'

// Re-export Wrapper with proper Vue 2 types
declare global {
  type Wrapper<V extends Vue = Vue> = VueWrapper<V>
}

export {}
