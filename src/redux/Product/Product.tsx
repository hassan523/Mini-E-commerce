import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_BASE_URL from '../../utils/Config';
import { GetProductResponse } from './ProductTypes';

const Product = createApi({
     reducerPath: 'Product',
     baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
     endpoints: builder => ({
          GetProducts: builder.query<GetProductResponse[], null | undefined>({
               query: () => ({
                    url: `/products/category/women's%20clothing`,
                    method: 'GET',
               }),
          }),
          GetSingleProduct: builder.query<GetProductResponse, { id: number }>({
               query: ({ id }) => ({
                    url: `/products/${id}`,
                    method: 'GET',
               }),
          }),
     }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = Product;

export default Product;
