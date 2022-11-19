import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AddIcon from '@mui/icons-material/Add';
import BoardColumn from 'components/BoardColumn';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './style.scss';

function BoardPage() {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={3}>
        <Button variant="contained" startIcon={<ArrowLeftIcon />}>
          назад
        </Button>
        <Typography className="board-title" variant="h4">
          Название борда
        </Typography>
      </Stack>
      <Stack className="columns-wrapper" direction="row" spacing={3}>
        <BoardColumn />
        <Button className="btn-create-column" variant="contained" startIcon={<AddIcon />}>
          добавить колонку
        </Button>
      </Stack>
    </Container>
  );
}

export default BoardPage;
