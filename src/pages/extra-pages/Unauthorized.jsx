import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WarningOutlined } from '@ant-design/icons';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container 
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        p: 2,
      }}
    >
      <WarningOutlined style={{ fontSize: 64, color: '#f44336', marginBottom: 16 }} />
      <Typography variant="h3" component="h1" gutterBottom>
        Acesso Negado
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Você não tem permissão para acessar esta página.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/dashboard/default')}
      >
        Voltar para a Página Inicial
      </Button>
    </Container>
  );
};

export default Unauthorized;

