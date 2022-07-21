// Arquivos para validação do login

export const loginCorreto = {
    email: 'admin@admin.com',
    password: 'secret_admin'
  }

export const loginSemSenha = {
    email: 'admin@admin.com',
  }

export const loginSemEmail = {
    password: 'secret_admin',
  }

export const loginSenhaIncorreta = {
    email: 'admin@admin.com',
    password: 'senha_incorreta',
  }

export const loginEmailIncorreto = {
    email: 'admin@admin.',
    password: 'secret_admin',
  }
  