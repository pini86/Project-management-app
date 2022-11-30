import { IUser, ISignUp } from '../models/User';
import { api } from './Api';

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: `users`,
        method: 'GET',
      }),
    }),
    getUserById: builder.mutation<IUser, { userId: string }>({
      query: ({ userId }) => ({
        url: `users/${userId}`,
        method: 'GET',
      }),
    }),
    updateUserById: builder.query<IUser, { userId: string; data: ISignUp }>({
      query: ({ userId, data }) => ({
        url: `users/${userId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleletUserById: builder.query<IUser, { userId: string }>({
      query: ({ userId }) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdMutation,
  useUpdateUserByIdQuery,
  useDeleletUserByIdQuery,
} = usersApi;
