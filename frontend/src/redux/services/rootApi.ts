import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import { AppState } from "../store";
import { message } from "antd";
import { ICustomErrorType } from "./types/customErrorTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_SERVER,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as AppState).auth!.accessToken;

    if (accessToken) {
      const token = accessToken!.token;
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryFunction: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    message.error("Session expired !");
    api.dispatch(logout());
  }
  return result;
};

export const rootApi = createApi({
  reducerPath: "rootApi",
  tagTypes: ["fetchItem"],
  baseQuery: baseQueryFunction as BaseQueryFn<
    string | FetchArgs,
    unknown,
    ICustomErrorType
  >,
  endpoints: () => ({}),
});
