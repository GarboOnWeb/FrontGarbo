// material-ui
import { useTheme } from '@mui/material/styles';

// ==============================|| LOGO IMAGE ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * Usando uma imagem em vez de SVG
     */
    <img
      // src="https://yata-apix-5da688e2-3bb9-4b12-8c98-edcee576c0f8.s3-object.locaweb.com.br/f62c1d304ff0409389c629e69c6da4e3.jpg"
      src="https://i.imgur.com/a1pg6Df.png"
      alt="Garbo Logo"
      width="130" // Largura ajustada para corresponder ao design
      height="100" // Altura ajustada para corresponder ao design
      style={{
        objectFit: 'contain', // Garante que a imagem não seja cortada
      }}
    />
  );
};

export default Logo;
