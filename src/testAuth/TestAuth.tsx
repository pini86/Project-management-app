import { FunctionComponent } from 'react';
import { useSignInQuery, useSignUpQuery } from '../api/AuthApi';
import { ISignIn, ISignUp } from '../interfaces/Interfaces';

const TestAuth: FunctionComponent = () => {
  const newUser = {
    name: 'Ilon Mask',
    login: 'IMask',
    password: 'Tesla4ever',
  };
  const { data, isLoading, isError } = useSignUpQuery(newUser);

  if (isLoading) {
    return <div>Wait !</div>;
  }

  if (isError || !data) {
    return <div>Something went wrong !</div>;
  }
  const { _id, name, login } = data;
  return (
    <div>
      <p>ID: {_id}</p>
      <p>Name: {name}</p>
      <p>Login: {login}</p>
    </div>
  );
};

export default TestAuth;
