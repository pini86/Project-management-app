import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
  title?: string;
  contentText: string;
  confirmText: string;
  notConfirmText: string;
  isConfirmed: (a: boolean) => void;
}

export default function ConfirmationModal({
  isOpen,
  setIsOpen,
  title,
  contentText,
  notConfirmText,
  confirmText,
  isConfirmed,
}: IConfirmationModalProps) {
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    target.className.includes('confirm-btn') ? isConfirmed(true) : isConfirmed(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {title ? <DialogTitle>{title}</DialogTitle> : ''}
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="confirm-btn">
          {confirmText}
        </Button>
        <Button onClick={handleClose} autoFocus className="not-confirm-btn">
          {notConfirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
