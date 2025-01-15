import axios from 'axios';

const API_URL_P = import.meta.env.VITE_API_URL;

const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
    }
    return token;
};

const fetchData = async (endpoint, params) => {
    try {
        const API_URL = `${API_URL_P}${endpoint}`;
        const token = getAuthToken();

        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params,
        });

        if (response.status !== 200) {
            throw new Error(`Erro da API: ${response.statusText}`);
        }

        console.log('Resposta da API:', response);
        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
        }
        throw new Error('Erro ao conectar-se à API. Tente novamente.');
    }
};

export const getVendasLoja = async (ciclo, ano, loja) => fetchData('/loja/venda', { ciclo, ano, loja });

export const getProdutosLoja = async (ciclo, ano) => fetchData('/loja/produtos', { ciclo, ano });

export const getMetasLoja = async (ciclo, ano) => fetchData('/loja/metas', { ciclo, ano });

export const getDashboardLoja = async (ciclo, ano, loja) => fetchData('/loja/dashboard', { ciclo, ano, loja });

export const getLojas= async () => fetchData('/loja/lojas');

export const getCicloAtual= async () => fetchData('/loja/cicloAtual');

export default {
    getVendasLoja,
    getProdutosLoja,
    getMetasLoja,
    getDashboardLoja,
    getLojas,
    getCicloAtual,
};

