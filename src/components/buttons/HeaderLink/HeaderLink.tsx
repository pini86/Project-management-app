import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import styles from './HeaderLink.module.css';

interface IProps {
  path: string;
  text: string;
  children?: React.ReactNode;
}

function HeaderLink({ path, text, children }: IProps) {
  return (
    <Link to={linkAddr} className={styles.headerLink}>
      <IconButton size="large" aria-haspopup="true" color="inherit" sx={{ p: '16px 12px' }}>
        {children}
        <Typography variant="button" sx={{ pl: 1 }}>
          {text}
        </Typography>
      </IconButton>
    </Link>
  );
}

export default HeaderLink;
