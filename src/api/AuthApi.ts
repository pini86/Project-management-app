import { IUser, ISignIn, ISignUp } from '../models/User';
import { api } from './Api';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string }, ISignIn>({
      query: ({ login, password }) => ({
        url: `auth/signin`,
        method: 'POST',
        body: { login, password },
      }),
    }),
    signUp: builder.mutation<IUser, ISignUp>({
      query: ({ name, login, password }) => ({
        url: `auth/signup`,
        method: 'POST',
        body: { name, login, password },
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
