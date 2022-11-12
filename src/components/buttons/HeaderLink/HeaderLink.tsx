import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import style from './HeaderLink.module.css';

interface IProps {
  linkAddr: string;
  text: string;
  children?: JSX.Element;
}

function HeaderLink({ linkAddr, text, children }: IProps) {
  return (
    <Link to={linkAddr} className={style.headerLink}>
      <IconButton size="large" aria-haspopup="true" color="inherit" sx={{ p: 2 }}>
        {children}
        <Typography variant="button" sx={{ pl: 1 }}>
          {text}
        </Typography>
      </IconButton>
    </Link>
  );
}

export default HeaderLink;
