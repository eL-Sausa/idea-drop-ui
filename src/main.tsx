import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { StrictMode } from 'react';
import './styles.css';
import { AuthProvider } from './context/AuthContext.tsx';


const queryClient = new QueryClient({
   defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
})

/*
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
*/

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </QueryClientProvider>
    </AuthProvider>
  )
}
