import { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ISnackBarProps {
  open: boolean;
  message: string;
  buttonText?: string;
}

export default function SnackBar({ open, message, buttonText }: ISnackBarProps) {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        {buttonText || 'CLOSE'}
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return <Snackbar open={isOpen} onClose={handleClose} message={message} action={action} />;
}
