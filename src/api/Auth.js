import axios from 'axios';


const API_URL_P = import.meta.env.VITE_API_URL; // Certifique-se de que a variável tem o prefixo VITE_


export const login = async (email, password) => {
  try {

    const API_URL = `${API_URL_P}/auth/login`;

    const response = await axios.post(API_URL, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data; // Com axios, os dados estão em response.data
    console.log('Resposta da API:', data);

    if (response.status === 200) {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userSetor', data.setor);
      } else {
        console.warn('Token não encontrado na resposta');
      }

      return { success: true, role: data.role };
    } else {
      return { success: false, message: data.message || 'Erro ao fazer login' };
    }
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return { success: false, message: 'Erro ao conectar-se à API. Tente novamente.' };
  }
};