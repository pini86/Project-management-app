import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import { indigo } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import HeaderLink from 'components/buttons/HeaderLink';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppSelector } from '../../store/hooks/redux';
import { useAppDispatch } from '../../store/hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import { useTranslation } from 'react-i18next';

const headerBgColor = indigo[900];

export default function Header() {
  const { isLoggedIn } = useAppSelector((state) => state.userReducer);
  const { t, i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    i18n.changeLanguage(event.target.value as string);
  };

  const dispatch = useAppDispatch();
  const { resetUser } = userSlice.actions;

  const logout = () => {
    dispatch(resetUser());
  };

  return (
    <>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: headerBgColor, marginBottom: 2, position: 'sticky' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', ml: -1 }}>
              <HeaderLink path="/" text={t('header.home')}>
                <HomeIcon />
              </HeaderLink>
              <Stack direction="row">
                {isLoggedIn ? (
                  <>
                    <HeaderLink path="/main" text={t('header.main')}>
                      <DashboardIcon />
                    </HeaderLink>
                    <HeaderLink path="/profile" text={t('header.profile')}>
                      <AccountCircle />
                    </HeaderLink>
                    <HeaderLink path="/" text={t('header.logout')} onClickFunction={logout}>
                      <LogoutIcon />
                    </HeaderLink>
                  </>
                ) : (
                  <>
                    <HeaderLink path="/registration" text={t('header.registration')}>
                      <AccountCircle />
                    </HeaderLink>
                    <HeaderLink path="/login" text={t('header.login')}>
                      <LoginIcon />
                    </HeaderLink>
                  </>
                )}
                <Paper elevation={0}>
                  <FormControl>
                    <InputLabel id="label-language"></InputLabel>
                    <Select
                      labelId="label-language"
                      value={i18n.resolvedLanguage}
                      onChange={handleChange}
                    >
                      <MenuItem value={'ru'}>ru</MenuItem>
                      <MenuItem value={'en'}>en</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
