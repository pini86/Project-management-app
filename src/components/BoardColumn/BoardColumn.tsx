import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import './style.scss';

interface IProps {
  columnTitle: string;
}

function BoardColumn({ columnTitle }: IProps) {
  const [columnName, setColumnName] = useState(columnTitle);
  const [editColumnName, setEditColumnName] = useState(columnTitle);
  const [isEditing, setIsEditing] = useState(false);

  const ColumnTitleInput = (
    <form
      className="board-column__title-form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsEditing(false);
        editColumnName.length && setColumnName(editColumnName);
      }}
    >
      <input
        className="board-column__title-input"
        type="text"
        defaultValue={columnName}
        autoFocus={true}
        onChange={(e) => setEditColumnName(e.target.value)}
      />
      <Button className="board-column__title-confitm" type="submit">
        <CheckIcon />
      </Button>
      <Button className="board-column__title-cancel" onClick={() => setIsEditing(false)}>
        <ClearIcon />
      </Button>
    </form>
  );

  const ColumnTitleText = (
    <>
      <Stack className="column-title__inner-wrapper" onClick={() => setIsEditing(true)}>
        <Typography className="board-column__title" variant="h6" noWrap>
          {columnName}
        </Typography>
        <EditIcon />
      </Stack>
      <DeleteForeverIcon className="board-column__delete" />
    </>
  );

  return (
    <Box className="board-column">
      <Stack className="board-column__title-wrapper">
        {isEditing ? ColumnTitleInput : ColumnTitleText}
      </Stack>
      <Box className="task-list">
        <Card className="task-list__item">
          <Box>
            Lorem ipsum dolor sit, amet cons e c t etur adipisicing elit. Adipisci quam quae ducimus
            corrupti sequi libero incidunt esse quod voluptatibus magnam eius temporibus alias,
            explicabo sunt provident ea nobis expedita odio!
          </Box>
          <DeleteForeverIcon className="task-delete" />
        </Card>
      </Box>
      <Button className="btn-create_task" variant="contained" startIcon={<AddIcon />}>
        добавить задачу
      </Button>
    </Box>
  );
}

export default BoardColumn;
