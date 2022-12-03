import Stack from '@mui/material/Stack';
import './Footer.scss';

export default function Footer() {
  return (
    <>
      <Stack direction="row" spacing={2} className="footer" justifyContent="center">
        <a className="team__name" href="https://github.com/natashapridanova">
          @natashapridanova
        </a>
        <a href="https://rs.school/js/" className="footer__logo">
          <img src="https://rs.school/images/rs_school_js.svg" alt="Course logo" />
        </a>
        <p className="footer__year">2022</p>
        <a className="team__name" href="https://github.com/user0k">
          @user0k
        </a>
        <a className="team__name" href="https://github.com/pini86">
          @pini86
        </a>
      </Stack>
    </>
  );
}
