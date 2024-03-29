import type { Ref } from 'vue'

/* 返回一个focus方法，该元素如果有 focus 方法则聚焦 */
export const useFocus = (
  el: Ref<{
    focus: () => void
  } | null>
) => {
  return {
    focus: () => {
      el.value?.focus?.()
    },
  }
}
