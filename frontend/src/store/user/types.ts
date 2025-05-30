export type SigninPayloadType = {
  email: string;
  password: string;
};

export type SigninResponseType = {
  id: string;
  email: string;
  name: string;
  role: string;
  accessToken: string;
};

export type UserStoreType = {
  user: SigninResponseType;
  accessToken: string;
  signin: (payload: SigninPayloadType) => void;
  logout: () => void;
};
