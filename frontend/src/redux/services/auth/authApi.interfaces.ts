export interface ILoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    email: null | string;
    name?: null | string;
    accessToken: null | {
      token: string;
      expires: number;
    };
  };
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: object;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILogOutResponse {}
