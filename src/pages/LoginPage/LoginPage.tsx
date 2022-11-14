import Form from 'components/Forms';
import React from 'react';

function LoginPage() {
  return (
    <Form
      inputAttributes={[
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
              message: 'Ваш пароль содержит не менее 6 символов',
            },
          },
        },
      ]}
      className="login-form"
      formData={{ name: '', login: '', password: '' }}
      submitBtnText="Войти"
      additionalText={{
        mainText: 'Еще нет аккаунта? ',
        linkText: 'Зарегистрироваться',
        linkHref: '/registration',
      }}
    />
  );
}

export default LoginPage;
