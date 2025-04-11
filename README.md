# 💻 Desafio MB Web – Cadastro de Usuários

Este projeto foi desenvolvido como parte do processo seletivo para o Mercado Bitcoin. Ele consiste em uma aplicação completa de cadastro de usuários, utilizando Vue 3 (Composition API com <script setup> e Vite) no front-end e Node.js com Express no back-end.

A proposta foca em uma aplicação leve, performática e com validações essenciais, além de estar preparada para ser executada 100% localmente.

## 🧠 Tecnologias utilizadas
## Front-end
- Vue 3 (Composition API + Vite)

- JavaScript (sem TypeScript)

- HTML5 + CSS3 (sem frameworks de estilo)

- SCSS

- Fontawesome

## Back-end
- Node.js

- Express

### 🚀 Como rodar o projeto localmente
⚙️ Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (versão 18 ou superior)

- npm (gerenciador de pacotes, instalado junto com o Node.js)

📁 Estrutura do projeto
<pre>
├── client/ # Aplicação Front-End (Vue 3 + Vite)
└── server/ # Aplicação Back-End (Node.js + Express)
</pre>

### 🧩 Passo a passo para rodar a aplicação completa (client + server)
```bash
# 1. Clone o repositório
git clone https://github.com/lpmaggots/challenge-mb.git

# 2. Acesse a pasta do projeto
cd challenge-mb
```
#### 👉 Rodando o client
```bash
# 3. Acesse a pasta do cliente
cd client

# 4. Instale as dependências
npm install

# 5. Gere o build de produção
npm run build
```

#### 👉 Rodando o servidor
```bash
# 6. Volte para a raiz e acesse a pasta do servidor
cd ../server

# 7. Instale as dependências (se necessário)
npm install

# 8. Inicie o servidor
npm start
```

🟢 Pronto! A aplicação estará rodando em:
http://localhost:3000

## 📄 Endpoints do Servidor
GET /registration
- Retorna uma página simples que carrega o app frontend.

POST /registration
- Recebe os dados do formulário em JSON.

- Valida se todos os campos foram enviados.

- Retorna sucesso ou erro com o status adequado.


### 🎯 Rodando apenas o client (modo desenvolvimento)
Se você quiser rodar apenas o front-end para testes ou desenvolvimento:
```bash
# Acesse a pasta do cliente
cd client

# Instale as dependências (se ainda não fez)
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## ✅ Funcionalidades
- Formulário em 4 passos com validações específicas

- Máscaras e validações de CPF, CNPJ, e-mail, telefone, datas

- Layout responsivo e leve

- Comunicação client-server via API REST (fetch)

- Backend simulado com validações básicas

## 🧠 Observações
- Projeto sem uso de bibliotecas externas de UI, HTTP ou store

- Sem dependência de serviços externos: 100% local

- Pensado para performance e clareza do código

- Estilo CSS criado do zero com nomes claros e padronizados


## 💡 Importante
- Nenhum dado é salvo ou persistido, o servidor apenas simula o processo de cadastro.

- O projeto é totalmente offline/local, sem dependência de APIs externas.

- O foco é na simplicidade, clareza de código e performance no browser.

- O layout não exige perfeição visual, mas sim estrutura, responsividade e organização CSS.

## 📸 Preview
![image](https://github.com/user-attachments/assets/4e0eb6d2-d20f-4a3a-9138-12396189df98)
![image](https://github.com/user-attachments/assets/65a2fc97-ff28-4dcd-881d-ea2e13e43d74)
![image](https://github.com/user-attachments/assets/9693930d-ce46-45e2-a48a-30158886ecb6)
![image](https://github.com/user-attachments/assets/ebc07d76-d870-4e64-9bb0-e46f1d83dfe1)

## ✍️ Autor
Feito com por Felipe Falcone para o processo seletivo do Mercado Bitcoin.
