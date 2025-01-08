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

export default function ContasAPagar() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [vencimento, setVencimento] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [contas, setContas] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Filtros de data e status
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('');

  // Fetch contas quando a página é carregada
  useEffect(() => {
    fetchContas();
  }, []);

  const fetchContas = async () => {
    try {
      const filters = {
        startDate: startDate ? new Date(startDate).toISOString().split('T')[0] : null,
        endDate: endDate ? new Date(endDate).toISOString().split('T')[0] : null,
        status,
      };
      const response = await Conta.getContasUser(filters);
      setContas(response.contas || []);
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const contaData = {
        descricao,
        valor,
        vencimento: new Date(vencimento).toISOString().split('T')[0],
      };

      await Conta.createConta(contaData);
      fetchContas(); // Atualiza a tabela com os novos dados
      setFeedback({ type: 'success', message: 'Conta registrada com sucesso!' });
      setDescricao('');
      setValor('');
      setVencimento(null);
      setShowForm(false); // Fecha o formulário após registrar
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      setFeedback({ type: 'error', message: 'Erro ao registrar a conta. Tente novamente.' });
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
          <Typography variant="h5">Contas a Pagar</Typography>
        </Grid>

        {/* Botão e Formulário para Nova Requisição */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? 'Ocultar Formulário' : 'Nova Requisição'}
          </Button>
          {showForm && (
            <MainCard title="Registrar Nova Conta" sx={{ mb: 2 }}>
              <Stack spacing={2}>
                {feedback.message && (
                  <Typography variant="subtitle1" color={feedback.type === 'success' ? 'green' : 'red'}>
                    {feedback.message}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  label="Descrição"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Valor"
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                  <DatePicker
                    label="Data de Vencimento"
                    value={vencimento}
                    onChange={(newValue) => setVencimento(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="dd/MM/yyyy"
                  />
                </LocalizationProvider>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={handleSubmit}>
                    Registrar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                </Stack>
              </Stack>
            </MainCard>
          )}
        </Grid>

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
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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
                </TableRow>
              </TableHead>
              <TableBody>
                {contas.map((conta) => (
                  <TableRow key={conta._id}>
                    <TableCell>{conta.descricao}</TableCell>
                    <TableCell>{parseFloat(conta.valor).toFixed(2)}</TableCell>
                    <TableCell>{new Date(conta.vencimento).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{conta.status}</TableCell>
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
