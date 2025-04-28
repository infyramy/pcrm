<script lang="ts" setup>
import { DrawerRoot } from 'vaul-vue'

interface Props {
  open?: boolean
  shouldScaleBackground?: boolean
  snapPoints?: number[]
  activeSnapPoint?: number
  modal?: boolean
  nested?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shouldScaleBackground: true,
})

type Emits = {
  (e: 'openChange', value: boolean): void
  (e: 'snapChange', value: number): void
}

const emits = defineEmits<Emits>()
</script>

<template>
  <DrawerRoot
    :open="props.open"
    :should-scale-background="props.shouldScaleBackground"
    :snap-points="props.snapPoints"
    :active-snap-point="props.activeSnapPoint"
    :modal="props.modal"
    :nested="props.nested"
    @update:open="(value: boolean) => emits('openChange', value)"
    @update:snap="(value: number) => emits('snapChange', value)"
  >
    <slot />
  </DrawerRoot>
</template>
