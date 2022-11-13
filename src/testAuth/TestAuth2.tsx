import { FunctionComponent } from 'react';
import { useSignInQuery, useSignUpQuery } from '../api/AuthApi';
import { ISignIn, ISignUp } from '../interfaces/Interfaces';

const TestAuth2: FunctionComponent = () => {
  const currUser: ISignIn = {
    login: 'IMask',
    password: 'Tesla4ever',
  };

  const { data, isLoading, isError } = useSignInQuery(currUser);

  if (isLoading) {
    return <div>Wait !</div>;
  }

  if (isError || !data) {
    return <div>Something went wrong !</div>;
  }

  return (
    <div>
      <p>Token: {data.token}</p>
    </div>
  );
};

export default TestAuth2;
