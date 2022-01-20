import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.PROD ? true : false,
    },
  },
});

export default queryClient;
