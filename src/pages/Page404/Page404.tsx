import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './Page404.scss';
import { useTranslation } from 'react-i18next';

function Page404() {
  const { t } = useTranslation();

  return (
    <Box className="page-wrapper">
      <Typography className="header" variant="h1">
        404
      </Typography>
      <Typography variant="h3" className="sub-header" gutterBottom>
        {t('Page404.sub-header')}
      </Typography>
      <Box>
        {t('Page404.messagePart1')}{' '}
        <Link to="/" className="page-url">
          {t('Page404.messagePart2')}{' '}
        </Link>
        {t('Page404.messagePart3')}
      </Box>
    </Box>
  );
}

export default Page404;
