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
      label="Nome completo"
      v-model="formData.name"
      :error="!reviewMode ? errors.name : receivedErrors.name"
      @blur="markAsTouched('name')"
    />
    <Input
      label="CPF"
      :max-lenght="14"
      v-model="formData.cpf"
      :error="!reviewMode ? errors.cpf : receivedErrors.cpf"
      @blur="markAsTouched('cpf')"
    />
    <Input
      type="date"
      label="Data de nascimento"
      v-model="formData.date_birth"
      :error="!reviewMode ? errors.date_birth : receivedErrors.date_birth"
      @blur="markAsTouched('date_birth')"
    />
    <Input
      type="tel"
      label="Telefone / Celular"
      :max-lenght="15"
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
