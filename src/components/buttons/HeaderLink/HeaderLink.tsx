import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import './HeaderLink.scss';

interface IProps {
  path: string;
  text: string;
  children?: React.ReactNode;
  onClickFunction?: () => void;
}

function HeaderLink({ path, text, children, onClickFunction }: IProps) {
  return (
    <Link to={path} className="header-link" onClick={onClickFunction}>
      <IconButton size="large" aria-haspopup="true" color="inherit" sx={{ p: '16px 12px' }}>
        {children}
        <Typography className="header-link__text" variant="button" sx={{ pl: 1 }}>
          {text}
        </Typography>
      </IconButton>
    </Link>
  );
}

export default HeaderLink;
