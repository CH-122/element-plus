import { computed, getCurrentInstance } from 'vue'
import { fromPairs } from 'lodash-unified'
import { debugWarn } from '@element-plus/utils'

import type { ComputedRef } from 'vue'

interface Params {
  excludeListeners?: boolean // 排除监听属性 /^on[A-z]/
  excludeKeys?: ComputedRef<string[]>
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
const LISTENER_PREFIX = /^on[A-Z]/

export const useAttrs = (
  params: Params = {}
): ComputedRef<Record<string, unknown>> => {
  const { excludeListeners = false, excludeKeys } = params
  const allExcludeKeys = computed<string[]>(() => {
    return (excludeKeys?.value || []).concat(DEFAULT_EXCLUDE_KEYS)
  })

  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn(
      'use-attrs',
      'getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function'
    )
    return computed(() => ({}))
  }

  console.log(instance.proxy)

  return computed(() =>
    fromPairs(
      Object.entries(instance.proxy?.$attrs!).filter(
        ([key]) =>
          !allExcludeKeys.value.includes(key) &&
          !(excludeListeners && LISTENER_PREFIX.test(key))
      )
    )
  )
}
