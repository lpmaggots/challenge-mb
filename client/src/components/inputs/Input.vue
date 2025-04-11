<script setup>
  import { ref, computed } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
  
  const props = defineProps({
    modelValue: [String, Number],
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    maxLenght: {
      type: Number,
      default: null
    },
    error: {
      type: String,
      default: null
    }
  })
  
  const emit = defineEmits(['update:modelValue'])

  const inputType = computed(() => {
    if (props.type !== 'password') return props.type
    return isPasswordVisible.value ? 'text' : 'password'
  })

  const isPasswordVisible = ref(false)
  const icon = computed(() => isPasswordVisible.value ? faEye : faEyeSlash)

  const viewPassword = () => {
    if (props.type === 'password') {
      isPasswordVisible.value = !isPasswordVisible.value
    }
  }
</script>

<template>
  <div class="mb-md">
    <label>
      {{ label }}
      <input
        :type="inputType"
        :value="modelValue"
        :maxlength="maxLenght ? maxLenght : null"
        :class="props.error && props.error.length > 0 ? 'input-error' : ''"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
      />
      <FontAwesomeIcon
        v-if="props.type === 'password'"
        @click="viewPassword"
        :icon="icon"
        class="spy-button"
      />
    </label>
    <small v-if="props.error && props.error.length > 0" class="text-error">{{ props.error }}</small>
  </div>
</template>
