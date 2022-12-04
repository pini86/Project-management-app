import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AddIcon from '@mui/icons-material/Add';
import BoardColumn from 'components/BoardColumn';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './style.scss';
import { useTranslation } from 'react-i18next';

function BoardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  console.log(t.name);
  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={3}>
        <Button variant="contained" startIcon={<ArrowLeftIcon />} onClick={() => navigate(-1)}>
          {t('BoardPage.btn-back')}
        </Button>
        <Typography className="board-title" variant="h4">
          {t('BoardPage.board-title')}
        </Typography>
      </Stack>
      <Stack className="columns-wrapper" direction="row" spacing={3}>
        <BoardColumn columnTitle={t('BoardPage.column-title')} />
        <Button className="btn-create-column" variant="contained" startIcon={<AddIcon />}>
          {t('BoardPage.column-add')}
        </Button>
      </Stack>
    </Container>
  );
}

export default BoardPage;
