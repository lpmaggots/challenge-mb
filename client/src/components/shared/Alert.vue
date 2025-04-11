<script setup>
  import { computed, watch } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faCheck, faTriangleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

  const emit = defineEmits(['clear'])

  const props = defineProps({
    config: {
      type: Object,
      required: true
    }
  })

  const show = computed(() => props.config.show)
  const type = computed(() => props.config.type)
  const description = computed(() => props.config.description)

  const customClass = computed(() => {
    return `alert ${type.value}`
  })

  // Ícone baseado no tipo
  const icon = computed(() => {
    switch (type.value) {
      case 'success':
        return faCheck
      case 'warning':
        return faTriangleExclamation
      case 'error':
        return faCircleXmark
      default:
        return null
    }
  })

  watch(show, (val) => {
    if(val) {
      setTimeout(() => {
        emit('clear')
      }, 3000)
    }
  })
</script>

<template>
  <transition name="fade">
    <div v-if="show" :class="customClass">
      <FontAwesomeIcon :icon="icon" class="mr-sm" />
      <p>{{ description }}</p>
    </div>
  </transition>
</template>