<script setup>
  import { inject } from 'vue'
  // components
  import StepHeader from '@/components/shared/StepHeader.vue'
  import StepButtons from '../shared/StepButtons.vue'
  import Input from '../inputs/Input.vue'
  import IndividualForm from '@/components/forms/IndividualForm.vue'
  import CompanyForm from '@/components/forms/CompanyForm.vue'
  import PasswordForm from '@/components/forms/PasswordForm.vue'
  // composables
  import { useFormValidation } from '@/composables/useFormValidation'

  const type = inject('typeData')
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
    <IndividualForm
      v-if="type == 'individual'"
      review-mode
      :received-errors="errors"
    />
    <CompanyForm
      v-else
      review-mode
      :received-errors="errors"
    />
    <PasswordForm
      review-mode
      :received-errors="errors"
    />
  </section>
  <StepButtons
    :is-valid="isValid"
  />
</template>