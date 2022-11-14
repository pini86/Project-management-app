import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { FunctionComponent } from 'react';
import { useSignInQuery } from '../api/AuthApi';
import { ISignIn, IErrorResponse } from '../interfaces/Interfaces';

const TestAuth2: FunctionComponent = () => {
  const currUser: ISignIn = {
    login: 'IMask',
    password: 'Tesla4ever',
  };

  const { data, isLoading, isError, error } = useSignInQuery(currUser);

  if (isLoading) {
    return <div>Wait !</div>; // Place here nice spinner
  }

  if (isError || !data) {
    return (
      <div>
        Error code: {(error as FetchBaseQueryError).status}{' '}
        {((error as FetchBaseQueryError).data as IErrorResponse).message}
      </div>
    );
  }

  return (
    <div>
      <p>Token: {data.token}</p>
    </div>
  );
};

export default TestAuth2;
