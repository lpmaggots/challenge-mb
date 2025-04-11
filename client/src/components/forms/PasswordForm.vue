<script setup>
  import { inject } from 'vue'
  // components
  import StepHeader from '@/components/shared/StepHeader.vue'
  import StepButtons from '../shared/StepButtons.vue'
  import Input from '../inputs/Input.vue'
  // composables
  import { useFormValidation } from '@/composables/useFormValidation'

  const props = defineProps({
    reviewMode: {
      type: Boolean,
      default: false
    },
    receivedErrors: {
      type: Object
    }
  })
  
  const formData = inject('formData')
  const { errors, isValid, markAsTouched } = useFormValidation(formData)
</script>
<template>
  <StepHeader v-if="!reviewMode" />
  <section class="container-input">
    <Input
      type="password"
      label="Sua senha"
      v-model="formData.password"
      :error="!reviewMode ? errors.password : receivedErrors.password"
      @blur="markAsTouched('password')"
    />
    <Input
      type="password"
      label="Confirmação de senha"
      v-model="formData.confirm_password"
      :error="!reviewMode ? errors.confirm_password : receivedErrors.confirm_password"
      @blur="markAsTouched('confirm_password')"
    />
  </section>
  <StepButtons
    v-if="!reviewMode"
    :is-valid="isValid"
  />
</template>