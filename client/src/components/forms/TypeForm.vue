<script setup>
  import { inject } from 'vue'
  // components
  import StepHeader from '@/components/shared/StepHeader.vue'
  import StepButtons from '../shared/StepButtons.vue'
  import Input from '../inputs/Input.vue'
  import Radio from '../inputs/Radio.vue'
  // composables
  import { useFormValidation } from '@/composables/useFormValidation'
 
  const radioOptions = [
    { label: 'Pessoa física', value: 'individual' },
    { label: 'Pessoa jurídica', value: 'company' }
  ]
  
  const formData = inject('formData')
  const { errors, isValid, markAsTouched } = useFormValidation(formData)
</script>
<template>
  <StepHeader />
  <section class="container-input">
    <Input
      type="email"
      label="Endereço de e-mail"
      v-model="formData.email"
      :error="errors.email"
      @blur="markAsTouched('email')"
    />
    <Radio
      name="type"
      :options="radioOptions"
      :error="errors.type"
      @change="markAsTouched('type')"
    />
  </section>
  <StepButtons
    :is-valid="isValid"
  />
</template>