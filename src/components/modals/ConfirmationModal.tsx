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
  onConfirmation: (a: boolean) => void;
}

export default function ConfirmationModal({
  isOpen,
  setIsOpen,
  title,
  contentText,
  notConfirmText,
  confirmText,
  onConfirmation,
}: IConfirmationModalProps) {

  const setConfirmation = (isConfirmed: boolean) => {
    onConfirmation(isConfirmed);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {title ? <DialogTitle>{title}</DialogTitle> : ''}
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmation(true)} className="confirm-btn">
          {confirmText}
        </Button>
        <Button onClick={() => setConfirmation(false)} autoFocus className="not-confirm-btn">
          {notConfirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
