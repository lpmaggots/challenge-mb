<script setup>
  import { inject } from 'vue'

  const stepState = inject('stepState')
  const prev = inject('prevStep')
  const next = inject('nextStep')

  const props = defineProps({
    isValid: {
      type: Boolean
    }
  })
</script>

<template>
  <section class="container-button mt-lg">
    <button
      @click="prev"
      class="secondary"
      :class="stepState.current == 1 ? 'is-disabled' : ''"
    >
      Voltar
    </button>
    <button
      @click="next"
      :class="props.isValid ? '' : 'is-disabled'"
    >
      {{ stepState.current == stepState.total ? 'Cadastrar' : 'Continuar' }}
    </button>
  </section>
</template>

<style scoped lang="scss">
  .container-button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
</style>