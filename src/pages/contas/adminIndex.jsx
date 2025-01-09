// material-ui
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainCard from 'components/MainCard';
import Conta from 'api/Conta.js';

export default function AdminContas() {
  const [contas, setContas] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Fetch contas quando a página é carregada
  useEffect(() => {
    fetchContas();
  }, []);

  const fetchContas = async () => {
    try {
      const filters = {
        startDate: startDate ? new Date(startDate).toISOString().split('T')[0] : null,
        endDate: endDate ? new Date(endDate).toISOString().split('T')[0] : null,
        status: statusFilter,
      };
      const response = await Conta.getAllContas(filters);
      setContas(response.contas || []);
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await Conta.updateStatus(id, newStatus);
      setFeedback({ type: 'success', message: 'Status atualizado com sucesso!' });
      fetchContas(); // Atualiza a lista de contas após a alteração
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      setFeedback({ type: 'error', message: 'Erro ao atualizar status. Tente novamente.' });
    }
  };

  const handleFilter = () => {
    fetchContas();
  };

  return (
    <MainCard>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* Título da Página */}
        <Grid item xs={12}>
          <Typography variant="h5">Gerenciar Contas a Pagar</Typography>
        </Grid>

        {/* Feedback */}
        {feedback.message && (
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color={feedback.type === 'success' ? 'green' : 'red'}
              sx={{ mb: 2 }}
            >
              {feedback.message}
            </Typography>
          </Grid>
        )}

        {/* Filtro por Datas e Status */}
        <Grid item xs={12}>
          <MainCard title="Filtros" sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              {/* Filtro por Data Início */}
              <Grid item xs={12} sm={4} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                  <DatePicker
                    label="Data Início"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    inputFormat="dd/MM/yyyy"
                  />
                </LocalizationProvider>
              </Grid>

              {/* Filtro por Data Fim */}
              <Grid item xs={12} sm={4} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                  <DatePicker
                    label="Data Fim"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    inputFormat="dd/MM/yyyy"
                  />
                </LocalizationProvider>
              </Grid>

              {/* Filtro por Status */}
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  label="Status"
                  select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="Solicitado">Solicitado</MenuItem>
                  <MenuItem value="Em análise">Em análise</MenuItem>
                  <MenuItem value="Aprovado">Aprovado</MenuItem>
                </TextField>
              </Grid>

              {/* Botão Aplicar */}
              <Grid item xs={12} sm={12} md={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleFilter}
                  sx={{ height: '100%' }}
                >
                  Aplicar Filtro
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        {/* Tabela de Contas */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>DESCRIÇÃO</TableCell>
                  <TableCell>VALOR (R$)</TableCell>
                  <TableCell>VENCIMENTO</TableCell>
                  <TableCell>STATUS</TableCell>
                  <TableCell>AÇÃO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contas.map((conta) => (
                  <TableRow key={conta._id}>
                    <TableCell>{conta.descricao}</TableCell>
                    <TableCell>{parseFloat(conta.valor).toFixed(2)}</TableCell>
                    <TableCell>{new Date(conta.vencimento).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{conta.status}</TableCell>
                    <TableCell>
                      <TextField
                        select
                        value={conta.status}
                        onChange={(e) => handleStatusChange(conta._id, e.target.value)}
                        size="small"
                      >
                        <MenuItem value="Solicitado">Solicitado</MenuItem>
                        <MenuItem value="Em análise">Em análise</MenuItem>
                        <MenuItem value="Aprovado">Aprovado</MenuItem>
                      </TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </MainCard>
  );
}
