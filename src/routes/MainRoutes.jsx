import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
import { element } from 'prop-types';
import AdminContas from 'pages/contas/adminIndex';
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from 'pages/extra-pages/Unauthorized';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const ContasAPagar =  Loadable(lazy(() => import('pages/contas/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute element={<Dashboard />} /> // Protege o layout principal
  ),
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <ProtectedRoute element={<DashboardDefault />} /> // Protege o Dashboard
          ),
        },
      ],
    },
    {
      path: 'contas',
      children: [
        {
          path: 'pagar',
          element: (
            <ProtectedRoute element={<ContasAPagar />} /> // Protege Contas a Pagar
          ),
        },
        {
          path: 'admin',
          element: (
            <ProtectedRoute
              element={<AdminContas />}
              allowedSectors={['financeiro']} // Protege Administração de Contas
            />
          ),
        },
      ],
    },
    {
      path: 'unauthorized',
      element: <Unauthorized />,
    },
  ],
};

export default MainRoutes;
