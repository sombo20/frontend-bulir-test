import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('O email é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
});


export const Signupschema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: yup.string().required('O e-mail é obrigatório').email('E-mail inválido'),
  nif: yup.string().required('O NIF é obrigatório').length(11, 'O NIF deve ter exatamente 11 caracteres'),
  password: yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
  role: yup.mixed<'CLIENT' | 'PROVIDER'>().oneOf(['CLIENT', 'PROVIDER'], 'Selecione um tipo de usuário').required('A função é obrigatória')
});


export const serviceSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório').typeError('O nome deve ser uma string'),
  description: yup.string().required('A descrição é obrigatória').typeError('A descrição deve ser uma string'),
  price: yup.number().required('O preço é obrigatório').positive('O preço deve ser um número positivo').typeError('O preço deve ser um número'),
});