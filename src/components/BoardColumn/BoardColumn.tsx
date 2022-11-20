import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './style.scss';

function BoardColumn() {
  return (
    <Box className="board-column">
      <Stack className="board-column__title">
        <Typography variant="h6" noWrap>
          Название колонки
        </Typography>
        <DeleteForeverIcon />
      </Stack>
      <Box className="task-list">
        <Card className="task-list__item">
          <Box>
            Lorem ipsum dolor sit, amet cons e c t etur adipisicing elit. Adipisci quam quae ducimus
            corrupti sequi libero incidunt esse quod voluptatibus magnam eius temporibus alias,
            explicabo sunt provident ea nobis expedita odio!
          </Box>
          <MoreVertIcon />
        </Card>
      </Box>
      <Button className="btn-create_task" variant="contained" startIcon={<AddIcon />}>
        добавить задачу
      </Button>
    </Box>
  );
}

export default BoardColumn;
