const express = require('express')
const app = express()
const path = require('path')

const PORT = 3000

app.use(express.json())

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.post('/registration', (req, res) => {
  const data = req.body;
  if(!data || typeof data !== 'object') {
    return res.status(400).json({ message: 'Dados inválidos.' })
  }

  const { type } = data;
  if(!type || !['individual', 'company'].includes(type)) {
    return res.status(400).json({ message: "Tipo de cadastro inválido. Use 'individual' ou 'company'." })
  }

  const requiredFields = {
    individual: ['type', 'email', 'name', 'cpf', 'date_birth', 'phone', 'password'],
    company: ['type', 'email', 'company_name', 'cnpj', 'date_opening', 'phone', 'password']
  }

  const missingFields = requiredFields[type].filter(field => !data[field])
  if(missingFields.length > 0) {
    return res.status(400).json({
      message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`
    })
  }

  return res.status(200).json({ message: 'Cadastro recebido com sucesso!' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
