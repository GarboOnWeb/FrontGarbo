// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';
import React, { useState, useEffect } from 'react';
import { getVendasLoja, getProdutosLoja, getMetasLoja, getDashboardLoja, getLojas } from '../../api/VendasLoja';


// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [totalVendido, setTotalVendido] = useState(0);
  const [totalVendidoAnt, setTotalVendidoAnt] = useState(0);
  const [ticketMedio, setTicketMedio] = useState(0);
  const [ticketMedioAnt, setTicketMedioAnt] = useState(0);
  const [porcentagemFaturamento, setPorcentagemFaturamento] = useState(0);
  const [porcentagemTicket, setPorcentagemTicket] = useState(0);

  const [selectedCiclo, setSelectedCiclo] = useState(1);
  const [selectedAno, setSelectedAno] = useState(new Date().getFullYear());
  const [selectedLoja, setSelectedLoja] = useState('');
  const [lojas, setLojas] = useState([]); // Adicione o estado para as lojas

  // Função para buscar as lojas
  const fetchLojas = async () => {
    try {
      const response = await getLojas(); // Chamada à API para buscar as lojas
      setLojas(response); // Atualize o estado com a lista de lojas
    } catch (error) {
      console.error('Erro ao buscar lojas:', error);
    }
  };

  // Função para buscar os dados do dashboard
  const fetchData = async (ciclo, ano, loja) => {
    try {
      const vendas = await getDashboardLoja(ciclo, ano, loja);

      console.log('Vendas recebidas:', vendas);

      const total = vendas.realizado || 0;
      const totalAnt = vendas.realizadoAnoAnterior || 0;
      const ticketMedio = vendas.ticketMedio || 0;
      const ticketMedioAnt = vendas.ticketMedioAnoAnterior || 0;

      const porcentagemFaturamento =
        totalAnt !== 0 ? ((total - totalAnt) / totalAnt) * 100 : 0;
      const porcentagemTicket =
        ticketMedioAnt !== 0 ? ((ticketMedio - ticketMedioAnt) / ticketMedioAnt) * 100 : 0;

      setTotalVendido(total);
      setTotalVendidoAnt(totalAnt);
      setTicketMedio(ticketMedio);
      setTicketMedioAnt(ticketMedioAnt);
      setPorcentagemFaturamento(porcentagemFaturamento);
      setPorcentagemTicket(porcentagemTicket);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      setTotalVendido(0);
      setTotalVendidoAnt(0);
      setTicketMedio(0);
      setTicketMedioAnt(0);
      setPorcentagemFaturamento(0);
      setPorcentagemTicket(0);
    }
  };

  useEffect(() => {
    fetchLojas(); // Busca as lojas ao carregar o componente
  }, []);

  useEffect(() => {
    fetchData(selectedCiclo, selectedAno, selectedLoja);
  }, [selectedCiclo, selectedAno, selectedLoja]);


  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Filtros */}
      <Grid item xs={12}>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle1">Selecione o Ciclo:</Typography>
              <Select
                value={selectedCiclo}
                onChange={(e) => setSelectedCiclo(e.target.value)}
                fullWidth
              >
                {Array.from({ length: 17 }, (_, i) => i + 1).map((ciclo) => (
                  <MenuItem key={ciclo} value={ciclo}>
                    Ciclo {ciclo}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle1">Selecione o Ano:</Typography>
              <TextField
                type="number"
                value={selectedAno}
                onChange={(e) => setSelectedAno(Number(e.target.value))}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle1">Selecione a Loja:</Typography>
              <Select
                value={selectedLoja}
                onChange={(e) => setSelectedLoja(e.target.value)}
                fullWidth
              >
                <MenuItem value="">Todas as Lojas</MenuItem>
                {lojas.map((loja) => (
                  <MenuItem key={loja.loja_id} value={loja.loja_id}>
                    Loja {loja.loja_id}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Cards */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Vendas"
          count={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVendido)}
          percentage={parseFloat(porcentagemFaturamento.toFixed(2))}
          extra={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVendido - totalVendidoAnt)}
          isLoss={porcentagemFaturamento < 0}
          color={porcentagemFaturamento < 0 ? 'error' : 'success'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Ticket Médio"
          count={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ticketMedio)}
          percentage={parseFloat(porcentagemTicket.toFixed(2))}
          extra={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ticketMedio - ticketMedioAnt)}
          isLoss={porcentagemTicket < 0}
          color={porcentagemTicket < 0 ? 'error' : 'success'}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <UniqueVisitorCard />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <SaleReportCard />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
