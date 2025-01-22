import IncomeAreaChart from './IncomeAreaChart';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';  


export default function UniqueVisitorCard({ valoresPorDia }) {
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Vendas Diárias - Comparativo</Typography>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart valoresPorDia={valoresPorDia} />
        </Box>
      </MainCard>
    </>
  );
}
