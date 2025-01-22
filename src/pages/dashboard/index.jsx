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
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';
import React, { useState, useEffect } from 'react';
import { getVendasLoja, getProdutosLoja, getMetasLoja, getDashboardLoja, getLojas, getCicloAtual } from '../../api/VendasLoja';


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
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [totalVendido, setTotalVendido] = useState(0);
  const [totalVendidoAnt, setTotalVendidoAnt] = useState(0);
  const [ticketMedio, setTicketMedio] = useState(0);
  const [ticketMedioAnt, setTicketMedioAnt] = useState(0);
  const [porcentagemFaturamento, setPorcentagemFaturamento] = useState(0);
  const [porcentagemTicket, setPorcentagemTicket] = useState(0);
  const [produtividade, setProdutividade] = useState(0);
  const [produtividadeAnt, setProdutividadeAnt] = useState(0);
  const [produtividadePorcentagem, setProdutividadePorcentagem] = useState(0);
  const [selectedCiclo, setSelectedCiclo] = useState(null); // Inicialmente `null`
  const [selectedAno, setSelectedAno] = useState(null); // Inicialmente `null`
  const [selectedLoja, setSelectedLoja] = useState('');
  const [lojas, setLojas] = useState([]);
  const [tendencia, setTendencia] = useState(0);
  const [dadosGrafico, setDadosGrafico] = useState([]);


  const fetchCicloAtual = async () => {
    try {
      const cicloAtual = await getCicloAtual();
      if (cicloAtual) {
        setSelectedCiclo(cicloAtual.ciclo);
        setSelectedAno(cicloAtual.ano);
      }
    } catch (error) {
      console.error('Erro ao buscar ciclo atual:', error);
    }
  };

  const fetchLojas = async () => {
    try {
      const response = await getLojas();
      setLojas(response);
    } catch (error) {
      console.error('Erro ao buscar lojas:', error);
    }
  };
  const calcularRealizadoEValoresMedios = (valoresPorDia, valoresAnoAnteriorPorDia, dtInicio, dtFim) => {
    const inicio = new Date(dtInicio);
    const fimOriginal = new Date(dtFim);
    const hoje = new Date();

    // Ajustar o fim do período
    let fim = hoje < fimOriginal ? hoje : fimOriginal;

    // Filtrar os valores para o período atual
    const valoresFiltradosAtual = valoresPorDia.filter((venda) => {
      const dataVenda = new Date(venda.data);
      return dataVenda >= inicio && dataVenda <= fim;
    });



    const realizadoAtual = valoresFiltradosAtual.reduce((soma, venda) => soma + (venda.totalValor || 0), 0);

    const vendasAtual = valoresFiltradosAtual.length;

    const ticketMedioT = valoresFiltradosAtual.reduce((soma, venda) => soma + (venda.ticketMedio || 0), 0);
    const ticketMedioAtual = vendasAtual !== 0 ? ticketMedioT / vendasAtual : 0;

    const produtividadeAtual = valoresFiltradosAtual.reduce((soma, venda) => soma + (venda.produtividade || 0), 0);
    const produtividadeMediaAtual = vendasAtual !== 0 ? produtividadeAtual / vendasAtual : 0;

    // Calcular o número de dias no período atual
    const diasPeriodoAtual = Math.floor((fim - inicio) / (24 * 60 * 60 * 1000)) + 1;

    // Filtrar os valores para o mesmo período no ano anterior
    const valoresFiltradosAnoAnterior = valoresAnoAnteriorPorDia.slice(0, diasPeriodoAtual);

    const realizadoAnoAnterior = valoresFiltradosAnoAnterior.reduce((soma, venda) => soma + (venda.totalValor || 0), 0);

    const vendasAnoAnterior = valoresFiltradosAnoAnterior.length;
    const ticketMedioTAnt = valoresFiltradosAnoAnterior.reduce((soma, venda) => soma + (venda.ticketMedio || 0), 0);

    const ticketMedioAnoAnterior = vendasAnoAnterior !== 0 ? ticketMedioTAnt / vendasAnoAnterior : 0;

    const produtividadeAnoAnterior = valoresFiltradosAnoAnterior.reduce(
      (soma, venda) => soma + (venda.produtividade || 0),
      0
    );
    const produtividadeMediaAnoAnterior = vendasAnoAnterior !== 0 ? produtividadeAnoAnterior / vendasAnoAnterior : 0;
    console.log("Realizado Atual:", realizadoAtual);
    console.log("Número de Vendas Atual:", vendasAtual);
    console.log("Ticket Médio Atual:", ticketMedioAtual);

    return {
      realizadoAtual,
      realizadoAnoAnterior,
      ticketMedioAtual,
      ticketMedioAnoAnterior,
      produtividadeAtual,
      produtividadeAnoAnterior,
      produtividadeMediaAtual,
      produtividadeMediaAnoAnterior,
    };
  };

  const prepararDadosPorDia = (valoresPorDia, valoresAnoAnteriorPorDia) => {
    const dadosCombinados = valoresPorDia.map((atual, index) => {
      const anterior = valoresAnoAnteriorPorDia[index] || {};
      return {
        data: atual.data, // Data atual
        atual: atual.totalValor || 0, // Valor do período atual
        anterior: anterior.totalValor || 0, // Valor do mesmo período no ano anterior
      };
    });
    return dadosCombinados;
  };

  const fetchData = async (ciclo, ano, loja) => {
    setIsLoading(true); // Início do carregamento
    try {
      const vendas = await getDashboardLoja(ciclo, ano, loja);
      const dtInicio = vendas.dtInicio;
      const dtFim = vendas.dtFim;

      const {
        realizadoAtual,
        realizadoAnoAnterior,
        ticketMedioAtual,
        ticketMedioAnoAnterior,
        produtividadeAtual,
        produtividadeAnoAnterior,
        produtividadeMediaAtual,
        produtividadeMediaAnoAnterior,
      } = calcularRealizadoEValoresMedios(
        vendas.valoresPorDia,
        vendas.valoresAnoAnteriorPorDia,
        dtInicio,
        dtFim
      );

      const dadosFormatados = prepararDadosPorDia(
        vendas.valoresPorDia,
        vendas.valoresAnoAnteriorPorDia
      );

      setDadosGrafico(dadosFormatados);
      const porcentagemFaturamento =
        realizadoAnoAnterior !== 0
          ? ((realizadoAtual - realizadoAnoAnterior) / realizadoAnoAnterior) * 100
          : 0;

      const porcentagemTicket =
        ticketMedioAnoAnterior !== 0
          ? ((ticketMedioAtual - ticketMedioAnoAnterior) / ticketMedioAnoAnterior) * 100
          : 0;
      const produtividadeAnt = vendas.produtividadeAnoAnterior || 0;
      const produtividadePorcentagem =
        produtividadeMediaAnoAnterior !== 0
          ? ((produtividadeMediaAtual - produtividadeMediaAnoAnterior) / produtividadeMediaAnoAnterior) * 100
          : 0;

      // console.log("Produtividade %: ", produtividadePorcentagem);
      // Data de hoje
      const dtHoje = new Date(); // Objeto Date para a data de hoje
      const dtFimC = new Date(vendas.dtFim); // Convertendo dtFim dinamicamente para Date
      let tendencia = realizadoAtual;
      if (dtHoje < dtFimC) {
        // dtHoje = dtFim;
        console.log("dtHoje < dtFim");

        const dtInicioC = new Date(vendas.dtInicio);
        // Constante para milissegundos em um dia
        const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

        // Cálculo de dias
        const diasTotais = Math.floor((dtFimC - dtInicioC) / MILISSEGUNDOS_POR_DIA); // Total de dias entre início e fim
        const diasApurados = Math.floor((dtHoje - dtInicioC) / MILISSEGUNDOS_POR_DIA); // Dias já apurados até hoje
        const diasRestantes = diasTotais - diasApurados; // Dias restantes até o fim



        // Validação de intervalo de datas
        if (diasTotais <= 0 || diasApurados < 0 || diasRestantes < 0) {
          throw new Error("Intervalo de datas inválido ou fora do período permitido.");
        }

        console.log("realizadoAtual: ", realizadoAtual);
        console.log("diasApurados: ", diasApurados);
        console.log("diasTotais: ", diasTotais);
        tendencia = (realizadoAtual / diasApurados) * diasTotais;
      }

      setTotalVendido(realizadoAtual);
      setTotalVendidoAnt(realizadoAnoAnterior);
      setTicketMedio(ticketMedioAtual);
      setTicketMedioAnt(ticketMedioAnoAnterior);
      setPorcentagemFaturamento(porcentagemFaturamento);
      setPorcentagemTicket(porcentagemTicket);
      setProdutividade(produtividadeMediaAtual);
      setProdutividadeAnt(produtividadeMediaAnoAnterior);
      setProdutividadePorcentagem(produtividadePorcentagem);
      setTendencia(tendencia);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    } finally {
      setIsLoading(false); // Fim do carregamento
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchCicloAtual();
      await fetchLojas();
    };
    init();
  }, []);

  useEffect(() => {
    if (selectedCiclo && selectedAno) {
      fetchData(selectedCiclo, selectedAno, selectedLoja);
    }
  }, [selectedCiclo, selectedAno, selectedLoja]);


  return (
    <>
      {/* Backdrop com indicador de carregamento */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* Filtros */}
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle1">Selecione o Ciclo:</Typography>
                <Select
                  value={selectedCiclo || ''}
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
                  value={selectedAno || ''}
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
          <AnalyticEcommerce
            title="Produtividade"
            count={parseFloat(produtividade.toFixed(2))}
            percentage={parseFloat(produtividadePorcentagem.toFixed(2))}
            isLoss={produtividadePorcentagem < 0}
            color={produtividadePorcentagem < 0 ? 'error' : 'success'}
            extra={parseFloat((produtividade - produtividadeAnt).toFixed(2))} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Tendencia"
            count={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tendencia)}
          // percentage={27.4}
          // isLoss={false}
          // color="warning"
          // extra="$20,395" 
          />
        </Grid>

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        {/* row 2 */}
        <Grid item xs={12} md={7} lg={8}>
          <UniqueVisitorCard valoresPorDia={dadosGrafico} />
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
    </>
  );
}
