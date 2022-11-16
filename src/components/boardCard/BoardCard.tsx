import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface IProps {
  title: string;
  description: string;
  _id: string;
}

export default function BoardCard(props: IProps) {
  const { title, description, _id } = props;
  const [openDel, setOpenDel] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenDel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenDel(true);
  };

  const handleCloseDel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenDel(false);
  };

  const handleClickOpenEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenEdit(true);
  };

  const handleCloseEdit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenEdit(false);
  };

  return (
    <Card
      sx={{
        width: 275,
        height: 180,
        border: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      variant="elevation"
      onClick={() => {
        console.log('click');
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Tooltip title="Edit board">
          <IconButton aria-label="edit">
            <EditIcon onClick={handleClickOpenEdit} />
          </IconButton>
        </Tooltip>
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="edit-dialog-title"
          aria-describedby="edit-dialog-description"
        >
          <DialogTitle id="edit-dialog-title">{'Edit board '}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="new_title"
              label="New title"
              type="text"
              fullWidth
              defaultValue={title}
            />
            <TextField
              autoFocus
              margin="dense"
              id="new_desc"
              label="New description"
              type="text"
              fullWidth
              defaultValue={description}
            />
          </DialogContent>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button onClick={handleCloseEdit} color="primary">
              Save
            </Button>
            <Button onClick={handleCloseEdit} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Tooltip title="Delete board">
          <IconButton aria-label="delete">
            <DeleteForeverIcon onClick={handleClickOpenDel} />
          </IconButton>
        </Tooltip>
        <Dialog
          open={openDel}
          onClose={handleCloseDel}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">{'Delete board ?'}</DialogTitle>
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button onClick={handleCloseDel} color="primary">
              Yes
            </Button>
            <Button onClick={handleCloseDel} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
