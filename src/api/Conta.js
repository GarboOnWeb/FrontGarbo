import axios from 'axios';


const API_URL_P = import.meta.env.VITE_API_URL; // Certifique-se de que a variável tem o prefixo VITE_


// Função para obter o token do localStorage ou de onde você o estiver armazenando
const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Substitua pelo método de armazenamento usado
};

// Função para criar uma conta
const createConta = async (contaData) => {
  const API_URL = `${API_URL_P}/conta/`;

  try {
    const token = getAuthToken(); // Recupera o token
    const response = await axios.post(API_URL, contaData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Função para buscar contas do usuário
const getContasUser = async (params) => {
  const API_URL = `${API_URL_P}/conta/contasUser/`;

  try {
    const token = getAuthToken(); // Recupera o token
    console.log(params)
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
      params, // Adiciona os parâmetros na URL
    });
    console.log("Passou aqui");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const updateStatus = async (contaId, status) => {
  const API_URL = `${API_URL_P}/conta/atualizar/status`;

  try {
    const token = getAuthToken();
    const response = await axios.patch(
      API_URL,
      { contaId, status }, // Corpo da requisição com contaId e status
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


const getAllContas = async (params) => {
  const API_URL = `${API_URL_P}/conta/`;

  try {
    const token = getAuthToken(); // Recupera o token
    console.log(params)
    const response = await axios.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
      params, // Adiciona os parâmetros na URL
    });
    console.log("Passou aqui");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


// Outros métodos podem seguir o mesmo padrão
export default {
  createConta,
  getContasUser,
  getAllContas,
  updateStatus
};
