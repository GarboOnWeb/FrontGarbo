import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  markers: {
    size: 4,
    colors: ['#8884d8', '#82ca9d'],
    strokeWidth: 2,
    strokeColors: ['#8884d8', '#82ca9d']
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (value) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value) // Formata em R$
    }
  },
  grid: {
    borderColor: '#e0e0e0'
  }
};

export default function IncomeAreaChart({ valoresPorDia }) {
  const theme = useTheme();
  const { secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const categorias = valoresPorDia.map((venda) => venda.data);

    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.secondary.main],
      xaxis: {
        categories: categorias,
        labels: {
          formatter: (value) => {
            const date = new Date(value);
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
              .toString()
              .padStart(2, '0')}/${date.getFullYear()}`;
          },
          rotate: -45,
          style: {
            fontSize: '12px',
            colors: categorias.map(() => secondary)
          }
        },
        axisBorder: {
          show: true,
          color: line
        }
      },
      yaxis: {
        labels: {
          formatter: (value) =>
            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value), // Formata em R$
          style: {
            colors: [secondary]
          }
        }
      }
    }));

    setSeries([
      {
        name: 'Atual',
        data: valoresPorDia.map((venda) => venda.atual)
      },
      {
        name: 'Ano Anterior',
        data: valoresPorDia.map((venda) => venda.anterior)
      }
    ]);
  }, [valoresPorDia, theme]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}
