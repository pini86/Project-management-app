import { IUser, ISignIn, ISignUp } from 'interfaces/Interfaces';
import { api } from './Api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.query<{ token: string }, ISignIn>({
      query: ({ login, password }) => ({
        url: `auth/signin`,
        method: 'POST',
        body: { login, password },
      }),
    }),
    signUp: builder.query<IUser, ISignUp>({
      query: ({ name, login, password }) => ({
        url: `auth/signup`,
        method: 'POST',
        body: { name, login, password },
      }),
    }),
  }),
});

export const { useSignInQuery, useSignUpQuery } = authApi;
