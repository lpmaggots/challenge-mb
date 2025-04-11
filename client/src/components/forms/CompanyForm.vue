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
  <StepHeader v-if="!props.reviewMode" />
  <section class="container-input">
    <Input
      label="Razão social"
      v-model="formData.company_name"
      :error="!reviewMode ? errors.company_name : receivedErrors.company_name"
      @blur="markAsTouched('company_name')"
    />
    <Input
      label="CNPJ"
      :max-lenght="18"
      v-model="formData.cnpj"
      :error="!reviewMode ? errors.cnpj : receivedErrors.cnpj"
      @blur="markAsTouched('cnpj')"
    />
    <Input
      type="date"
      label="Data de abertura"
      v-model="formData.date_opening"
      :error="!reviewMode ? errors.date_opening : receivedErrors.date_opening"
      @blur="markAsTouched('date_opening')"
    />
    <Input
      type="tel"
      :max-lenght="15"
      label="Telefone / Celular"
      v-model="formData.phone"
      :error="!reviewMode ? errors.phone : receivedErrors.phone"
      @blur="markAsTouched('phone')"
    />
  </section>
  <StepButtons
    v-if="!props.reviewMode"
    :is-valid="isValid"
  />
</template>