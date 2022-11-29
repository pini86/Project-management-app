import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './style.scss';

interface IProps {
  title: string;
}

function Task({ title }: IProps) {
  return (
    <Box>
      <Card className="task-list__item">
        <Box>{title}</Box>
        <Stack>
          <DeleteForeverIcon className="task-delete" />
          <MoreVertIcon className="task-modify" />
        </Stack>
      </Card>
    </Box>
  );
}

export default Task;
