import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import Container from '@mui/material/Container';
import { indigo } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import HeaderLink from 'components/buttons/HeaderLink';

const headerBgColor = indigo[900];

export default function Header() {
  const [language, setlanguage] = useState('RU');

  const handleChange = (event: SelectChangeEvent) => {
    setlanguage(event.target.value as string);
  };

  return (
    <AppBar sx={{ backgroundColor: headerBgColor }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <HeaderLink linkAddr="/" text="На главную">
              <HomeIcon />
            </HeaderLink>
            <Stack direction="row">
              <HeaderLink linkAddr="/registration" text="Регистрация">
                <AccountCircle />
              </HeaderLink>
              <HeaderLink linkAddr="/login" text="Войти">
                <LoginIcon />
              </HeaderLink>
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
  );
}
