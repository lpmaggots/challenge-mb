<script setup>
  import { inject } from 'vue'

  let type = inject('typeData')

  const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    error: {
      type: String,
      default: null
    }
  })
</script>

<template>
  <div class="mb-md">
    <div class="radio-group">
      <label
        v-for="option in options"
        :key="option.value"
        class="radio-option"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          v-model="type"
          @change="$emit('change')"
        />
        {{ option.label }}
      </label>
    </div>
    <small v-if="props.error && props.error.length" class="text-error">{{ props.error }}</small>
  </div>
</template>
