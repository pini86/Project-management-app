import jwt_decode from 'jwt-decode';

export const extractUserIdFromToken = (token: string): string => {
  const { id }: { id: string } = jwt_decode(token);
  return id;
};
