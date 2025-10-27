import { useMemo } from 'react';
import ResToast from '../../components/ResToast/ResToast';
import { useGetProductsQuery, useGetSingleProductQuery } from '../../redux/Product/Product';

export const useGetProducts = () => {
     try {
          const { data, isLoading, isError, error, refetch } = useGetProductsQuery(null);

          if (isError) {
               ResToast({ type: 'danger', title: 'Failed to fetch Products' });
          }
          const memoizedData = useMemo(() => ({ data, isLoading, isError, error }), [data, isLoading, isError, error]);

          return { ...memoizedData, refetch };
     } catch (error) {
          ResToast({ type: 'danger', title: 'Something went wrong while fetching Products!' });
          return {
               data: undefined,
               isLoading: false,
               isError: true,
               error,
               refetch: () => {},
          };
     }
};

export const useGetSingleProduct = (id: number) => {
     try {
          const { data, isLoading, isError, error, refetch } = useGetSingleProductQuery({ id }, { skip: !id });
          console.log(data, 'Modal Data');
          console.log(id, 'Modal Data');
          if (isError) {
               ResToast({ type: 'danger', title: 'Failed to fetch Products' });
          }
          const memoizedData = useMemo(() => ({ data, isLoading, isError, error }), [data, isLoading, isError, error]);

          return { ...memoizedData, refetch };
     } catch (error) {
          ResToast({ type: 'danger', title: 'Something went wrong while fetching Products!' });
          return {
               data: undefined,
               isLoading: false,
               isError: true,
               error,
               refetch: () => {},
          };
     }
};
