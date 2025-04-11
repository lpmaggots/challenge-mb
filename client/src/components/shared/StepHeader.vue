<script setup>
  import { inject } from 'vue'
  const stepState = inject('stepState')
</script>

<template>
  <header class="mb-lg">
    <h4 class="mb-sm">
      Etapa <span class="text-primary">{{ stepState.current }}</span> de {{ stepState.total }}
    </h4>
    <h2>{{ stepState.title }}</h2>
  </header>
</template>