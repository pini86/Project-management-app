import Form from 'components/Forms';
import React from 'react';

function RegisterPage() {
  return (
    <Form
      inputAttributes={[
        {
          name: 'name',
          label: 'Ваше имя',
          rules: {
            required: 'Поле обязательно к заполнению',
          },
        },
        {
          name: 'login',
          label: 'Логин',
          rules: {
            required: 'Поле обязательно к заполнению',
          },
        },
        {
          name: 'password',
          label: 'Пароль',
          rules: {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 6,
              message: 'Ваш пароль должен содержать не менее 6 символов',
            },
          },
        },
      ]}
      className="register-form"
      formData={{ name: '', login: '', password: '' }}
      submitBtnText="Зарегистрироваться"
      additionalText={{ mainText: 'Уже есть аккаунт? ', linkText: 'Войти', linkHref: '/login' }}
    />
  );
}

export default RegisterPage;
