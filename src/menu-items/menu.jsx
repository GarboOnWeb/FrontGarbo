import { DashboardOutlined, DollarOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  DollarOutlined
};

// Função para gerar o menu com base no `role` e `sector`
const getMenu = () => {

  const role = localStorage.getItem('userRole');
  const setor = localStorage.getItem('userSetor');

  const menu = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: []
  };

  // Adiciona itens ao menu com base no role e setor
  // if (role === 'admin' || sector === 'financeiro') {
  //   menu.children.push({
  //     id: 'dashboard',
  //     title: 'Dashboard',
  //     type: 'item',
  //     url: '/dashboard/default',
  //     icon: icons.DashboardOutlined,
  //     breadcrumbs: false
  //   });
  // }

  menu.children.push({
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    url: '/dashboard/default',
    icon: icons.DashboardOutlined,
    breadcrumbs: false
  });

  if (setor === 'financeiro') {
    menu.children.push({
      id: 'contas',
      title: 'Contas a Pagar',
      type: 'item',
      url: '/contas/admin',
      icon: icons.DollarOutlined,
      breadcrumbs: false
    });
  }else{
    menu.children.push({
      id: 'contas',
      title: 'Contas a Pagar',
      type: 'item',
      url: '/contas/pagar',
      icon: icons.DollarOutlined,
      breadcrumbs: false
    });
  }


  return menu;
};

export default getMenu;
