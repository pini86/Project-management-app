import { useState } from 'react';
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

const headerBgColor = indigo[900];

export default function Header() {
  const isAuth = false;
  const [language, setLanguage] = useState('RU');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  return (
    <>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: headerBgColor, marginBottom: 2, p: 0, position: 'sticky' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters={true}>
            <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
              <HeaderLink path="/" text="На главную">
                <HomeIcon />
              </HeaderLink>
              <Stack direction="row">
                {isAuth ? (
                  <>
                    <HeaderLink path="/main" text="Доски">
                      <DashboardIcon />
                    </HeaderLink>
                    <HeaderLink path="/profile" text="Профиль">
                      <AccountCircle />
                    </HeaderLink>
                    <HeaderLink path="/" text="Выйти">
                      <LogoutIcon />
                    </HeaderLink>
                  </>
                ) : (
                  <>
                    <HeaderLink path="/registration" text="Регистрация">
                      <AccountCircle />
                    </HeaderLink>
                    <HeaderLink path="/login" text="Войти">
                      <LoginIcon />
                    </HeaderLink>
                  </>
                )}
                <Paper elevation={0}>
                  <FormControl>
                    <InputLabel id="label-language"></InputLabel>
                    <Select labelId="label-language" value={language} onChange={handleChange}>
                      <MenuItem value={'RU'}>RU</MenuItem>
                      <MenuItem value={'EN'}>EN</MenuItem>
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
