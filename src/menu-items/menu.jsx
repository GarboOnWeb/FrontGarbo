// assets
import { DashboardOutlined , DollarOutlined} from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  DollarOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const menu = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'contas',
      title: 'Contas a Pagar',
      type: 'item',
      url: '/contas/pagar',
      icon: icons.DollarOutlined,
      breadcrumbs: false
    }
  ]
};

export default menu;
