<script setup>
  import { ref, reactive, computed, watch, provide } from 'vue'
  // components
  import Alert from '@/components/shared/Alert.vue'
  import {
    TypeForm,
    IndividualForm,
    CompanyForm,
    PasswordForm,
    ReviewForm
  } from '@/components/forms'

  let alertConfig = reactive({
    show: null,
    type: null,
    description: null,
  })

  let typeData = ref('')
  provide('typeData', typeData)

  watch(typeData, (newVal, oldVal) => {
    const preserved = {
      email: formData.email,
      type: formData.type,
    }

    Object.keys(formData).forEach((key) => {
      formData[key] = preserved[key] ?? ''
    })
  })

  let stepState = reactive({
    current: 1,
    title: '',
    total: 4
  })
  provide('stepState', stepState)

  const formData = reactive({
    type: typeData,
    email: '',
    name: '',
    company_name: '',
    cpf: '',
    cnpj: '',
    date_birth: '',
    date_opening: '',
    phone: '',
    password: '',
    confirm_password: ''
  })
  provide('formData', formData)
  
  const currentComponent = computed(() => {
    switch (stepState.current) {
      case 1:
        stepState.title = 'Seja bem vindo(a)'
        return TypeForm
      case 2:
        if(typeData.value == 'individual') {
          stepState.title = 'Pessoa Física'
          return IndividualForm
        }else {
          stepState.title = 'Pessoa Jurídica'
          return CompanyForm
        }
      case 3:
        stepState.title = 'Senha de acesso'
        return PasswordForm
      default:
        stepState.title = 'Revise suas informações'
        return ReviewForm
    }
  })

  const clearAlertConfig = () => {
    Object.keys(alertConfig).forEach((key) => {
      alertConfig[key] = null
    })
  }

  const returnInitialState = () => {
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
    stepState.current = 1
  }

  const prev = () => {
    if(stepState.current > 1) stepState.current --
  }
  provide('prevStep', prev)

  const next = () => {
    if(stepState.current == stepState.total) {
      submit()
    }else {
      if(stepState.current < stepState.total) stepState.current ++
    }
  }
  provide('nextStep', next)
  
  const submit = () => {
    const cleanRegex = /\D/g
    const cleanedData = {
      ...formData,
      type: typeData.value,
      cpf: formData.cpf ? formData.cpf.replace(cleanRegex, '') : '',
      cnpj: formData.cnpj ? formData.cnpj.replace(cleanRegex, '') : '',
      phone: formData.phone ? formData.phone.replace(cleanRegex, '') : ''
    }

    fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cleanedData)
    })
    .then(res => res.json())
    .then(data => {
      alertConfig.show = true
      alertConfig.description = data.message
      alertConfig.type = 'success'
      returnInitialState()
    })
    .catch(err => {
      console.error('Erro ao enviar cadastro:', err)
    })
  }
</script>

<template>
  <component
    :is="currentComponent"
  ></component>
  <Alert
    :config="alertConfig"
    @clear="clearAlertConfig"
  />
</template>