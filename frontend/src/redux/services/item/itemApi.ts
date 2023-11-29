import { rootApi } from "../rootApi";
import {
  IFormData,
  IItem,
  IItemGetPayload,
  IItemResponse,
} from "./itemApi.interface";

export const itemApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createItem: builder.mutation<void, Partial<IItem>>({
      query: (data) => ({
        url: "/item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["fetchItem"],
    }),
    getAllItem: builder.query<IItemResponse, IItemGetPayload>({
      query: ({ filterData, searchData, limit }) => {
        return {
          url: `/item?search=${searchData}&filters=${filterData}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["fetchItem"],
      keepUnusedDataFor: 0,
    }),
    updateItem: builder.mutation<void, { id: string; data: IFormData }>({
      query: ({ id, data }) => ({
        url: `/item/${id}`,
        method: "put",
        body: data,
      }),
      invalidatesTags: ["fetchItem"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/item?id=${id}`,
        method: "delete",
      }),
      invalidatesTags: ["fetchItem"],
    }),
  }),
});

export const {
  useGetAllItemQuery,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useCreateItemMutation,
} = itemApi;
