import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ISnackBarProps {
  open: boolean;
  message: string;
}

export default function SnackBar({ open, message }: ISnackBarProps) {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return <Snackbar open={isOpen} onClose={handleClose} message={message} action={action} />;
}
