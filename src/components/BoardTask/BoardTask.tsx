import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Task() {
  return (
    <Card className="task-list__item">
      <Box>
        Lorem ipsum dolor sit, amet cons e c t etur adipisicing elit. Adipisci quam quae ducimus
        corrupti sequi libero incidunt esse quod voluptatibus magnam eius temporibus alias,
        explicabo sunt provident ea nobis expedita odio!
      </Box>
      <DeleteForeverIcon className="task-delete" />
    </Card>
  );
}

export default Task;
