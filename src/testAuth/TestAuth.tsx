import { useSignUpQuery } from '../api/AuthApi';
import { IErrorResponse } from '../models/ErrorResponse';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

const TestAuth = () => {
  const newUser = {
    name: 'Ilon Mask',
    login: 'IMask',
    password: 'Tesla4ever',
  };
  const { data, isLoading, isError, error } = useSignUpQuery(newUser);

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
