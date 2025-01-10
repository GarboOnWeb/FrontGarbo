import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';
import { AuthProvider } from 'pages/authentication/auth-forms/AuthContext';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
