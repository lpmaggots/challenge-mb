import { reactive, computed, watch, inject } from 'vue'

export function useFormValidation(formData) {
  const typeData = inject('typeData')
  const stepState = inject('stepState')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const touchedFields = reactive({})
  const markAsTouched = (field) => (touchedFields[field] = true)
  const isFieldTouched = (field) => !!touchedFields[field]

  // Masks
  const masks = {
    cpf(val) {
      const digits = val.replace(/\D/g, '').slice(0, 11)
      return digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    },
    cnpj(val) {
      const digits = val.replace(/\D/g, '').slice(0, 14)
      return digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
    },
    phone(val) {
      const digits = val.replace(/\D/g, '').slice(0, 11)
      return digits.length <= 10
        ? digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
        : digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    },
  }

  // Apply masks
  watch(() => formData.cpf, val => formData.cpf = masks.cpf(val))
  watch(() => formData.cnpj, val => formData.cnpj = masks.cnpj(val))
  watch(() => formData.phone, val => formData.phone = masks.phone(val))

  // Validation
  const validateCommonFields = (errors) => {
    const rawPhone = formData.phone.replace(/\D/g, '')
    if(rawPhone.length < 10 || rawPhone.length > 11) {
      errors.phone = 'Telefone inválido'
    }
  }

  const validateIndividualFields = (errors) => {
    const rawCpf = formData.cpf.replace(/\D/g, '')
    if(!formData.name?.trim()) errors.name = 'Nome é obrigatório'
    if(!rawCpf || rawCpf.length < 11) errors.cpf = 'CPF inválido'
    if(!formData.date_birth) errors.date_birth = 'Data de nascimento é obrigatória'
  }

  const validateCompanyFields = (errors) => {
    const rawCnpj = formData.cnpj?.replace(/\D/g, '')
    if(!formData.company_name?.trim()) errors.company_name = 'Razão Social é obrigatória'
    if(!rawCnpj || rawCnpj.length < 14) errors.cnpj = 'CNPJ inválido'
    if(!formData.date_opening) errors.date_opening = 'Data de abertura é obrigatória'
  }

  const validateStep = (step) => {
    const errors = {}

    if(step === 1) {
      if(!formData.email?.trim()) errors.email = 'E-mail é obrigatório'
      else if(!emailRegex.test(formData.email)) errors.email = 'E-mail inválido'

      if(!typeData.value) errors.type = 'Selecione o tipo'

    }else if(step === 2) {
      typeData.value === 'individual'
        ? validateIndividualFields(errors)
        : validateCompanyFields(errors)

      validateCommonFields(errors)

    }else if(step === 3) {
      if(!formData.password || formData.password.length < 4)
        errors.password = 'Senha deve ter ao menos 4 caracteres'

      if(formData.password !== formData.confirm_password)
        errors.confirm_password = 'As senhas não coincidem'

    }else if(step === 4) {
      if(!formData.email?.trim()) errors.email = 'E-mail é obrigatório'
      else if(!emailRegex.test(formData.email)) errors.email = 'E-mail inválido'

      typeData.value === 'individual'
        ? validateIndividualFields(errors)
        : validateCompanyFields(errors)

      validateCommonFields(errors)

      if(!formData.password || formData.password.length < 4)
        errors.password = 'Senha deve ter ao menos 4 caracteres'

      if(formData.password !== formData.confirm_password)
        errors.confirm_password = 'As senhas não coincidem'
    }

    return errors
  }

  const errors = computed(() => validateStep(stepState.current))

  const showErrors = computed(() => {
    const visible = {}
    for(const key in errors.value) {
      if(touchedFields[key]) visible[key] = errors.value[key]
    }
    return visible
  })

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  return {
    errors: showErrors,
    isValid,
    markAsTouched,
    isFieldTouched,
  }
}
