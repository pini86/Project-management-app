import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IConfirmationModalProps {
  title?: string;
  contentText: string;
  isOpen: boolean;
  confirmText: string;
  notConfirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  contentText,
  confirmText,
  notConfirmText,
  onConfirm,
  onCancel,
}: IConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button onClick={onConfirm} className="confirm-btn">
          {confirmText}
        </Button>
        <Button onClick={onCancel} autoFocus className="not-confirm-btn">
          {notConfirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
