import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './Page404.scss';

function Page404() {
  return (
    <Box className="page-wrapper">
      <Typography className="header" variant="h1">
        404
      </Typography>
      <Typography variant="h3" className="sub-header" gutterBottom>
        Страница не найдена
      </Typography>
      <Box>
        Введите правильный url или посетите{' '}
        <Link to="/" className="page-url">
          стартовую{' '}
        </Link>
        страницу
      </Box>
    </Box>
  );
}

export default Page404;
